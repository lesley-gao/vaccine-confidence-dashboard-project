import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from '@/utils/api.js';
import DataSource from './DataSource';

export default function VaxCoverage({ selectedVaccine }) {
    const [vaccineCoverage, setVaccineCoverage] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataSource = {
        websiteName: "ESR",
        URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
    };

    useEffect(() => {
        const getVaxCoverage = async () => {
            if (!selectedVaccine?.vaccineId) return;

            setLoading(true);
            try {
                const data = await fetchData(`/vaccine/coverageRate/vacId?vaccineId=${selectedVaccine.vaccineId}`);
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

    // Process data for bar chart
    const processBarChartData = () => {
        if (!vaccineCoverage.length) return { names: [], rates: [] };

        const processedData = vaccineCoverage.map(dose => ({
            name: dose.vdName === 'dose1' ? 'First Dose' :
                dose.vdName === 'dose2' ? 'Second Dose' :
                    dose.vdName === 'dose3' ? 'Third Dose' :
                        dose.vdName === 'AtLeastOneDose' ? 'At Least One Dose' :
                            dose.vdName === 'CompletePrimarySeries' ? 'Complete Primary Series' :
                                dose.vdName === 'AtLeastOneBooster' ? 'At Least One Booster' :
                                    dose.vdName,
            rate: dose.vacCoverageRateVOList[0]?.vcrAnnualRate * 100 || 0
        }));

        return {
            names: processedData.map(d => d.name),
            rates: processedData.map(d => d.rate)
        };
    };

    // Process data for line chart
    const processLineChartData = () => {
        const firstDoseData = vaccineCoverage.find(d => d.vdName === 'dose1' || d.vdName === 'AtLeastOneDose');
        const firstDoseYears = firstDoseData?.vacCoverageRateVOList.map(d => d.vcrYear) || [];
        const firstDoseRates = firstDoseData?.vacCoverageRateVOList.map(d => d.vcrAnnualRate) || [];

        const secondDoseData = vaccineCoverage.find(d => d.vdName === 'dose2' || d.vdName === 'CompletePrimarySeries');
        const secondDoseYears = secondDoseData?.vacCoverageRateVOList.map(d => d.vcrYear) || [];
        const secondDoseRates = secondDoseData?.vacCoverageRateVOList.map(d => d.vcrAnnualRate) || [];

        const thirdDoseData = vaccineCoverage.find(d => d.vdName === 'dose3' || d.vdName === 'AtLeastOneBooster');
        const thirdDoseYears = thirdDoseData?.vacCoverageRateVOList.map(d => d.vcrYear) || [];
        const thirdDoseRates = thirdDoseData?.vacCoverageRateVOList.map(d => d.vcrAnnualRate) || [];

        const data = [
            {
                x: firstDoseYears,
                y: firstDoseRates,
                type: 'scatter',
                mode: 'lines+markers',
                name: firstDoseData?.vdName === 'dose1' ? '1st Dose' : 'At Least One Dose',
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
                name: secondDoseData?.vdName === 'dose2' ? '2nd Dose' : 'Complete Primary Series',
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
                name: thirdDoseData?.vdName === 'dose3' ? '3rd Dose' : 'At Least One Booster',
                line: { color: 'rgba(255, 206, 86, 1)', width: 3 },
                fill: 'tozeroy',
                fillcolor: 'rgba(255, 206, 86, 0.2)',
            });
        }

        return { data, years: firstDoseYears };
    };

    if (loading) {
        return (
            <div className="h-full p-4 flex flex-col">
                <div className="text-gray-500">Loading vaccine coverage data...</div>
            </div>
        );
    }

    const isSingleYearData = vaccineCoverage.length > 0 &&
        vaccineCoverage.every(coverage => coverage.vacCoverageRateVOList.length === 1);

    // if only one year data, render bar chart
    if (isSingleYearData) {
        const { names, rates } = processBarChartData();
        const barData = [{
            type: 'bar',
            x: rates,
            y: names,
            orientation: 'h',
            marker: {
                color: 'rgba(79, 70, 229, 0.8)',
            },
            hovertemplate: '%{y}<br>Coverage Rate: %{x:.1f}%<extra></extra>'
        }];

        const barLayout = {
            xaxis: {
                title: 'Coverage Rate (%)',
                range: [0, 100],
                tickfont: { size: 12 },
            },
            yaxis: {
                tickfont: { size: 12 },
                automargin: true,
            },
            margin: { t: 60, l: 150, r: 30, b: 50 },
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
            autosize: true,
            showlegend: false,
            barmode: 'group',
        };

        return (
            <div className="h-full flex flex-col p-4">
                <div className="flex flex-row gap-2">
                    <h1 className="text-xl font-bold font-PoppinsBold">Vaccine Coverage Rate</h1>
                    <DataSource dataSource={dataSource} />
                </div>

                <div className="flex-1 relative">
                    <Plot
                        data={barData}
                        layout={barLayout}
                        config={{ responsive: true }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        useResizeHandler={true}
                    />
                </div>
            </div>
        );
    }

    // if multiple years data, render line chart
    const { data: lineChartData, years } = processLineChartData();
    const layout = {
        xaxis: {
            title: 'Year',
            tickfont: { size: 12 },
            range: [years[10], years[0]],
            dtick: 1,
        },
        yaxis: {
            title: 'Coverage Rate (%)',
            range: [0.5, 1],
            tickformat: '.0%',
            dtick: 0.1,
            tickfont: { size: 12 },
        },
        margin: { t: 60, l: 50, r: 30, b: 50 },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        autosize: true,
        legend: { orientation: 'h', x: 0.5, y: 1.2, xanchor: 'center', yanchor: 'top' },
    };

    return (
        <div className="h-full flex flex-col p-4">
            <div className="flex flex-row gap-2">
                <h1 className="text-xl font-bold font-PoppinsBold">Vaccine Coverage Rate</h1>
                <DataSource dataSource={dataSource} />
            </div>

            <div className="flex-1 relative">
                <Plot
                    data={lineChartData}
                    layout={layout}
                    config={{ responsive: true }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    useResizeHandler={true}
                />
            </div>
        </div>
    );
}