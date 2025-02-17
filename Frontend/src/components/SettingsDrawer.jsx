/**
 * This component provides a settings drawer to toggle between light and dark modes.
 * It uses localStorage to persist the selected theme mode across sessions.
 * It is displayed on the top right corner of the page.
 */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { AiFillSetting } from "react-icons/ai";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function SettingsDrawer() {
    const [mode, setMode] = useState("light");
    const [open, setOpen] = useState(false);

    // check localStorage and set mode on init
    useEffect(() => {
        const savedMode = localStorage.getItem("theme") || "light";
        setMode(savedMode);
        document.documentElement.classList.toggle("dark", savedMode === "dark");
    }, []);

    // toggle mode and save to localStorage
    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setMode(newMode);
            localStorage.setItem("theme", newMode);

            if (newMode === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (!newOpen) {
            document.querySelector(".settings-icon").focus();
        }
    };

    const DrawerList = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            className="w-[350px] p-5 my-10 flex flex-col justify-center gap-5"
        >
            <h1 className="text-xl font-bold">Settings</h1>
            <Divider />
            <p>Mode</p>
            <div>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={handleModeChange}
                    aria-label="theme mode"
                >
                    <ToggleButton value="light" aria-label="light mode"> <LightMode /> Light </ToggleButton>
                    <ToggleButton value="dark" aria-label="dark mode"> <DarkMode />  Dark  </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Divider />
        </Box>
    );

    return (
        <div>
            <AiFillSetting
                className="text-gray-500 dark:text-white text-2xl settings-icon cursor-pointer"
                onClick={toggleDrawer(true)}
                tabIndex={0}
                aria-label="Open settings"
            />

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}
                ModalProps={{ keepMounted: true }}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
