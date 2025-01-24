import { IoMdInformationCircleOutline } from "react-icons/io";
import React, { useState } from "react";
 
export default function DataSource({ dataSource }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IoMdInformationCircleOutline className=" size-6 text-slate-700" />

      {isHovered && (
        <div
          className="absolute top-full w-[230px] left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-sm py-2 px-3 rounded shadow-lg z-10"
          style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
        >
          <p>Data Source: {dataSource.websiteName}</p>
          <a
            href={`${dataSource.URL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-200"
          >
            {dataSource.URL}
          </a>
        </div>
      )}
    </div>
  );
}
