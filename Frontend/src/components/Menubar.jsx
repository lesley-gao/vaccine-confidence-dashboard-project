// This is the compoment that displays the menubar of the dashboard page.
// The menubar contains the breadcrumb, vaccine search, and user information sections.

import * as React from "react"
import { Slash } from "lucide-react"
import { GoHome } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import VaccineSelection from "./VaccineSelection";
import SettingsDrawer from "./SettingsDrawer";
export default function Menubar({ activeItem }) {

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

                    {/* <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem> */}

                </BreadcrumbList>
            </Breadcrumb>
 
            <div className="flex gap-10 items-center ">
                {activeItem === "Dashboard"? <VaccineSelection /> : null }
            </div>

            {/* avatar and user information section on the right */}
            <div className="flex gap-4 items-center">
                <Avatar className="hover:scale-110" >
                    <AvatarImage src="src/assets/avatars/avatar3.jpg" alt="@shadcn" />
                    <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <p className="text-sm text-center">Oliver<br></br><span className="text-gray-600">Admin</span></p>
                <div >
                    <SettingsDrawer />
                </div>
            </div>
        </div>

    )
}