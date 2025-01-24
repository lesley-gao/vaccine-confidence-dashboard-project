import React, { useState, useEffect } from "react";
import DataSource from "./DataSource";
import { vaxDesciption } from "@/data/vaxDesciption";

function VaccineDescription({ selectedVaccine }) {
  const [vaxDesc, setVaxDesc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const dataSource = {
    websiteName: "ESR",
    URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
  };

  useEffect(() => {
    const fetchVaxDescription = async () => {
      if (!selectedVaccine?.vaccineId) return;

      setLoading(true);
      try {
        const vaccineData = vaxDesciption.find(
          (vaccine) => vaccine.vacIdPk === selectedVaccine.vaccineId
        );
        setVaxDesc(vaccineData ? vaccineData.vax_Description : null);
        setIsExpanded(false);
      } catch (error) {
        console.error("Failed to fetch vaccine data:", error);
        setVaxDesc(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVaxDescription();
  }, [selectedVaccine]);

  if (loading) {
    return (
      <div className="p-4 flex flex-col">
        <div className="text-gray-500">Loading vaccine description...</div>
      </div>
    );
  }

  if (!selectedVaccine || selectedVaccine.vaccineId == null) {
    return (
      <div className="p-4 flex flex-col">
        <div className="text-gray-500">Please select a vaccine to view its description.</div>
      </div>
    );
  }

  const getDisplayParagraphs = () => {
    if (!vaxDesc) return ["No vaccine description available for the selected vaccine."];
    const paragraphs = vaxDesc.split("\n\n"); 
    return isExpanded ? paragraphs : [paragraphs[0]];  
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Title and Data Source */}
      <div className="flex flex-row gap-2 items-center relative">
        <div className="text-xl font-bold font-PoppinsBold">Vaccine Description</div>
        <DataSource dataSource={dataSource} />
        <DataSource dataSource={dataSource} />
      </div>

      {/* Vaccine Description Paragraphs */}
      <div className="text-justify text-slate-700 transition-all duration-300">
        {getDisplayParagraphs().map((paragraph, index) => (
          <p key={index} className="mb-3">
            {paragraph}
          </p>
        ))}
        {vaxDesc && vaxDesc.includes("\n\n") && (
          <div className=" flex justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="  text-indigo-600 hover:text-indigo-900 font-medium"
          >
            {isExpanded ? '<< See less' : '>> See more...'}
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccineDescription;
