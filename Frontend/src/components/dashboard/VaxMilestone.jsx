// This is the compoment that displays the milestones of the MMR vaccine. 
//It uses the react-vertical-timeline-component library to display the milestones in a vertical timeline. 
//The component will be used in DashboardPage.
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function VaxMilestone() {

    const milestones = [
        { year: "1989", desciption: "Enhanced MMR-II vaccine released, using an improved manufacturing process." },
        { year: "1988", desciption: "Introduction of a second MMR dose recommendation in the US to provide better protection." },
        { year: "1972", desciption: "MMR vaccine is licensed in the United States and begins to be widely used." },
        { year: "1971", desciption: "Maurice Hilleman and colleagues at Merck develop the combined MMR vaccine, incorporating all three components." },
        { year: "1969", desciption: "First rubella vaccine licensed, developed by Stanley Plotkin using the RA 27/3 strain." },
        { year: "1967", desciption: "First mumps vaccine licensed, also developed by Hilleman using the Jeryl Lynn strain (named after his daughter)." },
        { year: "1967", desciption: "Maurice Hilleman develops a more attenuated measles vaccine (Moraten strain) that is still used today." },
        { year: "1963", desciption: "First measles vaccine licensed in the United States, developed by John Enders and colleagues." },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)]">
          
            {/* title */}
            <div className="flex-none p-4">
                <h1 className="text-xl font-bold font-PoppinsBold">Vaccine Development</h1>
            </div>

            {/* content */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="relative px-4">
                    <VerticalTimeline className="vertical-timeline-custom">
                        {milestones.map((milestone, index) => (
                            <VerticalTimelineElement
                                key={index}
                                className="vertical-timeline-element"
                                date={milestone.year}
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
                                contentArrowStyle={{
                                    borderRight: '7px solid #3A1078'
                                }}
                            >
                                <p className="text-sm">{milestone.desciption}</p>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>
        </div>
    );
}

