import React, { useState, useEffect } from "react";
import CloudWord from "./components/CloudWords";
import Ranking from "./components/Ranking";
import WeeklyTrend from "./components/WeeklyTrend";
import PlatformSelectButton from "./components/PlatformSelectButton";
import { fetchData } from '@/utils/api.js'

export default function SocialMediaPage() {
  const [wordData, setWordData] = useState([]);
  const [platforms, setPlatforms] = useState([]); // All platforms
  const [filteredPlatforms, setFilteredPlatforms] = useState([]); // Latest platforms
  const [sentimentData, setSentimentData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWordData = async () => {
      setLoading(true);
      try {
        const wordResponse = await fetchData(
          "/vaccine/socialMedia/wordFrequency/general"
        );
        const sentimentResponse = await fetchData(
          "/vaccine/socialMedia/sentimentScore/general"
        );

        // Process word data
        const transformWordData = (list) =>
          list.map((item) => ({
            text: item.gsmwfWord,
            time: item.gsmwfTimeCreated,
            value: item.gsmwfFrequency * 1000,
            originalFrequency: item.gsmwfFrequency,
            attitude: item.gsmwfSentiment,
            platform: item.gsmwfPlatform,
          }));

        setWordData(transformWordData(wordResponse));
        setSentimentData(sentimentResponse);

        // Process sentiment data
        const transformSentimentData = (list) =>
          list.map((item) => {
            const maxSentiment = Math.max(
              item.gsmssPositive,
              item.gsmssNeutral,
              item.gsmssNegative
            );

            const attitude =
              maxSentiment === item.gsmssPositive
                ? "Positive"
                : maxSentiment === item.gsmssNegative
                  ? "Negative"
                  : "Neutral";

            return {
              name: item.gsmssPlatform,
              attitude,
              time: item.gsmssTimeCreated,
              totalScore:
                item.gsmssPositive + item.gsmssNeutral + item.gsmssNegative,
              sentiments: [
                { name: "Positive", value: item.gsmssPositive },
                { name: "Neutral", value: item.gsmssNeutral },
                { name: "Negative", value: item.gsmssNegative },
              ],
            };
          });

        const allPlatforms = transformSentimentData(sentimentResponse);

        const latestTime = Math.max(
          ...allPlatforms.map((platform) => new Date(platform.time).getTime())
        );

        // Filter platforms to include only the latest time
        const latestPlatforms = allPlatforms.filter(
          (platform) =>
            new Date(platform.time).getTime() === latestTime
        );

        setPlatforms(allPlatforms);
        setFilteredPlatforms(latestPlatforms);
      } catch (error) {
        console.error("Error loading API data:", error);
        setWordData([]);
        setPlatforms([]);
        setFilteredPlatforms([]);
        setSentimentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWordData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const latestUpdateTime = wordData[0]?.time || "Unknown";

  return (
    <div className="h-full">
      <div className='relative'>
        <img src="/image/socialmedia.jpg" alt="survey" className="w-full mb-4 rounded-xl transition-all duration-300 shadow-md opacity-85" />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 font-bold">
          <p className="text-2xl text-white uppercase mb-2">
            Vaccine Attitudes on Social Media
          </p>
          <p className="text-indigo-900 text-lg">
            Track vaccine confidence and sentiment trends across platforms
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-8 justify-center">
        <PlatformSelectButton
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          platforms={filteredPlatforms}
        />
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-700">Recently update time:</span>
          <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800">
            {latestUpdateTime}
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full items-stretch py-4 gap-4">
        <div className="flex-1">
          <CloudWord
            wordData={wordData}
            platforms={filteredPlatforms}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <Ranking
            wordData={wordData}
            platforms={filteredPlatforms}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <WeeklyTrend
            platforms={platforms}
            sentimentData={sentimentData}
          />
        </div>
      </div>
    </div>
  );
}