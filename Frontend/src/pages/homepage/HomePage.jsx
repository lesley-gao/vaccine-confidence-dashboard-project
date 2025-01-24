// import Footer from "@/components/Footer";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import OverviewSection from "./components/OverviewSection";
import { BorderBeam } from "@/components/ui/border-beam";
import Ripple from "@/components/ui/ripple";
import FAQs from  "./components/FAQS";


export default function HomePage() {
    return (
        <>
        <div className="bg-gradient-to-br from-slate-100 via-slate-300 to-slate-100">
            
            <HeroSection />
            
            <Ripple className="inset-0 z-0 pointer-events-none"/>
            <div className="relative h-auto overflow-hidden flex">
            
            <div
            className="my-20 mx-14 p-16 bg-white/50 rounded-lg shadow-lg backdrop-blur-lg border border-white/40"
            style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
            >
            
            <BorderBeam />
            <OverviewSection />
            <FAQs />
            </div>

            </div>
        </div>
            <Footer />
        </>
    );
}

