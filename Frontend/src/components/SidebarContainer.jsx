// This is the compoment that displays the sidebar of the dashboard page.
// When the user hovers over the sidebar, the sidebar expands to show the full list of links.
// When the user moves the mouse away from the sidebar, the sidebar collapses to show only the icons.
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MiniSidebar from "./MiniSidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarContainer() {
    const [activeEntry, setActiveEntry] = useState("Dashboard");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered ? (
                    <motion.div
                        key="sidebar"
                        initial={{ width: "5rem", opacity: 0, scale: 0.95 }}
                        animate={{ width: "14rem", opacity: 1, scale: 1 }}
                        exit={{ width: "4rem", opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <Sidebar activeEntry={activeEntry} setActiveEntry={setActiveEntry} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="miniSidebar"
                        initial={{ width: "14rem", opacity: 0, scale: 0.95 }}
                        animate={{ width: "5rem", opacity: 1, scale: 1 }}
                        exit={{ width: "14rem", opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <MiniSidebar activeEntry={activeEntry} setActiveEntry={setActiveEntry} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
