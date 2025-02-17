/**
 * This component is used to display the Social Media Page which tracks vaccine-related sentiment on social media platforms
 * using word frequency analysis and sentiment trend visualization.
 */
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
          "/vaccine/social-media/word-frequency/general-vac"
        );
        const sentimentResponse = await fetchData(
          "/vaccine/social-media/sentiment-score/general-vac"
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

        console.log("原始 wordResponse 数据:", wordResponse);

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

        // Extract all platform names (de-duplicate)
        const uniquePlatforms = [...new Set(sentimentResponse.map(item => item.gsmssPlatform))];
        setPlatforms(uniquePlatforms);

        // Filter data for the latest date for each platform
        const latestDataByPlatform = {};
        sentimentResponse.forEach((item) => {
          const platform = item.gsmssPlatform;
          const time = new Date(item.gsmssTimeCreated).getTime();

          if (!latestDataByPlatform[platform] || time > new Date(latestDataByPlatform[platform].time).getTime()) {
            latestDataByPlatform[platform] = transformSentimentData([item])[0];
          }
        });

        setFilteredPlatforms(Object.values(latestDataByPlatform));

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

  const selectedPlatformData = filteredPlatforms[currentIndex] || {};
  const latestUpdateTime = selectedPlatformData?.time || "Unknown";
  
  return (
    <div className="h-full">
      <div className='relative'>
        <img src="/image/socialmedia.jpg" alt="survey" className="w-full mb-4 rounded-xl transition-all duration-300 shadow-md opacity-85" />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 font-bold">
          <p className="text-2xl text-white uppercase mb-2 max-lg:text-lg">
            Vaccine Attitudes on Social Media
          </p>
          <p className="text-indigo-900 text-lg max-lg:text-sm max-md:hidden">
            Track sentiment trends across platforms
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-8 justify-center mb-4 max-md:flex-col max-md:gap-3 max-md:ml-2">
        <PlatformSelectButton
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          platforms={platforms}
        />
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-700 dark:text-white">Last updated:</span>
          <div className="text-gray-700 dark:text-white">
            {latestUpdateTime}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <CloudWord
            wordData={wordData}
            platform={selectedPlatformData}
          />
        </div>

        <div className="w-full flex flex-col gap-4">
          <Ranking
            wordData={wordData}
            platform={selectedPlatformData}
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