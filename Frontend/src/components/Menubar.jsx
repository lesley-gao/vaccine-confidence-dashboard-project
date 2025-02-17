/**
 * This component is the top menu bar of the children pages. 
 * It includes the breadcrumb navigation, user avatar and username (if the user is logged in), and a settings drawer.
 * The menu bar updates with the current page, and fetches user data (including their avatar) if the user is logged in.
 */
import React, { useState, useEffect } from "react";
import { Slash } from "lucide-react"
import { GoHome } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import SettingsDrawer from "./SettingsDrawer";
import { useAppContext } from "@/context/AppContextProvider.jsx";
import { Link } from "react-router-dom";
import { fetchData } from "@/utils/api";

export default function Menubar({ activeItem }) {
    const { user } = useAppContext();
    const [userAvatar, setUserAvatar] = useState(user?.avatarPath || "/avatars/default-avatar.jpg");

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.token) {
                try {
                    const userData = await fetchData("/account/profile/get", {
                        headers: {
                            token: user.token,
                        },
                    });
                    if (userData?.userAvatarPath) {
                        setUserAvatar(userData.userAvatarPath);
                    }
                } catch (error) {
                    console.error("Error fetching user data in Menubar:", error);
                }
            }
        };

        fetchUserData();
    }, [user?.token, user?.avatarPath]);

    return (
        <div className="p-4 bg-gray-50 border-2 border-[#cad7f3] rounded-xl flex items-center justify-between bg-white/60 dark:bg-slate-600 dark:border dark:border-slate-900">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-lg dark:text-white"><GoHome /></BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>

                    <BreadcrumbLink href={`/${activeItem.toLowerCase()}`} className=" dark:text-white">
                        {activeItem}
                    </BreadcrumbLink>
                </BreadcrumbList>
            </Breadcrumb>

            {/* avatar and user information section on the right */}
            <div className="flex gap-4 items-center">
                {user && user.username ? (
                    <>
                        <Link to="/profile" className="hover:scale-110">
                            <Avatar>
                                <AvatarImage src={userAvatar} alt="user avatar" />
                                <AvatarFallback>
                                    <img src="/avatars/default-avatar.jpg" alt="default avatar" />
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <p>
                            Welcome, <span className="text-[#3949ab] font-bold dark:text-cyan-300">{user.username}</span>
                        </p>
                    </>
                ) : (
                    <>
                        <img src="/image/sayhi.png" alt="user avatar" className="w-14 h-12 " />
                        <Link to="/login" className="hover:underline hover:text-[#3949AB] hover:cursor-pointer dark:hover:text-cyan-300"><p><span>Log in</span> now to subscribe!</p></Link>
                    </>
                )}

                <SettingsDrawer />
            </div>
        </div>
    );
}