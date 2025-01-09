import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useAppContext } from "@/context/AppContextProvider.jsx";

function DiseaseCase() {

  const [diseaseCases, setDiseaseCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedVaccine, fetchData } = useAppContext();
  
    // Set the year range（2016-2022）
    const startYear = 2016;
    const finishYear = 2022;
  
    useEffect(() => {
      const getDiseaseCases = async () => {
          if (!selectedVaccine?.vaccineId) return;
  
          setLoading(true);
          try {
              const data = await fetchData(`/disease/all?vaccineId=${selectedVaccine.vaccineId}`);
              console.log('Fetched disease cases:', data);
  
              if (data && Array.isArray(data)) {
  
                // Filter the year range
                const filteredData = data.map(disease => {
                  return {
                    name: disease.disease.diseaName,
                    x: disease.diseaAnnualCaseVOList
                      .filter(diseaseCase => diseaseCase.dacYear >= startYear && diseaseCase.dacYear <= finishYear)
                      .map(diseaseCase => diseaseCase.dacYear),
                    y: disease.diseaAnnualCaseVOList
                      .filter(diseaseCase => diseaseCase.dacYear >= startYear && diseaseCase.dacYear <= finishYear)
                      .map(diseaseCase => diseaseCase.dacNumbers),
                  };
                });
                setDiseaseCases(filteredData);
              }
          } catch (error) {
              console.error('Failed to fetch disease cases:', error);
              setDiseaseCases([]);
          } finally {
              setLoading(false);
          }
      };
  
      getDiseaseCases();
  }, [selectedVaccine]); // re-fetch incidence rates when the selected vaccine changes
  
  if (loading) {
      return (
          <div className="h-full flex items-center justify-center bg-gray-50 border-2 border-white rounded-xl">
              <div className="text-gray-500">Loading disease cases...</div>
          </div>
      );
  }

  const dataToDisplay = diseaseCases.map(caseData => ({
    x: caseData.x, // 动态设置年份
    y: caseData.y, // 动态设置病例数
    type: "bar",
    name: caseData.name, // 疾病名称
    marker: { color: caseData.name === "Measles" ? "#8979FF" : caseData.name === "Mumps" ? "#FF928A" : "#3CC3DF" },
  }));

  const layout = {
    xaxis: { title: "Year", type: "category" },
    yaxis: {
      title: "Number of Cases",
    },
    barmode: "stack",
    margin: {
      l: 70,
      r: 20,
      t: 10,
      b: 40,
    },
    legend: {
      x: 0.95,
      y: 0.15,
      xanchor: "right",
      yanchor: "bottom",
    },
    paper_bgcolor: '#f8f9fa',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    autosize: true,
  }

  return (
    <div className="h-full p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col">

      <div className="text-xl font-bold font-PoppinsBold mb-3"> Disease Cases ({`${startYear}`}-{`${finishYear}`}) </div>

      <div className='flex-1 justify-center'>
        <Plot
          data={dataToDisplay}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
          useResizeHandler={true}
        />
      </div>

    </div>
  );
}

export default DiseaseCase;