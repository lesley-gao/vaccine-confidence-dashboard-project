/**
 * This component displays the description of a selected vaccine.
 * The description is shown with an option to expand for more details.
 * It is displayed on the Dashboard page.
 */
import React, { useState, useEffect } from "react";
import DataSource from "./DataSource";
import { fetchData } from '@/utils/api.js'

function VaccineDescription({ selectedVaccine }) {
  const [vaxDesc, setVaxDesc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch vaccine description
  useEffect(() => {
    const getDescription = async () => {
      if (!selectedVaccine?.vaccineId) return;

      setLoading(true);
      try {
        const data = await fetchData(
          `/vaccine/get/vac-id?vaccineId=${selectedVaccine.vaccineId}`
        );
        if (data && data.vacDescription) {
          const description = data.vacDescription;

          setVaxDesc(description);
        }
      } catch (error) {
        console.error("Failed to fetch description:", error);
        setVaxDesc(null);
      } finally {
        setLoading(false);
      }
    };

    getDescription();
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

  const processedDesc = vaxDesc ? vaxDesc.replace(/\\n/g, '\n\n') : '';

  const getDisplayParagraphs = () => {
    if (!vaxDesc) {
      return ["No vaccine description available for the selected vaccine."];
    }

    const paragraphs = processedDesc.split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);

    return isExpanded ? paragraphs : [paragraphs[0]];
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Title and Data Source */}
      <div className="flex flex-row gap-2 items-center relative">
        <div className="text-xl font-bold font-PoppinsBold dark:text-cyan-300">Vaccine Description</div>
        {vaxDesc && <DataSource selectedVaccine={selectedVaccine} componentId="vax_desc" />}
      </div>

      {/* Vaccine Description Paragraphs */}
      {!vaxDesc || vaxDesc.length === 0 ? (
        <p className=" flex items-center justify-center text-gray-500 text-lg my-5 dark:text-slate-300">
          Sorry, no description is available for this vaccine yet.
        </p>
      ) : (
        <div className="text-justify text-slate-700 transition-all duration-300 dark:text-white">
          {getDisplayParagraphs().map((paragraph, index) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
          {vaxDesc && processedDesc.split('\n\n').filter(p => p.trim().length > 0).length > 1 && (
            <div className=" flex justify-end">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="  text-[#3949AB] hover:text-[#152063] font-semibold dark:text-cyan-300"
              >
                {isExpanded ? '<< Collapse' : '>> See more...'}
              </button>
            </div>
          )}
        </div>)}
    </div>
  );
}

export default VaccineDescription;