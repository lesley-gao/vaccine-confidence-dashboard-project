import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSyringe } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { RiSurveyLine } from "react-icons/ri";
import { MdPhonelinkRing } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useAppContext } from "@/context/AppContextProvider";

export default function Sidebar({ activeEntry, setActiveEntry }) {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();

  const handleLogout = async () => {

    const isGoogleUser = localStorage.getItem('isGoogleUser') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    if (isGoogleUser && userEmail) {
      try {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (window.google?.accounts?.id) {
          window.google.accounts.id.disableAutoSelect();

          await new Promise((resolve) => {
            window.google.accounts.id.revoke(userEmail, (done) => {
              resolve();
            });
          });
        }
      } catch (error) {
        console.error('Google logout error:', error);
      }
    }

    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberedUsername');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isGoogleUser');

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    navigate('/');
  };

  const getLinkClass = (title) => {
    return `flex items-center px-5 py-2 space-x-3 rounded-3xl ${title === activeEntry
        ? "bg-gradient-to-b from-customTheme-light to-customTheme-dark text-white"
        : "text-gray-600 hover:bg-gray-100"
      }`;
  };

  const getIconClass = (title) => {
    return `${title === activeEntry ? "text-white" : "text-gray-500"} text-lg`;
  };

  const getTextClass = (title) => {
    return `font-medium ${title === activeEntry ? "text-white" : "text-gray-700"}`;
  };

  return (
    <div className="h-screen w-52 p-4 ml-3 my-4 rounded-xl">
      <div className="mb-8">
        <Link to="/">
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <span className="bg-gradient-to-b from-customTheme-light to-customTheme-dark p-2 rounded-full text-white">
              <FaSyringe />
            </span>
            <span className="text-black">VaccineView</span>
          </h1>
        </Link>
      </div>

      <div className="space-y-6">
        <Link to="/dashboard" onClick={() => setActiveEntry("Dashboard")} className={getLinkClass("Dashboard")}>
          <AiOutlinePieChart className={getIconClass("Dashboard")} />
          <span className={getTextClass("Dashboard")}>Dashboard</span>
        </Link>

        <Link to="/map" onClick={() => setActiveEntry("Map")} className={getLinkClass("Map")}>
          <GrMapLocation className={getIconClass("Map")} />
          <span className={getTextClass("Map")}>Map</span>
        </Link>

        <Link to="/survey" onClick={() => setActiveEntry("Survey")} className={getLinkClass("Survey")}>
          <RiSurveyLine className={getIconClass("Survey")} />
          <span className={getTextClass("Survey")}>Survey</span>
        </Link>

        <Link to="/socialmedia" onClick={() => setActiveEntry("Social Media")} className={getLinkClass("Social Media")}>
          <MdPhonelinkRing className={getIconClass("Social Media")} />
          <span className={getTextClass("Social Media")}>Social Media</span>
        </Link>

        <Link to="/profile" onClick={() => setActiveEntry("Profile")} className={getLinkClass("Profile")}>
          <CgProfile className={getIconClass("Profile")} />
          <span className={getTextClass("Profile")}>Profile</span>
        </Link>

        {user ?
          (<button onClick={handleLogout} className={getLinkClass("Sign Out")}>
            <RxExit className={getIconClass("Sign Out")} />
            <span className={getTextClass("Sign Out")}>Sign Out</span>
          </button>) : null}
      </div>
    </div>
  );
}