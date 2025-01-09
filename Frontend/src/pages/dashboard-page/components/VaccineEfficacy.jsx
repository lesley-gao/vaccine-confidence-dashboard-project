import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContextProvider.jsx";

function VaccineEfficacy() {
  const [efficacy, setEfficacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDose, setSelectedDose] = useState(null); 
  const [severeCases, setSevereCases] = useState(null);
  const [mortalityRates, setMortalityRates] = useState({}); 
  const { selectedVaccine, fetchData } = useAppContext();

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
          setSevereCases(efficacyData.vacSevereCases);
          setSelectedDose(Object.keys(parsedEfficacy)[0]); 
        }
      } catch (error) {
        console.error("Failed to fetch efficacy:", error);
        setEfficacy(null);
        setSevereCases(null);
      } finally {
        setLoading(false);
      }
    };

    const getMortalityData = async () => {
      if (!selectedVaccine?.vaccineId) return;

      try {
        const mortalityData = await fetchData(
          `/disease/all?vaccineId=${selectedVaccine.vaccineId}`
        );
        console.log("Fetched mortality data:", mortalityData);

        if (mortalityData && Array.isArray(mortalityData)) {
          const mortalityRates = {};
          mortalityData.forEach((disease) => {
            mortalityRates[disease.disease.diseaName] =
              disease.disease.diseaMortalityRate || "0";
          });
          setMortalityRates(mortalityRates);
        }
      } catch (error) {
        console.error("Failed to fetch mortality data:", error);
        setMortalityRates({});
      }
    };

    getEfficacy();
    getMortalityData();

  }, [selectedVaccine]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 border-2 border-white rounded-xl">
        <div className="text-gray-500">Loading vaccine efficacy...</div>
      </div>
    );
  }

  if (!efficacy || !mortalityRates) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 border-2 border-white rounded-xl">
        <div className="text-gray-500">No vaccine efficacy data available.</div>
      </div>
    );
  }


  // Button formatting text based on the number of doses
  const formatDoseLabel = (doseKey, index) => {
    const ordinalSuffix = ["st", "nd", "rd"];
    const suffix = ordinalSuffix[index] || "th"; // More than 3rd will use "th"
    return `${index + 1}${suffix} Dose`;
  };


  const efficacyData = selectedDose
    ? Object.entries(efficacy[selectedDose]).map(([vaccine, efficacy]) => ({
        vaccine,
        efficacy,
      }))
    : [];

  return (
    <div className="p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col gap-3 h-full">
      {/* Title and Dose Buttons */}
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl font-bold font-PoppinsBold">Vaccine Efficacy</div>
        <div className="mt-2 flex justify-center gap-2">
        {Object.keys(efficacy).map((doseKey, index) => (
            <button
              key={doseKey}
              onClick={() => setSelectedDose(doseKey)}
              className={`px-4 py-2 text-sm font-bold text-white rounded focus:outline-none transition-all duration-300 transform ${
                selectedDose === doseKey
                  ? "bg-[#3949ab] scale-105"
                  : "bg-gray-400 hover:bg-gray-500 hover:scale-105 active:scale-95"
              }`}
            >
              {formatDoseLabel(doseKey, index)}
            </button>
          ))}
        </div>
      </div>

      {/* Vaccine Efficacy Data */}
      <div className="flex flex-row justify-between items-center h-full mt-4 gap-2">
        <div className="flex flex-col w-[50%] gap-4">
          {efficacyData.map((item, index) => (
            <div key={index} className="flex flex-row items-center flex-shrink-0">
              <p className="text-[#292d32] text-[14px] font-PoppinsRegular">
                <span className="text-[#00ac4f] text-[18px] font-PoppinsBold leading-[100%]">
                  {item.efficacy}
                </span>{" "}
                effective against {item.vaccine}
              </p>
            </div>
          ))}
        </div>

        {/* Dividing Line */}
        <div className="w-[1px] h-[80%] bg-gray-200"></div>

        {/* Severe cases */}
        <div className="flex flex-col items-center flex-1 gap-4 w-[30%]">
          <p className="text-[#292d32] text-[16px] font-PoppinsRegular text-center">
            Severe Cases in 5 Years
          </p>
          <p className="text-[#D0004B] text-[28px] font-PoppinsBold leading-[100%]">
          {severeCases ? `${severeCases}` : "0"}
          </p>
        </div>

        {/* Dividing Line */}
        <div className="w-[1px] h-[80%] bg-gray-200"></div>

        {/* Mortality Rate */}
        <div className="flex flex-col items-center flex-1 gap-4 w-[30%]">
          <p className="text-[#292d32] text-[16px] font-PoppinsRegular text-center">
            Mortality Rate
          </p>

          {Object.entries(mortalityRates).map(([disease, rate], index) => (
            <div key={index} className="flex flex-col">
              <p className="text-[12px]">
                {disease}{" "}
                <span className="text-[#D0004B] text-[16px] font-PoppinsBold leading-[100%]">
                  {rate}%
                </span>
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default VaccineEfficacy;