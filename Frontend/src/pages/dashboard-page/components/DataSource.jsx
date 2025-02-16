/**
 * This component displays information about data sources related to the selected data.
 * When hovered, it shows the website names and URLs in a tooltip-like popover.
 */
import { IoMdInformationCircleOutline } from "react-icons/io";
import React, { useState, useEffect, useMemo } from "react";
import { fetchData } from '@/utils/api.js'

export default function DataSource({ selectedVaccine, componentId }) {

  const [isHovered, setIsHovered] = useState(false);
  const [dataSources, setDataSources] = useState([]);

  // Fetch DataSources
  useEffect(() => {
    const fetchDataSources = async () => {
      if (!selectedVaccine?.vaccineId) return;

      try {
        const data = await fetchData(`/component/get/id?componentId=${componentId}`);
        const matchingSources = data.filter(item =>
          item.vacIdPk === selectedVaccine.vaccineId
        ).map(source => ({
          websiteName: source.cdsWebsiteName,
          URL: source.cdsWebsiteUrl,
        }));

        setDataSources(matchingSources);
      } catch (error) {
        console.error("Error fetching dataSources:", error.message);
        setDataSources([]);
      }
    };

    fetchDataSources();
  }, [selectedVaccine, componentId]);

  // Filter out duplicate data sources by using Set to store unique URLs and websiteNames
  // First check if URL and websiteName already exist
  // If not, add to Set and keep the item
  const uniqueDataSources = useMemo(() => {
    if (!dataSources.length) return [];

    const uniqueUrls = new Set();
    const uniqueNames = new Set();

    return dataSources.filter(source => {
      if (!source) return false;

      const urlExists = uniqueUrls.has(source.URL);
      const webNameExists = uniqueNames.has(source.websiteName);

      if (!urlExists && !webNameExists) {
        uniqueUrls.add(source.URL);
        uniqueNames.add(source.websiteName);
        return true;
      }

      return false;
    });
  }, [dataSources]);

  if (!uniqueDataSources.length) return null;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IoMdInformationCircleOutline className="size-6 text-slate-700 dark:text-cyan-100" />

      {isHovered && dataSources && (
        <div
          className="absolute top-full w-[250px] left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-sm py-2 px-3 rounded shadow-lg z-10"
          style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
        >
          <p>Data Sources: </p>
          {uniqueDataSources.map((source, index) => (
            <div key={index} className="mt-2">
              <p>{source.websiteName || "Unknown Source"}</p>
              <a
                href={source.URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`${source.URL
                  ? "text-blue-400 underline hover:text-blue-200"
                  : "text-gray-400"
                  }`}
              >
                {source.URL || "No URL available"}
              </a>
              {index < uniqueDataSources.length - 1 && <hr className="my-2 border-gray-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}