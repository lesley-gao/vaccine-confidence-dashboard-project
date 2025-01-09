import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useAppContext } from "@/context/AppContextProvider.jsx";

export default function VaxCoverage() {

    const [vaccineCoverage, setVaccineCoverage] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedVaccine, fetchData } = useAppContext();

    useEffect(() => {
        const getVaxCoverage = async () => {
            if (!selectedVaccine?.vaccineId) return;

            setLoading(true);
            try {
                const data = await fetchData(`/vaccine/coverageRate/vacId?vaccineId=${selectedVaccine.vaccineId}`);
                console.log('Fetched data:', data);
                if (data && Array.isArray(data)) {
                    setVaccineCoverage(data);
                }
            } catch (error) {
                console.error('Failed to fetch vaccine coverage data:', error);
                setVaccineCoverage([]);
            } finally {
                setLoading(false);
            }
        };

        getVaxCoverage();
    }, [selectedVaccine]);

    // Extract data for 1st and 2nd dose or even 3rd dose coverage rates
    const firstDoseData = vaccineCoverage.find(d => d.vdName === 'dose1');
    const firstDoseYears = firstDoseData?.vacCoverageRateVOList.map(d => d.vcrYear) || [];
    const firstDoseRates = firstDoseData?.vacCoverageRateVOList.map(d => d.vcrAnnualRate) || [];

    const secondDoseData = vaccineCoverage.find(d => d.vdName === 'dose2');
    const secondDoseYears = secondDoseData?.vacCoverageRateVOList.map(d => d.vcrYear) || [];
    const secondDoseRates = secondDoseData?.vacCoverageRateVOList.map(d => d.vcrAnnualRate) || [];

    const thirdDoseData = vaccineCoverage.find(d => d.vdName === 'dose3');
    const thirdDoseYears = thirdDoseData?.vacCoverageRateVOList.map(d => d.vcrYear) || [];
    const thirdDoseRates = thirdDoseData?.vacCoverageRateVOList.map(d => d.vcrAnnualRate) || [];

    const data = [
        {
            x: firstDoseYears,
            y: firstDoseRates,
            type: 'scatter',
            mode: 'lines+markers',
            name: '1st Dose',
            line: { color: 'rgba(75, 192, 192, 1)', width: 3 },
            fill: 'tozeroy',
            fillcolor: 'rgba(75, 192, 192, 0.2)',
        },
    ];

    if (secondDoseData) {
        data.push({
            x: secondDoseYears,
            y: secondDoseRates,
            type: 'scatter',
            mode: 'lines+markers',
            name: '2nd Dose',
            line: { color: 'rgba(255, 99, 132, 1)', width: 3 },
            fill: 'tozeroy',
            fillcolor: 'rgba(255, 99, 132, 0.2)',
        });
    }

    if (thirdDoseData) {
        data.push({
            x: thirdDoseYears,
            y: thirdDoseRates,
            type: 'scatter',
            mode: 'lines+markers',
            name: '3rd Dose',
            line: { color: 'rgba(255, 206, 86, 1)', width: 3 },
            fill: 'tozeroy',
            fillcolor: 'rgba(255, 206, 86, 0.2)',
        });
    }

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
        margin: { t: 60, l: 50, r: 30, b: 40 },
        paper_bgcolor: '#f8f9fa',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        autosize: true,
        legend: { orientation: 'h', x: 0.5, y: 1.2, xanchor: 'center', yanchor: 'bottom', },
    };

    if (loading) {
        return (
            <div className="h-full p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col">
                <div className="text-gray-500">Loading vaccine coverage data...</div>
            </div>
        );
    }

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