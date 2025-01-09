import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { AiFillSetting } from "react-icons/ai";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LightMode, DarkMode, Settings } from '@mui/icons-material';

export default function SettingsDrawer({ toggleColorMode }) {

    const [mode, setMode] = useState('light');

    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (!newOpen) {
            // Move focus back to the settings icon
            document.querySelector('.settings-icon').focus();
        }
    };

    const DrawerList = (
        <Box role="presentation" onClick={toggleDrawer(false)} className=" w-[350px] p-5 my-10 flex flex-col justify-center gap-5">
            <h1 className=" text-xl font-bold font-PoppinsBold">Settings</h1>
            <Divider />
            <p>Mode</p>
            <div>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={handleModeChange}
                    aria-label="theme mode"
                >
                    <ToggleButton value="light" aria-label="light mode">
                        <LightMode />
                        Light
                    </ToggleButton>
                    <ToggleButton value="dark" aria-label="dark mode">
                        <DarkMode />
                        Dark
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Divider />

        </Box>
    );

    return (
        <div>
            <div>
                <AiFillSetting className="text-gray-500 text-2xl settings-icon" onClick={toggleDrawer(true)} tabIndex={0} aria-label="Open settings" />
            </div>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true,
                }}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
