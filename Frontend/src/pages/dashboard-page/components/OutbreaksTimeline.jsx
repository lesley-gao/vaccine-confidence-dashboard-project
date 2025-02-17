/**
 * This component displays the outbreak data for diseases associated with a selected vaccine in New Zealand.
 * It fetches and visualizes the data as a list of disease outbreaks, allowing users to track the history of outbreaks.
 * It is displayed on the Dashboard page.
 */
import React, { useState, useEffect } from 'react';
import DataSource from './DataSource';
import { fetchData } from '@/utils/api.js'
import PlaceHolder from "./PlaceHolder";

export default function OutbreaksTimeline({ selectedVaccine }) {

    const [loading, setLoading] = useState(false);
    const [outbreakTimeline, setOutbreakTimeline] = useState([]);

    // Fetch outbreak timeline, first get all diseases related to the selected vaccine,
    // then fetch outbreak timeline for each disease,
    // then merge all outbreak timelines and sort by year
    useEffect(() => {
        const getOutbreaksTimeline = async () => {
            try {
                setLoading(true);

                const diseaseData = await fetchData(
                    `/disease/all?vaccineId=${selectedVaccine.vaccineId}`
                );

                if (!diseaseData || diseaseData.length === 0) {
                    setOutbreakTimeline([]);
                    return;
                }

                const timelinePromises = diseaseData.map(async (diseaseItem) => {
                    const diseaseId = diseaseItem.disease.diseaIdPk;
                    try {
                        const outbreaksForOneDisease = await fetchData(`/disease/outbreak-timeline?diseaseId=${diseaseId}`);
                        return outbreaksForOneDisease;
                    } catch (e) {
                        return [];
                    }
                });

                const results = await Promise.all(timelinePromises);

                const merged = results.flat().sort((a, b) => b.dotYear - a.dotYear);
                setOutbreakTimeline(merged);
            } catch (error) {
                console.error("Error fetching outbreak timeline:", error);
                setOutbreakTimeline([]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedVaccine?.vaccineId) {
            getOutbreaksTimeline();
        } else {
            setOutbreakTimeline([]);
        }
    }, [selectedVaccine]);


    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500">Loading disease outbreaks...</div>
            </div>
        );
    }

    if (!selectedVaccine || selectedVaccine.vaccineId == null) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500 dark:text-white">Please select a vaccine to view its related outbreak history.</div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row">
                <h1 className="p-4 text-xl font-bold font-PoppinsBold dark:text-cyan-300">Past Outbreaks</h1>
                {outbreakTimeline && outbreakTimeline.length > 0 && <DataSource selectedVaccine={selectedVaccine} componentId="dis_outbreaks" />}
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-0 scrollbar-hide ">
                {outbreakTimeline.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <PlaceHolder />
                    </div>
                ) : (
                    outbreakTimeline.map((outbreak) => (
                        <div className="flex gap-3 mb-3 " key={`${outbreak.diseaIdPk}+${outbreak.dotIdPk}`}>
                            <div className="w-8 aspect-square flex-shrink-0">
                                <img
                                    src="/image/virus.jpg"
                                    alt="virus illustration"
                                    className="rounded-full"
                                />
                            </div>
                            <div>
                                <h6 className="text-lg font-bold dark:text-cyan-300 ">{outbreak.dotYear}</h6>
                                <p className="text-slate-700 dark:text-white">{outbreak.dotDescription}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}