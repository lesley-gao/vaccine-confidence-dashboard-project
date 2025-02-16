/**
 * This is a mini sidebar displayed on the left side of the screen and contains links to various sections 
 * like Dashboard, Social Media, Survey, Map, and Profile. 
 * When a user is logged in, an additional "Sign Out" option is shown.
 */
import React from "react";
import { Link } from "react-router-dom";
import { FaSyringe } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { RiSurveyLine } from "react-icons/ri";
import { MdPhonelinkRing } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useAppContext } from "@/context/AppContextProvider";

export default function MiniSidebar({ activeEntry, setActiveEntry }) {

    const { user } = useAppContext();

    const entries = [
        { title: "Dashboard", url: "/dashboard", icon: AiOutlinePieChart },
        { title: "Social Media", url: "/socialmedia", icon: MdPhonelinkRing },
        { title: "Survey", url: "/survey", icon: RiSurveyLine },
        { title: "Map", url: "/map", icon: GrMapLocation },
        { title: "Profile", url: "/profile", icon: CgProfile },
    ];

    if (user) {
        entries.push({ title: "Sign Out", url: "/", icon: RxExit });
    }

    return (
        <div className="h-screen w-30 p-4 my-3 rounded-xl ml-3 ">
            <div className="mb-8" >
                <a href="/" >
                    <div className="text-xl font-bold flex items-center space-x-2 " >
                        <span className="bg-gradient-to-b from-customTheme-light to-customTheme-dark text-white p-2 rounded-full  dark:from-[#2dd4bf] dark:via-cyan-300 dark:to-blue-300 dark:text-slate-800">
                            <FaSyringe />
                        </span> 
                    </div>
                </a>
            </div>

            <div className="space-y-6" >
                {entries.map((entry) => (
                    <div key={entry.title}>
                        <Link
                            to={entry.url}
                            onClick={() => setActiveEntry(entry.title)}
                            className={`flex items-center  justify-center py-2 rounded-full  ${entry.title === activeEntry
                                ? "bg-gradient-to-b from-customTheme-light to-customTheme-dark text-white dark:from-[#2dd4bf] dark:via-cyan-300 dark:to-blue-300  "
                                : "text-gray-600 hover:bg-gray-100"
                                }`} aria-label={entry.title}>
                            <entry.icon
                                className={`${entry.title === activeEntry ? "text-white dark:text-slate-800" : "text-gray-800 dark:text-white"} text-xl`} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}