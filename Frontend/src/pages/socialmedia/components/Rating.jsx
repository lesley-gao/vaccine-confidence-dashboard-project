import React, { useState, useEffect, useRef } from "react";

export default function Rating() {
    const platforms = [
        { 
            name: "Facebook", 
            attitude: "Positive",
            sentiments: [
                { name: "Positive", value: 9, total: 10 },
                { name: "Neutral", value: 4, total: 10 },
                { name: "Negative", value: 2, total: 10 },
            ]
        },
        { 
            name: "Reddit", 
            attitude: "Negative",
            sentiments: [
                { name: "Positive", value: 3, total: 10 },
                { name: "Neutral", value: 5, total: 10 },
                { name: "Negative", value: 7, total: 10 },
            ]
        },
        { 
            name: "Quora", 
            attitude: "Neutral",
            sentiments: [
                { name: "Positive", value: 5, total: 10 },
                { name: "Neutral", value: 6, total: 10 },
                { name: "Negative", value: 3, total: 10 },
            ]
        },
        { 
            name: "Twitter", 
            attitude: "Positive",
            sentiments: [
                { name: "Positive", value: 8, total: 10 },
                { name: "Neutral", value: 4, total: 10 },
                { name: "Negative", value: 2, total: 10 },
            ]
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % platforms.length);
    };

    const handleLast = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? platforms.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => {
            if (chartRef.current) {
                observer.unobserve(chartRef.current);
            }
        };
    }, []);

    const currentPlatform = platforms[currentIndex];

    return (
        <div className="w-1/2 h-full pl-10 pr-10">
            <div
                ref={chartRef}
                className="flex flex-col w-full justify-center "
            >
            
            <div className="flex flex-col">
                <div className="flex flex-col gap-6 m-auto">
                {/* Label */}
                <div className="flex flex-row gap-4 items-center mt-6">
                    <button
                        onClick={handleLast}
                        className="text-[#152063] text-[30px] font-BaiJamjureeBold"
                    >
                        ◀
                    </button>

                    <div className="text-[#152063] text-[25px] font-BaiJamjureeBold">
                        Platform:{" "}
                        <span className="text-[#5483B3]">
                            {currentPlatform.name}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        className="text-[#152063] text-[30px] font-BaiJamjureeBold"
                    >
                        ▶
                    </button>
                </div>

                 {/* Expressions */}
                 <div className="flex gap-10 items-center">
                        <img
                            className={`w-[120px] h-[120px] transition-all ${
                                currentPlatform.attitude === "Negative"
                                    ? ""
                                    : "grayscale opacity-50"
                            }`}
                            src="src/assets/unhappy face.png"
                            alt="Unhappy Face"
                        />
                        <img
                            className={`w-[120px] h-[120px] transition-all ${
                                currentPlatform.attitude === "Neutral"
                                    ? ""
                                    : "grayscale opacity-50"
                            }`}
                            src="src/assets/normal face.png"
                            alt="Normal Face"
                        />
                        <img
                            className={`w-[120px] h-[120px] transition-all ${
                                currentPlatform.attitude === "Positive"
                                    ? ""
                                    : "grayscale opacity-50"
                            }`}
                            src="src/assets/happy face.png"
                            alt="Happy Face"
                        />
                    </div>
                </div>

                {/* Rating bar */}
                <div className="flex flex-col justify-between w-full h-full gap-10 mt-10 m-auto">
                    {currentPlatform.sentiments.map((sentiment, index) => (
                        <div key={index} className="flex items-center">
                            {/* Label */}
                            <div className="text-[#152063] text-[30px] font-BaiJamjureeBold w-[120px] flex-shrink-0 ml-8 mr-8">
                                {sentiment.name}
                            </div>

                            {/* Progress Bar */}
                            <div className="relative flex-1 h-10 bg-gray-200 rounded-[15px] overflow-hidden">
                                <div className="absolute h-full bg-gradient-to-r from-[#3949AB] to-[#152063] rounded-[15px] transition-all duration-1000 ease-in-out"
                                    style={{ width: isVisible? `${(sentiment.value / sentiment.total) * 100}%`: "0%",}}
                                ></div>
                            </div>

                            {/* Value */}
                            <div className="text-[#152063] text-[30px] font-BaiJamjureeBold w-[100px] text-right flex-shrink-0">
                                <span className="text-[#5483B3]">
                                    {sentiment.value}
                                </span>
                                /{sentiment.total}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}
