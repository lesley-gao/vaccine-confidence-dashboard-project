/**
 * This component displays a bar chart that visually represents survey results.
 * It is used on the Survey page.
 */
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

export default function SurveyChart({ data, selectedDemoType, year, question }) {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const getAxisLabels = () => {
        switch (selectedDemoType) {
            case 'Age':
                return { y: 'Age Group', x: 'Percentage of Respondents Who Agree' };
            case 'Education':
                return { y: 'Education Level', x: 'Percentage of Respondents Who Agree' };
            case 'Gender':
                return { y: 'Gender', x: 'Percentage of Respondents Who Agree' };
            case 'Religion':
                return { y: 'Religion', x: 'Percentage of Respondents Who Agree' };
            default:
                return { y: 'Category', x: 'Percentage of Respondents Who Agree' };
        }
    };

    const axisLabels = getAxisLabels();
    const hasValidData = data && data.length > 0 && data.some(item => item.agree_percent !== null && item.agree_percent !== 0);

    return (
        <div className="p-4 w-full h-full">
            <h3 className="text-lg font-semibold mb-2 text-indigo-900 dark:text-cyan-300">{`${year} Survey Results by ${selectedDemoType}`}</h3>
            <p className="text-sm mb-4 text-gray-600 dark:text-slate-200">"{question}"</p>

            <div className="w-full h-[calc(100%-80px)]">
                {hasValidData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 60, bottom: 30 }}
                        >
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#152063" stopOpacity={0.9} />
                                    <stop offset="33%" stopColor="rgb(147, 51, 234)" stopOpacity={0.9} />
                                    <stop offset="66%" stopColor="rgb(59, 130, 246)" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="rgb(45, 212, 191)" stopOpacity={1} />
                                </linearGradient>
                            </defs>

                            <XAxis
                                type="number"
                                domain={[0, 100]}
                                tickFormatter={(value) => `${value}%`}
                                tick={{
                                    fontSize: 13,
                                    fill: isDark ? '#ffffff' : '#4b5563'
                                }}
                                tickLine={{ stroke: isDark ? '#ffffff' : '#4b5563' }}
                                axisLine={{ stroke: isDark ? '#ffffff' : '#4b5563' }}
                            >
                                <Label
                                    value={axisLabels.x}
                                    position="bottom"
                                    offset={15}
                                    style={{
                                        fill: isDark ? '#ffffff' : '#4b5563',
                                        fontSize: '0.875rem'
                                    }}
                                />
                            </XAxis>

                            <YAxis
                                dataKey="category"
                                type="category"
                                width={100}
                                tick={{
                                    fontSize: 13,
                                    width: 120,
                                    wordWrap: 'break-word',
                                    fill: isDark ? '#ffffff' : '#4b5563'
                                }}
                                tickLine={{ stroke: isDark ? '#ffffff' : '#4b5563' }}
                                axisLine={{ stroke: isDark ? '#ffffff' : '#4b5563' }}
                            >
                                <Label
                                    value={axisLabels.y}
                                    angle={-90}
                                    position="left"
                                    offset={45}
                                    style={{
                                        fill: isDark ? '#ffffff' : '#4b5563',
                                        fontSize: '1rem'
                                    }}
                                />
                            </YAxis>

                            <Tooltip
                                formatter={(value) => [`${value}%`, 'Percentage']}
                                labelFormatter={(label) => `${selectedDemoType}: ${label}`}
                                contentStyle={{
                                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                    border: isDark ? '1px solid #334155' : '1px solid #ccc',
                                    borderRadius: '6px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    padding: '8px 12px',
                                    color: isDark ? '#e2e8f0' : '#1e293b'
                                }}
                                cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                                wrapperStyle={{ outline: 'none' }}
                            />

                            <Bar
                                dataKey="agree_percent"
                                fill="url(#colorGradient)"
                                radius={[0, 20, 20, 0]}
                                maxBarSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500 text-lg dark:text-slate-200">This is not included in the survey this year.</p>
                    </div>
                )}
            </div>
        </div>
    );
}