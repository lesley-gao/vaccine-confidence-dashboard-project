import React, { useState, useRef } from "react";

export default function SentimentBar({ sentiments, totalScore, barHeight = "h-8" }) {
    const [hoverLabel, setHoverLabel] = useState({ text: "", top: 0, left: 0 });
    const barRef = useRef(null);

    const calculatePercentage = (value, total) =>
        ((value / total) * 100).toFixed(2);

    const handleMouseEnter = (text, event) => {
        const element = event.target; 
        const rect = element.getBoundingClientRect(); 
        const containerRect = barRef.current.getBoundingClientRect();
        const top = containerRect.top - 40; 
        const left = rect.left + rect.width / 2;

        setHoverLabel({ text, top, left });
    };

    const handleMouseLeave = () => {
        setHoverLabel({ text: "", top: 0, left: 0 });
    };

    return (
        <div className="relative w-full">
            {hoverLabel.text && (
                <div
                    className="fixed bg-gray-800 text-white text-sm px-3 py-1 rounded z-50 opacity-90"
                    style={{
                        top: `${hoverLabel.top}px`,
                        left: `${hoverLabel.left}px`,
                        transform: "translateX(-50%)",
                    }}
                >
                    {hoverLabel.text}
                </div>
            )}

            <div
                className={`relative w-full ${barHeight} bg-gray-200 rounded-[15px] overflow-hidden mb-6`}
                ref={barRef}
            >
                {sentiments.map((sentiment, index) => {
                    const previousPercentage = sentiments
                        .slice(0, index)
                        .reduce((acc, s) => acc + (s.value / totalScore) * 100 , 0);

                    return (
                        <div
                            key={index}
                            className={`absolute h-full transition-all duration-1000 ease-in-out ${
                                index === 0
                                    ? "bg-[#6FD195] rounded-l-[15px]"
                                    : index === sentiments.length - 1
                                    ? "bg-[#D0004B] rounded-r-[15px]"
                                    : "bg-[#FFDD55]"
                            }`}
                            style={{
                                left: `${previousPercentage}%`,
                                width: `${(sentiment.value / totalScore) * 100}%`,
                            }}
                            onMouseEnter={(event) => handleMouseEnter(sentiment.name, event)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="text-black font-bold text-sm absolute inset-0 flex items-center justify-center">
                                {calculatePercentage(sentiment.value, totalScore)}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
