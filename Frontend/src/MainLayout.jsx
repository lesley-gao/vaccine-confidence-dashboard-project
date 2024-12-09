import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Menubar from "./components/Menubar";

export default function MainLayout({ children }) {

    const [activeEntry, setactiveEntry] = useState("Dashboard");

    return (

        <div className="flex h-auto bg-stone-200">

            {/* Sidebar */}
            <Sidebar activeEntry={activeEntry} setActiveEntry={setactiveEntry} />

            {/* Main Content */}
            <div className="flex-1">

                <div className="flex flex-col p-3 gap-3">

                    {/* Menubar */}
                    <Menubar activeItem={activeEntry} />

                    {/* Render the specific page */}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
