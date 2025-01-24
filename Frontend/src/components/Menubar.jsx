// This is the compoment that displays the menubar of the dashboard page.
// The menubar contains the breadcrumb, vaccine search, and user information sections.
import React, { useState, useEffect } from "react";
import { Slash } from "lucide-react"
import { GoHome } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import VaccineSelection from "./VaccineSelection";
import SettingsDrawer from "./SettingsDrawer";
import { useAppContext } from "@/context/AppContextProvider.jsx";
import { Link } from "react-router-dom";
import { useVaccine } from "@/hooks/useVaccine";

export default function Menubar({ activeItem, onVaccineSelect }) {

    const { user } = useAppContext();
    const { vaccineTypes, isLoading } = useVaccine();
    const [selectedVaccine, setSelectedVaccine] = useState(null);

    // Set initial selected vaccine ( the first one in the vaccineTypes list) when vaccine types are loaded
    useEffect(() => {
        if (vaccineTypes.length > 0 && !selectedVaccine) {
            setSelectedVaccine(vaccineTypes[0]);
            onVaccineSelect(vaccineTypes[0]);
        }
    }, [vaccineTypes]);

    const handleVaccineChange = (vaccine) => {
        setSelectedVaccine(vaccine);
        onVaccineSelect(vaccine);
    };

    return (
        <div className="p-4 bg-gray-50 border-2 border-white rounded-xl flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList  >
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-lg"><GoHome /></BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>

                    <BreadcrumbLink href={`/${activeItem.toLowerCase()}`}>
                        {activeItem}
                    </BreadcrumbLink>

                </BreadcrumbList>
            </Breadcrumb>


            <div className="flex gap-10 items-center ">
                {activeItem === "Dashboard" ? (
                    <VaccineSelection
                        selectedVaccine={selectedVaccine}
                        setSelectedVaccine={handleVaccineChange}
                    />
                ) : null}
            </div>

            {/* avatar and user information section on the right */}
            <div className="flex gap-4 items-center">
                {user && user.username ? (
                    <>
                        <Link to="/profile" className="hover:scale-110">
                            <Avatar>
                                {console.log(user.avatarPath)}
                                <AvatarImage src={user.avatarPath} alt="user avatar" />
                                <AvatarFallback>
                                    <img src="/avatars/default-avatar.jpg" alt="default avatar"/>
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <p>
                            Welcome, <span className="text-[#3949ab] font-bold">{user.username}</span>
                        </p>
                    </>
                ) : (
                    <>
                        <img src="/image/sayhi.png" alt="user avatar" className="w-14 h-12" />
                        <p>Welcome to VaccineView!</p></>
                )}
                <SettingsDrawer />
            </div>
        </div>
    )
}