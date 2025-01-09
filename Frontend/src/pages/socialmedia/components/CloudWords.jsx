import React, { useState, useEffect } from "react";
import WordCloud from "react-d3-cloud";

export default function CloudWords({ onShowTopWords }) {

  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/output_frequencies.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const transformData = (list, attitude) =>
          list.map(([text, value]) => ({ text, value: value * 1000, attitude }));

        const mergedData = [
          ...transformData(data.positive, "positive"),
          ...transformData(data.neutral, "neutral"),
          ...transformData(data.negative, "negative"),
        ];

        setWordData(mergedData);
      } catch (error) {
        console.error("Error loading JSON:", error);
        setWordData([]);
      }
    };

    fetchData();
  }, []);

  const fontSizeMapper = (word) => Math.max(10, Math.min(Math.log2(word.value) * 10, 20));

  const colorMapper = (attitude) => {
    if (attitude === "positive") return "#4CAF50"; // Green
    if (attitude === "neutral") return "#FFC107"; // Amber
    if (attitude === "negative") return "#F44336"; // Red
    return "#000000";
  };

  return (
    <div className="flex flex-col items-center w-1/2 h-full">
      {/*  Word Cloud */}
        <div className="mt-6 text-[#152063] text-[35px] font-BaiJamjureeBold">
          Word Cloud
        </div>
        
        <div className="w-full h-auto overflow-hidden mt-2">
        
        <WordCloud
          data={wordData}
          fontSizeMapper={fontSizeMapper}
          rotate={() => 0}
          font="PoppinsRegular"
          fill={(word) => colorMapper(word.attitude)}
          padding={1}
          width={300}
          height={200} 
        />
        </div>

        <button
          onClick={() => onShowTopWords("Positive")}
          className="w-[180px] h-[35px] mb-4 text-white text-[14px] font-PoppinsRegular rounded-[10px] 
                bg-gradient-to-r from-[#3949AB] to-[#152063] shadow-[0px_5px_15px_rgba(0,0,0,0.3)] 
                hover:scale-105 hover:shadow-[0px_5px_5px_rgba(0,0,0,0.5),0_0_5px_#4a90e2] transition-all 
                duration-500 relative overflow-hidden"
        >
          Show the Top 5 words
        </button>
    </div>
  );
}
