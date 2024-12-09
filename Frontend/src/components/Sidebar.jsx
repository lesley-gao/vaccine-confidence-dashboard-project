// This is the compoment that displays the sidebar of the dashboard page.
// The sidebar contains links to different pages of the application.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePieChart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { RiSurveyLine } from "react-icons/ri";
import { MdPhonelinkRing } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { FaSyringe } from "react-icons/fa";

const entries = [
  { title: "Dashboard", url: "/dashboard", icon: AiOutlinePieChart },
  { title: "Map", url: "/map", icon: GrMapLocation },
  { title: "Survey", url: "/survey", icon: RiSurveyLine },
  { title: "Social Media", url: "/socialmedia", icon: MdPhonelinkRing },
  { title: "Settings", url: "/settings", icon: FiSettings },
  { title: "Sign Out", url: "/", icon: RxExit },
];

export default function Sidebar({ activeEntry, setActiveEntry }) {

  // const [activeEntry, setActiveEntry] = useState("Dashboard");

  return (
    <div className="w-52 p-4 bg-gray-50 my-3 border-2 border-white ml-3 rounded-xl">
      <div className="mb-6" >
        <a href="/" >
          <h1 className="text-xl font-bold flex items-center space-x-2 ">
            <span className="bg-gradient-to-r from-bgBlue to-indigo-900 p-2 rounded-full text-white">
              <FaSyringe />
            </span>
            <span className="text-black">VaccineView</span>
          </h1>
        </a>
      </div>

      <div className="space-y-3" >
        {entries.map((entry) => (
          <div key={entry.title}>
            <Link
              to={entry.url}
              onClick={() => setActiveEntry(entry.title)}
              className={`flex items-center px-4 py-2 space-x-3 rounded-3xl ${entry.title === activeEntry
                ? "bg-gradient-to-r from-bgBlue to-indigo-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
                }`}>
              <entry.icon
                className={`${entry.title === activeEntry ? "text-white" : "text-gray-500"} text-lg`} />
              <span
                className={`font-medium ${entry.title === activeEntry ? "text-white" : "text-gray-700"}`}>
                {entry.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
