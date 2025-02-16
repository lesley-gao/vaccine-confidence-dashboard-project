/**
 * This component is a container that holds the sidebar and mini sidebar components.
 * The sidebar component is displayed when the user hovers over the sidebar.
 * The mini sidebar component is displayed when the user moves the mouse away from the sidebar.
 */
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MiniSidebar from "./MiniSidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarContainer({ activeEntry, setActiveEntry }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="sticky top-0 h-screen"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered ? (
                    <motion.div
                        key="sidebar"
                        initial={{ width: "5rem", x: 0, opacity: 0 }}
                        animate={{ width: "14rem", x: 1, opacity: 1 }}
                        exit={{ width: "5rem", x: 0, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25, ease: "easeInOut" }}
                    >
                        <Sidebar activeEntry={activeEntry} setActiveEntry={setActiveEntry} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="miniSidebar"
                        initial={{ width: "14rem", x: 0, opacity: 0 }}
                        animate={{ width: "5rem", x: 1, opacity: 1 }}
                        exit={{ width: "14rem", x: 0, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25, ease: "easeInOut" }}
                    >
                        <MiniSidebar activeEntry={activeEntry} setActiveEntry={setActiveEntry} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}