import IncidenceRate from "./components/IncidenceRate"
import DiseaseCase from "./components/DiseaseCase"
import VaccineEfficacy from "./components/VaccineEfficacy"
import VaccineDescription from "./components/VaccineDescription"
import OutbreaksTimeline from "./components/OutbreaksTimeline"
import VaxCoverage from "./components/VaxCoverage"
import VaxMap from "./components/VaxMap"
import VaxMilestone from "./components/VaxMilestone"
import R0 from "./components/R0"
import { useNavigate, useOutletContext } from "react-router-dom";
import { useVaccine } from "@/hooks/useVaccine"
import React, { useState, useEffect } from 'react';

export default function DashboardPage() {

    const navigate = useNavigate();
    const { vaccineTypes } = useVaccine();
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const { currentVaccine } = useOutletContext();

   // console.log('currentVaccine:', currentVaccine);

    // Set initial selected vaccine when vaccine types are loaded
    useEffect(() => {
        if (vaccineTypes.length > 0 && !selectedVaccine) {
            setSelectedVaccine(vaccineTypes[0]);
        }
    }, [vaccineTypes]);


    return (
        <div className="h-full">
            <div className='relative'>
                <img src="/image/vaccine2.jpg" alt="vaccine" className="w-full mb-4 rounded-xl transition-all duration-300 shadow-md" />
                <div className="absolute top-1/2 left-10 -translate-y-1/2 font-bold">
                    <p className="text-2xl text-white uppercase mb-2">
                        Vaccine Facts and Statistics
                    </p>
                    <p className="text-indigo-900 text-lg">
                        Learn more about the selected vaccine:
                        <span className="ml-2 underline underline-offset-4 decoration-sky-600/50 hover:decoration-blue-500">
                            {currentVaccine?.vaccineType || 'Loading...'}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* First row */}
                <div className="flex-1 component-card">
                    <VaccineDescription selectedVaccine={currentVaccine} />
                </div>

                {/* Second row */}
                <div className="flex gap-4 h-[400px] ">
                    <div className="flex-1 component-card">
                        <VaccineEfficacy selectedVaccine={currentVaccine} />
                    </div>
                    <div className="flex-1 component-card">
                        <VaxMilestone selectedVaccine={currentVaccine} />
                    </div>
                </div>

                {/* Third row */}
                <div className="flex gap-4 h-[500px] ">
                    <div className="flex-1 component-card">
                        <VaxCoverage selectedVaccine={currentVaccine} />
                    </div>
                    <div className="flex-1 component-card" onClick={() => navigate('/map')}>
                        <VaxMap />
                    </div>
                </div>

                {/* Fourth row */}
                <div className="flex gap-4 h-[500px]">
                    <div className="flex-1 component-card">
                        <R0 selectedVaccine={currentVaccine} />
                    </div>
                    <div className="flex-1 component-card">
                        <DiseaseCase selectedVaccine={currentVaccine} />
                    </div>
                </div>

                {/* Fifth row */}
                <div className="flex gap-4 h-[500px]">
                    <div className="flex-1 component-card">
                        <IncidenceRate selectedVaccine={currentVaccine} />
                    </div>
                    <div className="flex-1 component-card">
                        <OutbreaksTimeline selectedVaccine={currentVaccine} />
                    </div>
                </div>
            </div>
        </div>
    )
}