import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from '@/utils/api.js'
import DataSource from "./DataSource";

function IncidenceRate({ selectedVaccine }) {

  const [incidenceRates, setIncidenceRates] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataSource = {
    websiteName: "ESR",
    URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
  };

  // Set the year range（2016-2022）
  const startYear = 2016;
  const finishYear = 2022;

  useEffect(() => {
    const getIncidenceRates = async () => {
      if (!selectedVaccine?.vaccineId) return;

      setLoading(true);
      try {
        const data = await fetchData(`/disease/all?vaccineId=${selectedVaccine.vaccineId}`);
        console.log('Fetched incidence rates:', data);

        if (data && Array.isArray(data)) {

          // Filter the year range
          const filteredData = data.map(disease => {
            return {
              name: disease.disease.diseaName,
              x: disease.diseaIncidenceRateVOList
                .filter(rate => rate.dirYear >= startYear && rate.dirYear <= finishYear)
                .map(rate => rate.dirYear),
              y: disease.diseaIncidenceRateVOList
                .filter(rate => rate.dirYear >= startYear && rate.dirYear <= finishYear)
                .map(rate => rate.dirRate),
            };
          });
          setIncidenceRates(filteredData);
        }
      } catch (error) {
        console.error('Failed to fetch incidence rate:', error);
        setIncidenceRates([]);
      } finally {
        setLoading(false);
      }
    };

    getIncidenceRates();
  }, [selectedVaccine]); // re-fetch incidence rates when the selected vaccine changes

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-gray-500">Loading incidence rates...</div>
      </div>
    );
  }

  const dataToDisplay = incidenceRates.map(rate => ({
    x: rate.x,
    y: rate.y,
    type: 'scatter',
    mode: 'lines+markers',
    name: rate.name,
    line: { shape: 'linear', width: 3 },
    marker: { size: 6 },
  }));

  const layout = {
    xaxis: {
      title: { text: 'Year', font: { size: 14 } },
      type: 'category',
      tickvals: Array.from({ length: finishYear - startYear + 1 }, (_, i) => startYear + i),
      tickfont: { size: 12 },
    },
    yaxis: {
      title: { text: 'Per 1,000,000 people', font: { size: 14 } },
      range: [0, Math.max(...incidenceRates.flatMap(rate => rate.y)) + 10],
      tickfont: { size: 12 },
    },
    showlegend: true,
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    margin: { l: 60, r: 20, t: 10, b: 40 },
    legend: {
      x: 0.95,
      y: 0.15,
      xanchor: 'right',
      yanchor: 'bottom',
      font: { size: 12 },
    },
    autosize: true,
  };

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex flex-row gap-2 mb-3">
        <p className='text-xl font-bold font-PoppinsBold '>Incidence Rates ({`${startYear}`}-{`${finishYear}`})</p>
        <DataSource dataSource={dataSource} />
      </div>
      <div className="flex-1">
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

export default IncidenceRate;