import { AiOutlineArrowDown } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import React, { useState } from "react";
import DataSource from "./DataSource";
import { Disease_R0 } from "@/data/Disease_R0";

export default function R0({ selectedVaccine }) {
    const [selectedDisease, setSelectedDisease] = useState(null);

    const filteredDiseases = selectedVaccine?.vaccineId
        ? Disease_R0.filter((item) => item.vaccindId === selectedVaccine.vaccineId)
        : [];

    React.useEffect(() => {
        if (filteredDiseases.length > 0) {
            setSelectedDisease(filteredDiseases[0].disea_name);
        }
    }, [selectedVaccine]);


    const currentDisease = filteredDiseases.find(
        (disease) => disease.disea_name === selectedDisease
    );

    if (!currentDisease) {
        return (
            <div className="w-full h-full max-w-2xl p-4 flex flex-col">
                <h1 className="text-xl font-bold font-PoppinsBold">Transmission Rate (R₀)</h1>
                <p className="text-gray-500">No data available for the selected vaccine.</p>
            </div>
        );
    }

    const { min_r0, max_r0, disea_name: diseaseName } = currentDisease;
    const R0ToDisplay = min_r0 === max_r0 ? min_r0 : `${min_r0} - ${max_r0}`;

    return (
        <div className="w-full h-full max-w-2xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-bold font-PoppinsBold">Transmission Rate (R₀)</h1>
                <DataSource dataSource={{
                    websiteName: "ESR",
                    URL: "https://en.wikipedia.org/wiki/Basic_reproduction_number/"
                }} />

                <div className="flex gap-2 ml-auto">
                    {filteredDiseases.map((disease) => (
                        <button
                            key={disease.r0_pk}
                            onClick={() => setSelectedDisease(disease.disea_name)}
                            className={`px-4 py-2 text-sm font-bold text-white rounded focus:outline-none transition-all duration-300 transform ${selectedDisease === disease.disea_name
                                ? "bg-[#3949ab] scale-105"
                                : "bg-gray-400 hover:bg-gray-500 hover:scale-105 active:scale-95"
                                }`}
                        >
                            {disease.disea_name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                <div className="flex flex-col mt-2 gap-5 px-20 justify-center items-center mb-6">
                    <div className="flex items-center">
                        <BiUser size={40} className="text-slate-700" />
                    </div>
                    <AiOutlineArrowDown size={24} />
                    <div className="flex flex-wrap justify-center gap-1">
                        {Array.from({ length: Math.ceil(max_r0) }).map((_, index) => (
                            <BiUser key={index} size={40} className="text-red-500" />
                        ))}
                    </div>
                </div>

                <div className="text-center mb-6">
                    <span className="text-xl font-semibold">R₀ = {R0ToDisplay}</span>
                </div>
            </div>

            <p className="text-slate-700 text-left mt-auto">
                * The basic reproduction number (R₀) indicates how contagious a disease is.
                For example, {diseaseName.toLowerCase()} has an R₀ of {R0ToDisplay}, meaning one person can infect {R0ToDisplay} others on average.
                A R₀ greater than 1 means the disease can spread exponentially without control measures.
            </p>
        </div >
    );
}
