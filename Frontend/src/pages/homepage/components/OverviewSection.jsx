import { useEffect, useRef } from "react";
import { FunctionGuide } from "./FunctionGuide";
import OurMission from "./OurMission";

export default function OverviewSection() {
    const sections = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !entry.target.classList.contains("animate-fadeInUp")) {
                        entry.target.classList.add("animate-fadeInUp");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        sections.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);
    
    return (
        <div className="space-y-20">

            <div
                ref={(el) => sections.current[0] = el}
                className="opacity-0 translate-y-10 transition-all duration-700">
                <OurMission />
            </div>

            <div
                ref={(el) => sections.current[1] = el}
                className="opacity-0 translate-y-10 transition-all duration-700">
                <FunctionGuide />
            </div>
        </div>
    );
}
