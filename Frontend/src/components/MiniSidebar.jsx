// This is a mini sidebar that can be used in the dashboard page
import React from "react";
import { Link } from "react-router-dom";
import { FaSyringe } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { RiSurveyLine } from "react-icons/ri";
import { MdPhonelinkRing } from "react-icons/md";
import { RxExit }  from "react-icons/rx";
import { CgProfile } from "react-icons/cg"; 

export default function MiniSidebar({ activeEntry, setActiveEntry }) {

    const entries = [
        { title: "Dashboard", url: "/dashboard", icon: AiOutlinePieChart },
        { title: "Map", url: "/map", icon: GrMapLocation },
        { title: "Survey", url: "/survey", icon: RiSurveyLine },
        { title: "Social Media", url: "/socialmedia", icon: MdPhonelinkRing },
        { title: "Profile", url: "/profile", icon: CgProfile },
        { title: "Sign Out", url: "/", icon: RxExit },
    ];

    return (
        <div className="h-screen w-30 p-4 bg-gray-50 my-3 border-2 border-white ml-3 rounded-xl ">
            <div className="mb-6" >
                <a href="/" >
                    <div className="text-xl font-bold flex items-center space-x-2 " >
                        <span className="bg-gradient-to-b from-customTheme-light to-customTheme-dark p-2 rounded-full text-white">
                            <FaSyringe />
                        </span>
                    </div>
                </a>
            </div>

            <div className="space-y-3" >
                {entries.map((entry) => (
                    <div key={entry.title} className="">
                        <Link
                            to={entry.url}
                            onClick={() => setActiveEntry(entry.title)}
                            className={`flex items-center  justify-center py-2 rounded-full  ${entry.title === activeEntry
                                ? "bg-gradient-to-b from-customTheme-light to-customTheme-dark text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`} aria-label={entry.title}>
                            <entry.icon
                                className={`${entry.title === activeEntry ? "text-white" : "text-gray-500"} text-xl`} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
