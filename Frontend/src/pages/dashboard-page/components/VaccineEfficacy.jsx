import { TbVaccine } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import { fetchData } from '@/utils/api.js'
import DataSource from "./DataSource";

function VaccineEfficacy({ selectedVaccine }) {

  const [efficacy, setEfficacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDose, setSelectedDose] = useState(null);

  const dataSource = {
    websiteName: "ESR",
    URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
  };

  useEffect(() => {
    const getEfficacy = async () => {
      if (!selectedVaccine?.vaccineId) return;

      setLoading(true);
      try {
        const efficacyData = await fetchData(
          `/vaccine/search/id?vaccineId=${selectedVaccine.vaccineId}`
        );
        console.log("Fetched efficacy:", efficacyData);
        if (efficacyData && efficacyData.vacEfficacy) {
          const parsedEfficacy = JSON.parse(efficacyData.vacEfficacy);
          setEfficacy(parsedEfficacy);
          setSelectedDose(0);
        }
      } catch (error) {
        console.error("Failed to fetch efficacy:", error);
        setEfficacy(null);
      } finally {
        setLoading(false);
      }
    };

    getEfficacy();
  }, [selectedVaccine]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center ">
        <div className="text-gray-500">Loading vaccine efficacy...</div>
      </div>
    );
  }

  if (!efficacy) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">No vaccine efficacy data available.</div>
      </div>
    );
  }

  // Button formatting text based on the number of doses
  const formatDoseLabel = (index) => {
    const ordinalSuffix = ["st", "nd", "rd"];
    const suffix = ordinalSuffix[index] || "th";
    return `${index + 1}${suffix} Dose`;
  };

  const selectedEfficacy = selectedDose !== null ? efficacy[selectedDose] : null;

  const efficacyData = selectedEfficacy
    ? Object.entries(selectedEfficacy.efficacy).map(([vaccine, efficacy]) => ({
      vaccine,
      efficacy,
      connectText: selectedEfficacy.connect_text,
    }))
    : [];

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="flex flex-row items-center gap-2">
        <div className="text-xl font-bold font-PoppinsBold">Vaccine Efficacy</div>
        <DataSource dataSource={dataSource} />

        <div className="mt-2  flex justify-center gap-2 ml-auto">
          {efficacy.map((dose, index) => (
            <button
              key={index}
              onClick={() => setSelectedDose(index)}
              className={`px-4 py-2 text-sm font-bold text-white rounded focus:outline-none transition-all duration-300 transform ${selectedDose === index
                  ? "bg-[#3949ab] scale-105"
                  : "bg-gray-400 hover:bg-gray-500 hover:scale-105 active:scale-95"
                }`}
            >
              {formatDoseLabel(index)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-evenly items-start h-full mt-4 gap-2">
        {efficacyData.map((item, index) => (
          <div key={index} className="flex flex-row items-center flex-shrink-0 gap-5">
            <TbVaccine className=" text-3xl font-bold fill-indigo-400" /><p className="text-[#292d32] text-md font-PoppinsRegular">
              <span className="text-[#00ac4f] text-2xl font-PoppinsBold leading-[100%]">
                {item.efficacy}
              </span>{" "}
              {item.connectText} {item.vaccine}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VaccineEfficacy;