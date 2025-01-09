import React, { useState } from "react";
import Header from "./components/Header"
import CloudWord from "./components/CloudWords";
import TopCloudWords from "./components/TopCloudWords";
import Rating from "./components/Rating";

export default function SocialMediaPage() {
  const [topWords, setTopWords] = useState([]);
  const [showTopWords, setShowTopWords] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const positiveWords = [
    { word: "Hopefully", frequency: 100 },
    { word: "Hopefully", frequency: 90 },
    { word: "Hopefully", frequency: 70 },
    { word: "Hopefully", frequency: 65 },
    { word: "Hopefully", frequency: 40 },
  ];

  const neutralWords = [
    { word: "Just so so", frequency: 60 },
    { word: "Just so so", frequency: 30 },
    { word: "Just so so", frequency: 20 },
    { word: "Just so so", frequency: 15 },
    { word: "Just so so", frequency: 5 },
  ];

  const negativeWords = [
    { word: "Badlly", frequency: 20 },
    { word: "Badlly", frequency: 18 },
    { word: "Badlly", frequency: 12 },
    { word: "Badlly", frequency: 8 },
    { word: "Badlly", frequency: 1 },
  ];

  const handleShowTopWords = (category) => {
    switch (category) {
      case "Positive":
        setTopWords(positiveWords);
        break;
      case "Neutral":
        setTopWords(neutralWords);
        break;
      case "Negative":
        setTopWords(negativeWords);
        break;
      default:
        setTopWords([]);
    }

    setAnimationClass("");
    setTimeout(() => {
      setShowTopWords(true);
      setAnimationClass("animate-slide-in");
    }, 10);
  };

  const handleHideTopWords = () => {
    setShowTopWords(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <TopCloudWords
        showTopWords={showTopWords}
        onHideTopWords={handleHideTopWords}
        Top5Words={topWords}
        animationClass={animationClass}
      />

      {/* Adjusted Layout */}
      <div className="flex flex-row w-full items-stretch p-4 gap-4 bg-gray-50 border-2 border-white rounded-[30px] shadow-[2px_2px_4px_rgba(0,0,0,0.15)]">
        <CloudWord onShowTopWords={handleShowTopWords} />
        <Rating />
      </div>
    </div>
  );
}
