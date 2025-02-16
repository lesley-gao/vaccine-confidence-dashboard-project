/**
 * This component displays the number of disease cases related to a selected vaccine over a specified year range (2016-2022).
 * It fetches and visualizes the data as a stacked bar chart, allowing users to track the trends of disease cases.
 */
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from '@/utils/api.js'
import DataSource from "./DataSource";
import PlaceHolder from "./PlaceHolder";

function DiseaseCase({ selectedVaccine }) {

  const [diseaseCases, setDiseaseCases] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set the year range（2016-2022）
  const startYear = 2016;
  const finishYear = 2022;

  useEffect(() => {
    const getDiseaseCases = async () => {
      if (!selectedVaccine?.vaccineId) return;

      setLoading(true);
      try {
        const data = await fetchData(`/disease/all?vaccineId=${selectedVaccine.vaccineId}`);

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
  }, [selectedVaccine]);


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
    type: "bar",
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
        <p className='text-xl font-bold font-PoppinsBold dark:text-cyan-300'>Disease Cases ({`${startYear}`}-{`${finishYear}`})</p>
        {diseaseCases && diseaseCases.length > 0 && <DataSource selectedVaccine={selectedVaccine} componentId="dis_cases" />}
      </div>

      {!diseaseCases || diseaseCases.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <PlaceHolder />
        </div>
      ) : (
        <div className='flex-1 justify-center'>
          <Plot
            data={dataToDisplay}
            layout={layout}
            style={{ width: '100%', height: '100%' }}
            config={{
              responsive: true,
              displayModeBar: true,
              displaylogo: false,
              modeBarButtons: [['toImage', 'zoom2d', 'pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']],
              toImageButtonOptions: {
                format: 'png',
                filename: 'Disease Cases',
                height: 600,
                width: 800,
                scale: 2
              },
            }}
            useResizeHandler={true}
          />
        </div>
      )}
    </div>
  );
}

export default DiseaseCase;