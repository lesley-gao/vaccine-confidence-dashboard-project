import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import CoverPage from "./Cover Page/CoverPage";
import DashboardPage from "./DashboardPage";
export default function HomePage() {
    return (
        <>
            <div >
                <CoverPage />
            </div>

            <div className="h-auto bg-stone-200 border-2 border-white mx-2 my-2 rounded-xl flex">
                <Sidebar />
                <div className="mx-3 mt-3 mb-3">
                    <DashboardPage />
                </div>
            </div>
            <Footer />
        </>
    )
}
