/**
 * This is the top navigation bar of the website on the Homepage. 
 * It contains the logo, navigation links, and the login button. 
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from "@/context/AppContextProvider.jsx";

function TopBar({ activeEntry, setActiveEntry }) {
  const { user } = useAppContext();

  const navigationItems = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Social Media", path: "/socialmedia" },
    { title: "Survey", path: "/survey" },
    { title: "Map", displayTitle: "Vaccine Map", path: "/map" },
  ];

  const handleNavigation = (title) => {
    setActiveEntry(title);
  };


  return (
    <div className="relative z-50 m-auto w-[90%] mt-5">
      <div className="h-auto min-h-[65px] rounded-[50px] flex flex-col max-sm:items-center sm:flex-row items-center justify-between bg-white bg-opacity-30 shadow-md backdrop-blur-[10px] px-6 py-2 max-sm:py-4 max-sm:gap-4 sm:gap-14 dark:bg-slate-600 dark:border dark:border-slate-900">

        {/* Logo Section */}
        <div className="flex items-center gap-2 max-sm:w-full sm:w-[20%] justify-center">
          <img src="/image/logo.png" alt="logo" className="w-[42px] h-[40px]" />
          <div className="text-[#151d48] dark:text-white text-[20px] font-BaiJamjureeBold leading-[150%]">
            VaccineView
          </div>
        </div>


        {/* Navigation Links */}
        <div className="max-sm:w-full sm:w-[60%] flex justify-center">
          <div className="w-full max-sm:flex max-sm:flex-row max-sm:justify-center max-sm:overflow-x-auto max-sm:gap-4 sm:flex sm:justify-between sm:gap-8 items-center">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                onClick={() => handleNavigation(item.title)}
                className={`text-[#152063]  dark:text-slate-200 text-[20px] font-BaiJamjureeLight max-md:text-[16px] whitespace-nowrap hover:scale-105 transition-transform duration-500 ${activeEntry === item.title ? "font-bold" : ""
                  }`}
              >
                {item.displayTitle || item.title}
              </Link>
            ))}
          </div>
        </div>


        {/* Log In Button */}
        <div className="max-sm:w-full sm:w-[20%] flex justify-center sm:justify-end">
          <button className="w-[100px] h-[45px] rounded-[25px] bg-gradient-to-r from-[#152063] to-[#3949ab] shadow-md flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all duration-500 relative overflow-hidden">
            <div className="text-white text-[20px] max-md:text-[16px] font-BaiJamjureeLight relative z-10">
              {user ? (
                <Link to="/profile" onClick={() => handleNavigation("Profile")}>
                  Hi, {user.username.slice(0, 5)}
                </Link>
              ) : (
                <Link to="/login">Log In</Link>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;