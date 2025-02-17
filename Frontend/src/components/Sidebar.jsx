/**
* This is a normal sidebar displayed on the left side of the screen and contains links to various sections like Dashboard, Social Media, Survey, Map, and Profile.
* When a user is logged in, an additional "Sign Out" option is shown.
 */
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

  const navItems = [
    { title: "Dashboard", icon: AiOutlinePieChart, path: "/dashboard" },
    { title: "Social Media", icon: MdPhonelinkRing, path: "/socialmedia" },
    { title: "Survey", icon: RiSurveyLine, path: "/survey" },
    { title: "Map", icon: GrMapLocation, path: "/map" },
    { title: "Profile", icon: CgProfile, path: "/profile" }
  ];

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

    localStorage.removeItem('userData');
    localStorage.removeItem('rememberedUsername');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isGoogleUser');

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    setUser(null);
    navigate('/');
  };

  const getClasses = (title) => ({
    link: `flex items-center px-5 py-2 space-x-3 rounded-3xl ${title === activeEntry
      ? "bg-gradient-to-b from-customTheme-light to-customTheme-dark text-white dark:from-[#2dd4bf] dark:via-cyan-300 dark:to-blue-300 dark:text-slate-800"
      : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
      }`,
    icon: `text-lg ${title === activeEntry ? "text-white dark:text-slate-800" : "text-gray-800 dark:text-white"}`,
    text: `font-medium ${title === activeEntry ? "text-white dark:text-slate-800" : "text-gray-800  dark:text-white"}`
  });

  return (
    <div className="h-screen w-52 p-4 ml-3 my-4 rounded-xl">
      <Link to="/" className="mb-8 block">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span className="bg-gradient-to-b from-customTheme-light to-customTheme-dark p-2 rounded-full text-white dark:from-[#2dd4bf] dark:via-cyan-300 dark:to-blue-300 dark:text-slate-800">
            <FaSyringe />
          </span>
          <span className="text-black dark:text-white">VaccineView</span>
        </h1>
      </Link>

      <div className="space-y-6">
        {navItems.map(({ title, icon: Icon, path }) => {
          const classes = getClasses(title);
          return (
            <Link
              key={title}
              to={path}
              onClick={() => setActiveEntry(title)}
              className={classes.link}
            >
              <Icon className={classes.icon} />
              <span className={classes.text}>{title}</span>
            </Link>
          );
        })}

        {user && (
          <button onClick={handleLogout} className={getClasses("Sign Out").link}>
            <RxExit className={getClasses("Sign Out").icon} />
            <span className={getClasses("Sign Out").text}>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}