/**
 * This component renders the homepage of the website.
 * It includes sections such as the Hero Section, Overview, FAQs, Articles, and Footer.
 */
import React from "react";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import OverviewSection from "./components/OverviewSection";
import { BorderBeam } from "@/components/ui/border-beam";
import Ripple from "@/components/ui/ripple";
import FAQs from "./components/FAQS";
import OuterArticles from "./components/OuterArticles";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function HomePage() {
    
    return (
        <>
            <div className="bg-gradient-to-br from-slate-100 via-slate-300 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <HeroSection />
                <Ripple className="inset-0 z-0 pointer-events-none" />

                <div className="relative h-auto overflow-hidden flex flex-wrap justify-center px-4 md:px-8 lg:px-14 ">
                    <div
                        className="my-10 md:my-16 lg:my-20 w-full p-6 md:p-12 lg:p-16 bg-white/50 rounded-lg shadow-lg backdrop-blur-lg border border-white/40 dark:bg-[#293951]"
                        style={{
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <BorderBeam />
                        <OverviewSection />
                        <FAQs />
                        <OuterArticles />
                    </div>
                </div>
            </div>
            <Footer />

            <ScrollToTopButton />
        </>
    );
}
