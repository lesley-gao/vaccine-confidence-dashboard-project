/**
 * This component visualizes frequently discussed vaccine-related topics on social media using a word cloud with sentiment-based coloring.
 * It is used on the SocialMedia page.
 */
import React, { useRef } from "react";
import WordCloud from "react-d3-cloud";
import GroupNote from "./GroupNote";
import SentimentBar from "./SentimentBar";

export default function CloudWords({ wordData, platform}) {
  const tooltipRef = useRef(null);

  const fontSizeMapper = (word) =>
    Math.max(20, Math.min(Math.log2(word.value) * 80, 30));

  const colorMapper = (attitude) => {
    if (attitude === "positive") return "#81B214"; // Green
    if (attitude === "neutral") return "#efad03"; // Yellow
    if (attitude === "negative") return "#D0004B"; // Red
    return "#000000";
  };

  const handleMouseOver = (event, word) => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      const rect = event.target.getBoundingClientRect();
      const tooltipX = rect.left + rect.width / 2;
      const tooltipY = rect.top - 5;

      tooltip.style.display = "block";
      tooltip.style.left = `${tooltipX + window.scrollX}px`;
      tooltip.style.top = `${tooltipY + window.scrollY}px`;
      tooltip.style.transform = "translate(-50%, -100%)";

      tooltip.innerHTML = `
        <strong>${word.text}</strong>: Relative strength (${word.originalFrequency.toFixed(
          2
        )})
        in <span style="color: ${colorMapper(word.attitude)};">${word.attitude}</span> attitude group
      `;
    }
  };

  const handleMouseOut = () => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = "none";
    }
  };

  return (
    <div className="flex flex-col items-center h-full component-card">
      <div className="w-[90%] mt-8 flex flex-col gap-4 text-center text-black">
        <p className="text-2xl font-bold dark:text-white">
        Frequent Discussion Topics Among Different Attitude Groups on {platform?.name || "Social Media"}
        </p>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">
          * The more frequently a word appears in the posts, the larger it is in the figure. * 
        </p>
      </div>

      <div className="w-full p-4">
        <SentimentBar
          sentiments={platform?.sentiments || []}
          totalScore={platform?.totalScore || 0}
        />
      </div>
      <div className="flex flex-row gap-2 items-center px-5">
        <GroupNote attitude={"positive"} />
        <GroupNote attitude={"neutral"} />
        <GroupNote attitude={"negative"} />
      </div>

      <div className="w-full h-auto overflow-hidden items-center mt-2">
        <WordCloud
          data={wordData.filter(
            (word) => (word.platform === platform?.name) && (word.time === platform?.time)
          )}
          fontSizeMapper={fontSizeMapper}
          rotate={() => 0}
          font="PoppinsRegular"
          fill={(word) => colorMapper(word.attitude)}
          padding={2}
          width={450}
          height={350}
          onWordMouseOver={handleMouseOver}
          onWordMouseOut={handleMouseOut}
        />
      </div>

      <div
        ref={tooltipRef}
        className="absolute hidden w-[250px] bg-gray-800 text-white text-sm px-3 py-1 rounded pointer-events-none z-100 opacity-90"
        style={{
          position: "absolute",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
}