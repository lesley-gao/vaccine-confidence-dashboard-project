/**
 * This component is a button that scrolls the page to the top when clicked.
 * It is displayed when the user scrolls down the page.
 * It is used on the homepage and dashboard page to provide a quick way for users to return to the top of the page.
 */
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return showButton ? (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-customTheme-light hover:bg-customTheme-dark text-white p-3 rounded-full shadow-lg transition-all duration-300"
            aria-label="Scroll to Top"
        >
            <ArrowUp size={24} />
        </button>
    ) : null;
}