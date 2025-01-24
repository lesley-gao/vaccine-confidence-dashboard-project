import React, { useState } from "react";

export default function Ranking({ wordData, currentIndex, platforms, setCurrentIndex }) {
  const [filter, setFilter] = useState("positive");

  const currentPlatformWords = (wordData || [])
    .filter((word) => word.platform === platforms[currentIndex]?.name && word.attitude === filter)
    .sort((a, b) => b.value - a.value);

  if (!wordData.length || !platforms.length) {
    return (
      <div className="h-full flex items-center justify-centercomponent-card">
        <div className="text-gray-500">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="h-full pl-2 pr-2 component-card">
      <div className="flex flex-col w-full items-center relative">
        <p className="w-[90%] mt-6 mb-2 text-xl font-bold gap-2 text-center text-black">
          Top Words by Weight on {platforms[currentIndex]?.name || "Unknown Platform"}
        </p>

        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setFilter("positive")}
            className={`px-3 py-1 rounded text-sm ${filter === "positive" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            Positive
          </button>
          <button
            onClick={() => setFilter("neutral")}
            className={`px-3 py-1 rounded text-sm ${filter === "neutral" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          >
            Neutral
          </button>
          <button
            onClick={() => setFilter("negative")}
            className={`px-3 py-1 rounded text-sm ${filter === "negative" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          >
            Negative
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mb-4 text-sm">
          {currentPlatformWords.slice(0, 15).map((word, index) => (
            <div
              key={index}
              className="flex justify-between py-1 px-4 border-b border-gray-300 text-black"
            >
              <span className="font-bold">Top {index + 1}</span>
              <span>{word.text}</span>
              <span className="text-gray-600">{(word.value / 1000).toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
