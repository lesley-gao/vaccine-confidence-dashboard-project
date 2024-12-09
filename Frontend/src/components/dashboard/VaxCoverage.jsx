import React from 'react';
import Plot from 'react-plotly.js';

export default function VaxCoverage() {
    const data = [
        {
            x: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            y: [0.92, 0.93, 0.92, 0.92, 0.91, 0.91, 0.90, 0.89],
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Vaccine Coverage Rate',
            line: { color: 'rgba(75, 192, 192, 1)', width: 3 },
            fill: 'tozeroy',
            fillcolor: 'rgba(75, 192, 192, 0.2)',
        },
    ];

    const layout = {
        xaxis: {
            title: 'Year',
            tickfont: { size: 12 },
        },
        yaxis: {
            title: 'Coverage Rate (%)',
            range: [0, 1],
            tickformat: '.0%',
            dtick: 0.1,
            tickfont: { size: 12 },
        },
        margin: { t: 50, l: 50, r: 30, b: 40 },
        paper_bgcolor: '#f8f9fa',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        autosize: true,
    };

    return (
        <div className="h-full p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col">
            <h1 className="text-xl font-bold font-PoppinsBold mb-3">Vaccine Coverage Rate</h1>
            <div className="flex-1 relative">
                <Plot
                    data={data}
                    layout={layout}
                    config={{ responsive: true }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    useResizeHandler={true}
                />
            </div>
        </div>
    );
}