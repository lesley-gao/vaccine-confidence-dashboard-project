/**
 * This component displays the basic reproduction number (R₀) for a selected vaccine's associated diseases.
 * It fetches and displays R₀ data, allowing users to view transmission rates for different diseases and select the specific disease to examine in detail.
 * It is displayed on the Dashboard page.
 */
import { AiOutlineArrowDown } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import DataSource from "./DataSource";
import { fetchData } from '@/utils/api.js'
import PlaceHolder from "./PlaceHolder";

export default function R0({ selectedVaccine }) {
    const [selectedDiseaseId, setSelectedDiseaseId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [diseaseR0, setDiseaseR0] = useState([]);

    // Fetch R0 data
    useEffect(() => {
        const getR0Rate = async () => {
            if (!selectedVaccine?.vaccineId) return;

            setLoading(true);

            try {
                const diseaseData = await fetchData(`/disease/all?vaccineId=${selectedVaccine.vaccineId}`);

                if (!diseaseData || diseaseData.length === 0) {
                    setDiseaseR0([]);
                    return;
                }

                const r0RatePromises = diseaseData.map(async (diseaseItem) => {
                    const diseaseId = diseaseItem.disease.diseaIdPk;
                    const diseaseName = diseaseItem.disease.diseaName;

                    try {
                        const r0ForOneDisease = await fetchData(`/disease/r0?diseaseId=${diseaseId}`);
                        return r0ForOneDisease.map((item) => ({
                            ...item,
                            diseaseName,
                            diseaIdPk: diseaseId,
                            vaccineId: selectedVaccine.vaccineId
                        }));

                    } catch (e) {
                        console.error(`Failed to fetch R0 for diseaseId=${diseaseId}`, e);
                        return [];
                    }
                });

                const results = await Promise.all(r0RatePromises);
                const mergedResults = results.flat();
                setDiseaseR0(mergedResults);

                if (mergedResults.length > 0 && !selectedDiseaseId) {
                    setSelectedDiseaseId(mergedResults[0].diseaIdPk);
                }
            } catch (error) {
                console.error("Failed to fetch R0 data:", error);
                setDiseaseR0([]);
            } finally {
                setLoading(false);
            }
        };

        getR0Rate();
    }, [selectedVaccine]);


    useEffect(() => {
        if (diseaseR0.length > 0) {
            setSelectedDiseaseId(diseaseR0[0].diseaIdPk);
        }
    }, [diseaseR0]);

    const filteredDiseases = diseaseR0.filter(
        (item) => item.vaccineId === selectedVaccine?.vaccineId
    );

    const currentDisease = filteredDiseases.find(
        (disease) => disease.diseaIdPk === selectedDiseaseId
    );

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500">Loading R0 data...</div>
            </div>
        );
    }

    if (!currentDisease) {
        return (
            <div className="w-full h-full max-w-2xl p-4 flex flex-col">
                <h1 className="text-xl font-bold font-PoppinsBold dark:text-cyan-300">Transmission Rate (R₀)</h1>
                <div className="flex items-center justify-center">
                    <PlaceHolder />
                </div>
            </div>
        );
    }

    const { diseaseName, dr0IdPk, dr0Min, dr0Max } = currentDisease;
    const R0ToDisplay = dr0Min === dr0Max ? dr0Min : `${dr0Min} - ${dr0Max}`;

    return (
        <div className="w-full h-full p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-bold font-PoppinsBold dark:text-cyan-300">Transmission Rate (R₀)</h1>

                {diseaseR0 && <DataSource selectedVaccine={selectedVaccine} componentId="dis_r0" />}

                <div className="flex gap-2 ml-auto  max-sm:flex-col max-sm:items-start">
                    {filteredDiseases.map((disease) => (
                        <button
                            key={disease.dr0IdPk}
                            onClick={() => setSelectedDiseaseId(disease.diseaIdPk)}
                            className={`px-4 py-2 text-sm font-bold text-white dark:text-slate-800 rounded focus:outline-none transition-all duration-300 transform ${selectedDiseaseId === disease.diseaIdPk
                                ? "bg-[#3949ab] dark:bg-cyan-300 scale-105"
                                : "bg-gray-400 hover:bg-gray-500 hover:scale-105 active:scale-95"
                                }`}
                        >
                            {disease.diseaseName}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                <div className="flex flex-col my-3 gap-3 px-20 justify-center items-center">
                    <div className="flex items-center">
                        <BiUser className="text-slate-700 text-3xl dark:text-white" />
                    </div>
                    <AiOutlineArrowDown size={24} />
                    <div className="flex flex-wrap justify-center gap-1">
                        {Array.from({ length: Math.ceil(dr0Max) }).map((_, index) => (
                            <BiUser key={index} className="text-red-500 text-3xl max-lg:text-xl" />
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <span className="text-xl font-semibold">R₀ = {R0ToDisplay}</span>
                </div>
            </div>

            <p className="text-slate-700 text-left mt-auto dark:text-white">
                * The basic reproduction number (R₀) indicates how contagious a disease is.
                For example, {diseaseName.toLowerCase()} has an R₀ of {R0ToDisplay}, meaning one person can infect {R0ToDisplay} others on average.
                A R₀ greater than 1 means the disease can spread exponentially without control measures.
            </p>
        </div>
    );
}