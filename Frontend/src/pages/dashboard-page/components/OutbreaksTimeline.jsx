// This is the compoment that displays the timeline of past disease outbreaks in New Zealand.
// The component will be used in DashboardPage.
import React from 'react';
import { diseaseOutbreaks } from "@/data/outbreaks";
import DataSource from './DataSource';

export default function OutbreaksTimeline({ selectedVaccine }) {
    const dataSource = {
        websiteName: "ESR",
        URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
    };

    const filteredOutbreaks = selectedVaccine?.vaccineId
        ? diseaseOutbreaks
            .filter(outbreak => outbreak.disea_id_pk === selectedVaccine.vaccineId)
            .sort((a, b) => b.dot_year - a.dot_year)
        : [];

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row">
                <h1 className="p-4 text-xl font-bold font-PoppinsBold">Past Outbreaks</h1>
                <DataSource dataSource={dataSource} />
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-0 scrollbar-hide">
                {!selectedVaccine?.vaccineId ? (
                    <div className="text-center text-gray-500">
                        Please select a vaccine to view its outbreak history.
                    </div>
                ) : filteredOutbreaks.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No outbreak records available for this vaccine.
                    </div>
                ) : (
                    filteredOutbreaks.map((outbreak) => (
                        <div className="flex gap-3 mb-3" key={outbreak.dot_id_pk}>
                            <div className="w-8 aspect-square flex-shrink-0">
                                <img
                                    src="/image/virus.jpg"
                                    alt="virus illustration"
                                    className="rounded-full"
                                />
                            </div>
                            <div>
                                <h6 className="text-lg font-bold">{outbreak.dot_year}</h6>
                                <p className="text-slate-700">{outbreak.dot_description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}