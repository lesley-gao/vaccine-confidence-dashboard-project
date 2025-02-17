/**
 * This component displays the top-ranked words from social media sentiment analysis, filtered by sentiment type and platform.
 * It is used on the SocialMedia page.
 */
import React, { useState } from "react";

export default function Ranking({ wordData, platform }) {
  const [filter, setFilter] = useState("positive");

  const currentPlatformWords = (wordData || [])
    .filter((word) => word.platform === platform?.name && word.attitude === filter && word.time === platform?.time)
    .sort((a, b) => b.value - a.value);

  return (
    <div className="h-full pl-2 pr-2 component-card">
      <div className="flex flex-col w-full items-center relative">
        <p className="w-[90%] mt-6 mb-2 text-2xl font-bold gap-2 text-center text-black dark:text-white">
          Hot Words on {platform?.name || "Unknown Platform"}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          * Maximum frequency normalization is used here. *
        </p>

        <div className="flex justify-center gap-2 my-4">
          <button
            onClick={() => setFilter("positive")}
            className={`px-3 py-1 rounded text-sm dark:text-black ${filter === "positive" ? "bg-[#81B214] text-white" : "bg-gray-200"}`}
          >
            Positive
          </button>
          <button
            onClick={() => setFilter("neutral")}
            className={`px-3 py-1 rounded text-sm dark:text-black ${filter === "neutral" ? "bg-[#efad03] text-white" : "bg-gray-200"}`}
          >
            Neutral
          </button>
          <button
            onClick={() => setFilter("negative")}
            className={`px-3 py-1 rounded text-sm dark:text-black ${filter === "negative" ? "bg-[#D0004B] text-white" : "bg-gray-200"}`}
          >
            Negative
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mb-4 text-sm">
          {currentPlatformWords.slice(0, 15).map((word, index) => (
            <div
              key={index}
              className="flex justify-between py-1 px-4 border-b border-gray-300 text-black dark:text-cyan-300"
            >
              <span className="font-bold ">Top {index + 1}</span>
              <span className="dark:text-white">{word.text}</span>
              <span className="text-gray-600 dark:text-white/60">{(word.value / 1000).toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
