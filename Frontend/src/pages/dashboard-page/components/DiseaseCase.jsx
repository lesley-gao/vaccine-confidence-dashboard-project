import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from '@/utils/api.js'
import DataSource from "./DataSource";

function DiseaseCase({ selectedVaccine }) {

  const [diseaseCases, setDiseaseCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataSource = {
    websiteName: "ESR",
    URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
  };

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
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading disease cases...</div>
      </div>
    );
  }

  const dataToDisplay = diseaseCases.map(caseData => ({
    x: caseData.x,
    y: caseData.y,
    x: caseData.x,
    y: caseData.y,
    type: "bar",
    name: caseData.name,
    name: caseData.name,
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
    paper_bgcolor: '#ffffff',  
    plot_bgcolor: '#ffffff',   
    autosize: true,
  }

  return (
    <div className="h-full p-4 flex flex-col">

      <div className="flex flex-row gap-2 mb-3">
        <p className='text-xl font-bold font-PoppinsBold'>Disease Cases ({`${startYear}`}-{`${finishYear}`})</p>
        <DataSource dataSource={dataSource} />
      </div>

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