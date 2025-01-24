import { FormatTextdirectionLToR } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DemographicDetails({ demoData, question, selectedDemoType }) {
    const [comparisonData, setComparisonData] = useState([]);

    useEffect(() => {
        if (!demoData || !Array.isArray(demoData)) return;

        // Filter data for 2018 and 2023, and the selected demographic type
        const filteredData = demoData.filter(item =>
            (item.vsdYear === 2018 || item.vsdYear === 2023) &&
            item.vsdDemographics === selectedDemoType
        );

        // Get value based on the selected question
        const getValue = (item) => {
            switch (question) {
                case "Vaccines are important for children.":
                    return item.vsdChildren * 100;
                case "Vaccines are safe.":
                    return item.vsdSafe * 100;
                case "Vaccines are effective.":
                    return item.vsdEffective * 100;
                case "Vaccines are compatible with my beliefs.":
                    return item.vsdBeliefs ? item.vsdBeliefs * 100 : null;
                default:
                    return 0;
            }
        };

        // Group data by category using reduce
        const groupedData = filteredData.reduce((acc, item) => {
            // If this category doesn't exist yet, initialize it
            if (!acc[item.vsdDmgType]) {
                acc[item.vsdDmgType] = {
                    category: item.vsdDmgType,
                    year2018: 0,
                    year2023: 0
                };
            }

            // Add data for the appropriate year
            if (item.vsdYear === 2018) {
                acc[item.vsdDmgType].year2018 = getValue(item);
            } else if (item.vsdYear === 2023) {
                acc[item.vsdDmgType].year2023 = getValue(item);
            }

            return acc;
        }, {});

        // Convert the grouped data object to an array
        const transformedData = Object.values(groupedData);

        setComparisonData(transformedData);
    }, [demoData, question, selectedDemoType]);

    const getChartTitle = () => {
        const formattedQuestion = question.replace('.', '');
        return `Attitude Comparison by ${selectedDemoType} on "${formattedQuestion}" (2018 vs 2023)`;
    };

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                    <p className="font-semibold">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {`${entry.name === 'year2018' ? '2018' : '2023'}: ${entry.value.toFixed(1)}%`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[480px] p-4">
            <h2 className="text-center text-lg font-semibold mb-4 text-indigo-900">
                {getChartTitle()}
            </h2>
            {comparisonData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 60, bottom: 40 }} >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="category"
                            label={{
                                value: selectedDemoType,
                                position: 'bottom',
                                offset: 20,
                                style: { fill: '#666' }
                            }}
                        />
                        <YAxis
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                            label={{
                                value: 'Percentage of Respondents Who Agree (%)',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -30,
                                style: { textAnchor: 'middle', fill: '#666' }
                            }}
                        />
                        <Tooltip content={customTooltip} />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            payload={[
                                { value: '2018', type: 'rect', color: '#4F46E5' },
                                { value: '2023', type: 'rect', color: '#2DD4BF' }
                            ]}
                            wrapperStyle={{ paddingLeft: '40px' }}
                            iconSize={15}
                            formatter={(value) => <span className="px-4">{value}</span>}
                        />
                        <Bar dataKey="year2018" name="2018" fill="#4F46E5" barSize={30} />
                        <Bar dataKey="year2023" name="2023" fill="#2DD4BF" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            )
            }
        </div>
    );
}