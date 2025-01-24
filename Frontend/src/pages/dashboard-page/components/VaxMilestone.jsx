// This is the compoment that displays the milestones of the MMR vaccine. 
//It uses the react-vertical-timeline-component library to display the milestones in a vertical timeline. 
//The component will be used in DashboardPage.
import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { fetchData } from '@/utils/api.js'
import DataSource from './DataSource';
import { useVaccine } from '@/hooks/useVaccine';

export default function VaxMilestone({ selectedVaccine }) {

    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataSource = {
        websiteName: "ESR",
        URL: "https://www.esr.cri.nz/expertise/public-health/infectious-disease-intelligence-surveillance/",
    };

    useEffect(() => {
        const getMilestones = async () => {
            if (!selectedVaccine?.vaccineId) return;

            setLoading(true);
            try {
                const data = await fetchData(`/vaccine/vacDevMilestone/vacId?vaccineId=${selectedVaccine.vaccineId}`);
                console.log('Fetched vaccine timeline:', data);
                if (data && Array.isArray(data)) {
                    setMilestones(data);
                }
            } catch (error) {
                console.error('Failed to fetch milestones:', error);
                setMilestones([]);
            } finally {
                setLoading(false);
            }
        };

        getMilestones();
    }, [selectedVaccine]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500">Loading milestone data...</div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row">
                <h1 className="p-4 text-xl font-bold font-PoppinsBold">Vaccine Milestones</h1>
                <DataSource dataSource={dataSource} />
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
                <div className="relative px-4">
                    {milestones.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-slate-700">No milestone data available for this vaccine.</p>
                        </div>
                    ) : milestones.length === 1 ? (
                        <p>
                            <span className="text-xl font-bold">{milestones[0].vdmYear}</span> : {milestones[0].vdmDescription}
                        </p>
                    ) : (
                        <VerticalTimeline className="custom-timeline" layout="1-column-left">
                            {milestones.slice().reverse().map((milestone, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    className="vertical-timeline-element custom-timeline-element"
                                    position="right"
                                    iconStyle={{
                                        background: 'linear-gradient(180deg, #3E62AD, #789DBC)',
                                        color: '#fff',
                                        width: '24px',
                                        height: '24px',
                                        margin: '4px 0 0 -12px',
                                    }}
                                    contentStyle={{
                                        background: '#f9f9f9',
                                        color: '#333',
                                        border: '1px solid gray',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        marginLeft: '40px',
                                        marginRight: '0',
                                    }}
                                    contentArrowStyle={{
                                        borderRight: '7px solid #3A1078',
                                    }}
                                    dateClassName="timeline-date"
                                >
                                    <div className="timeline-content">
                                        <span className="font-bold text-[#152063] block text-xl">
                                            {milestone.vdmYear}
                                        </span>
                                        <p className="text-sm">{milestone.vdmDescription}</p>
                                    </div>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>

                    )}
                </div>
            </div>
        </div>
    );
}
