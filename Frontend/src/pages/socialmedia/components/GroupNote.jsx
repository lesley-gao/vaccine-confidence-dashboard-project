import React, { useState } from "react";

export default function GroupNote({ attitude }) {
  const [isHovered, setIsHovered] = useState(false);

  const groupInfo = {
    positive: {
      image: "/image/positive-group-icon.png",
      label: "Positive Attitude Group",
      hoverText:
        "The posts they posted showed high vaccine confidence, such as supporting vaccination, believing that vaccines are indeed useful, etc.",
    },
    neutral: {
      image: "/image/neutral-group-icon.png",
      label: "Neutral Attitude Group",
      hoverText:
        "The posts they posted showed unclear vaccine confidence, such as still not knowing whether the vaccine is good or bad, and still struggling with whether to get vaccinated.",
    },
    negative: {
      image: "/image/negative-group-icon.png",
      label: "Negative Attitude Group",
      hoverText:
        "The posts they posted showed low vaccine confidence, such as saying that they would not get vaccinated and doubting the effectiveness of the vaccines.",
    },
  };

  const selectedGroup = groupInfo[attitude];

  return (
    <div
      className="relative flex flex-row gap-2 items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={selectedGroup.image}
        alt={`${selectedGroup.label} Icon`}
        className="w-[40px]"
      />
      <p className="text-sm font-PoppinsRegular">{selectedGroup.label}</p>

      {isHovered && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-2 w-[350px] bg-black text-white text-sm py-2 px-3 rounded shadow-lg z-10 text-justify opacity-80 "
        >
          {selectedGroup.hoverText}
        </div>
      )}
    </div>
  );
}
