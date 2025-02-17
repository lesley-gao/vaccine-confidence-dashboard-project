/**
 * This is the Dashboard page where the user can view the statistics and facts about the selected vaccine.
 * The page displays various components such as VaccineDescription, VaccineEfficacy, R0, VaxCoverage, DiseaseCase, IncidenceRate, VaxMilestone, OutbreaksTimeline, and VaxMap.
 * The user can select a vaccine from the dropdown menu to view the statistics and facts about the selected vaccine.
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVaccine } from "@/hooks/useVaccine";
import IncidenceRate from "./components/IncidenceRate";
import DiseaseCase from "./components/DiseaseCase";
import VaccineEfficacy from "./components/VaccineEfficacy";
import VaccineDescription from "./components/VaccineDescription";
import OutbreaksTimeline from "./components/OutbreaksTimeline";
import VaxCoverage from "./components/VaxCoverage";
import VaxMap from "./components/VaxMap";
import VaxMilestone from "./components/VaxMilestone";
import R0 from "./components/R0";
import VaccineSelection from "@/pages/dashboard-page/components/VaccineSelection";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function DashboardPage() {
  const { vaccineTypes } = useVaccine();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  const lastUpdated = "2025-02-13";

  useEffect(() => {
    const vaccineId = location.state?.vaccineId;
    if (vaccineId) {
      const vaccine = vaccineTypes.find((v) => v.vaccineId === vaccineId);
      setSelectedVaccine(vaccine || null);
    } else if (vaccineTypes.length > 0 && !selectedVaccine) {
      setSelectedVaccine(vaccineTypes[0]);
    }
  }, [vaccineTypes, location.state]);

  const handleVaccineChange = (newVaccine) => {
    setSelectedVaccine(newVaccine);
  };

  if (!selectedVaccine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="relative">
        <img src="/image/banner-dashboard.png" alt="vaccine" className="w-full mb-4 rounded-xl transition-all duration-300 shadow-md" />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 font-bold">
          <p className="text-2xl text-white uppercase mb-2 max-lg:text-lg">
            Vaccine Facts and Statistics
          </p>
          <p className="text-indigo-900 text-lg  max-lg:text-sm max-md:hidden">
            Learn more about the selected vaccine:
            <span className="ml-2 underline underline-offset-4 decoration-sky-600/50 hover:decoration-blue-500">
              {selectedVaccine.vaccineType || "Loading..."}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center my-8 gap-6 max-md:items-start max-md:ml-2">
        <VaccineSelection selectedVaccine={selectedVaccine} setSelectedVaccine={handleVaccineChange} />
        <div className="flex items-center gap-4 md:text-lg">
          <span className="font-bold">Last updated:</span>
          <p className="py-2">
            {lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">

        {/* First row */}
        <div className="component-card w-full h-auto ">
          <VaccineDescription selectedVaccine={selectedVaccine} />
        </div>

        {/* Second row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="component-card w-full h-auto md:h-[400px] md:flex-[4] overflow-hidden">
            <VaccineEfficacy selectedVaccine={selectedVaccine} />
          </div>
          <div className="component-card w-full h-auto md:h-[400px] md:flex-[6]">
            <R0 selectedVaccine={selectedVaccine} />
          </div>
        </div>

        {/* Third row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="component-card w-full h-[500px] md:flex-1 overflow-hidden">
            <VaxCoverage selectedVaccine={selectedVaccine} />
          </div>
          <div className="component-card w-full h-[500px] md:flex-1  overflow-hidden">
            <DiseaseCase selectedVaccine={selectedVaccine} />
          </div>
          <div className="component-card w-full h-[500px] md:flex-1  overflow-hidden">
            <IncidenceRate selectedVaccine={selectedVaccine} />
          </div>
        </div>

        {/* Fourth row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="component-card w-full h-auto md:h-[500px] md:flex-1">
            <VaxMilestone selectedVaccine={selectedVaccine} />
          </div>
          <div className="component-card w-full h-auto md:h-[500px] md:flex-1">
            <OutbreaksTimeline selectedVaccine={selectedVaccine} />
          </div>
        </div>

        {/* Fifth row */}
        <div
          className="component-card w-full h-auto md:h-[500px]"
          onClick={() => navigate("/map")}
        >
          <VaxMap selectedVaccine={selectedVaccine} />
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}