import React from "react";
import { useLocation } from "react-router-dom";
import SidebarContainer from "./components/SidebarContainer";
import Menubar from "./components/Menubar";
import { Outlet } from "react-router-dom"; 2

export default function MainLayout() {
    const location = useLocation();

    const activeItemMap = {
        "/dashboard": "Dashboard",
        "/map": "Map",
        "/survey": "Survey",
        "/socialmedia": "Social Media",
        "/profile": "Profile",
    };

    const activeItem = activeItemMap[location.pathname] || "Dashboard";

    return (
        <div className="grid grid-cols-[auto_1fr] min-h-screen bg-gray-100">
            {/* Sidebar with dynamic width */}
            <SidebarContainer />

            {/* Main content */}
            <div className="flex flex-col p-3 gap-3">
                <Menubar activeItem={activeItem} />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
