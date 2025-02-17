/**
 * This component displays a placeholder message and image when no data is available for display on the Dashboard page.
 * It is used on the Dashboard page.
 */
import React from "react";

const PlaceHolder = () => {
  return (
    <div className="flex flex-col w-96 h-80 items-center justify-center text-center">
      <img src="/image/data-not-found.png" alt="No Data" className="w-40 h-40 object-contain mb-4 opacity-70" />

      <p className="text-gray-500 text-lg dark:text-white">Sorry, no data available yet.</p>
    </div>
  );
};

export default PlaceHolder;
