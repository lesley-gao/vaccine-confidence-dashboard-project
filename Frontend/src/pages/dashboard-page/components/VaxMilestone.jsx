// This is the compoment that displays the milestones of the MMR vaccine. 
//It uses the react-vertical-timeline-component library to display the milestones in a vertical timeline. 
//The component will be used in DashboardPage.
import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useAppContext } from "@/context/AppContextProvider.jsx";

export default function VaxMilestone() {

    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedVaccine, fetchData } = useAppContext();

    useEffect(() => {
        const getMilestones = async () => {
            if (!selectedVaccine?.vaccineId) return;

            setLoading(true);
            try {
                const data = await fetchData(`/vaccine/vacDevMilestone/vacId?vaccineId=${selectedVaccine.vaccineId}`);
                console.log('Fetched milestones:', data);
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
    }, [selectedVaccine]); // re-fetch milestones when the selected vaccine changes

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50 border-2 border-white rounded-xl">
                <div className="text-gray-500">Loading milestone data...</div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)]">

            {/* title */}
            <div className="flex-none p-4">
                <h1 className="text-xl font-bold font-PoppinsBold">Vaccine Development</h1>
            </div>

            {/* content */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="relative px-4">
                    {milestones.length > 0 ? (
                        <VerticalTimeline className="vertical-timeline-custom">
                            {milestones.slice().reverse().map((milestone, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    className="vertical-timeline-element"
                                    date={milestone.vdmYear}
                                    iconStyle={{
                                        background: 'linear-gradient(180deg, #3E62AD, #789DBC)',
                                        color: '#fff',
                                        width: '24px',
                                        height: '24px',
                                        margin: '4px 0 0 -12px'
                                    }}
                                    contentStyle={{
                                        background: '#f9f9f9',
                                        color: '#333',
                                        border: '1px solid #3A1078',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        boxShadow: 'none'
                                    }}
                                    contentArrowStyle={{ borderRight: '7px solid #3A1078'}}
                                >
                                    <p className="text-sm">{milestone.vdmDescription}</p>
                                </VerticalTimelineElement>
                    ))}
                        </VerticalTimeline>
                        ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No milestone data available for this vaccine.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

