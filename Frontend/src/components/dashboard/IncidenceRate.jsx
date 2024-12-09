import React from 'react';
import Plot from 'react-plotly.js';

function IncidenceRate() {
  const data = [
    {
      x: ['2019', '2020', '2021', '2022'],
      y: [44, 0.2, 0, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Measles',
      line: { shape: 'linear', color: '#8979FF', width: 3 },
      marker: { size: 6 },
    },
    {
      x: ['2019', '2020', '2021', '2022'],
      y: [5.3, 2.8, 0, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Mumps',
      line: { shape: 'linear', color: '#FF928A', width: 3 },
      marker: { size: 6 },
    },
    {
      x: ['2019', '2020', '2021', '2022'],
      y: [0, 0, 0, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Rubella',
      line: { shape: 'linear', color: '#3CC3DF', width: 3 },
      marker: { size: 6 },
    },
  ];

  const layout = {
    xaxis: {
      title: { text: 'Year', font: { size: 14 } },
      type: 'category',
      tickvals: ['2019', '2020', '2021', '2022'],
      tickfont: { size: 12 },
    },
    yaxis: {
      title: { text: 'Per 100,000 people', font: { size: 14 } },
      range: [0, 50],
      tickfont: { size: 12 },
    },
    showlegend: true,
    paper_bgcolor: '#f8f9fa',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
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
    <div className="h-full p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col">
      <div className="text-xl font-bold font-PoppinsBold mb-3">
        Incidence Rate (2019-2022)
      </div>
      <div className="flex-1">
        <Plot
          data={data}
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