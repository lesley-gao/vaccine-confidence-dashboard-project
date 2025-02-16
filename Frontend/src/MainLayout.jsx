/**
 * This component is the main layout of the application that provides the overall structure.
 * It includes the sidebar navigation, menubar, and content area with different page views.
 */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarContainer from "./components/SidebarContainer";
import Menubar from "./components/Menubar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useVaccine } from "@/hooks/useVaccine";

export default function MainLayout() {
  const location = useLocation();
  const { vaccineTypes } = useVaccine();
  const [currentVaccine, setCurrentVaccine] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeEntry, setActiveEntry] = useState("Dashboard");

  useEffect(() => {
    const activeItemMap = {
      "/dashboard": "Dashboard",
      "/map": "Map",
      "/survey": "Survey",
      "/socialmedia": "Social Media",
      "/profile": "Profile",
    };
    setActiveEntry(activeItemMap[location.pathname] || "Dashboard");
  }, [location.pathname]);

  useEffect(() => {
    const vaccineId = location.state?.vaccineId;
    if (vaccineId && vaccineTypes.length > 0) {
      const vaccine = vaccineTypes.find((v) => v.vaccineId === vaccineId);
      if (vaccine) {
        setCurrentVaccine(vaccine);
      }
    }
  }, [location.state, vaccineTypes]);

  return (
    <div className="flex min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-slate-200 to-blue-100"></div>
      <div className="absolute inset-0 backdrop-blur-lg bg-white bg-opacity-50 dark:bg-slate-800 "></div>

      <div className="fixed left-0 top-0 h-screen z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SidebarContainer activeEntry={activeEntry} setActiveEntry={setActiveEntry} />
      </div>

      <motion.div
        className="flex-1 flex flex-col p-3 gap-3 relative z-20"
        animate={{ marginLeft: isHovered ? "14rem" : "5rem" }}
        transition={{ duration: 0.3, type: "spring", stiffness: 150, damping: 20 }}
      >
        <Menubar activeItem={activeEntry} />
        <div>
          <Outlet context={{ currentVaccine, setCurrentVaccine }} />
        </div>
      </motion.div>
    </div>
  );
}