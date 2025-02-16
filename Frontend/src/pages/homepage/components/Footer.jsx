/**
 * This component is the footer of the website.
 * It contains links to the About Us, Privacy Policy, and Terms of Service pages.
 */
import React, { useState, useRef } from "react";
import AboutUs from "./AboutUs";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const aboutUsRef = useRef(null);

  const handleExpand = () => {
    setExpanded((prev) => !prev);

    setTimeout(() => {
      if (!expanded && aboutUsRef.current) {
        aboutUsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 200);
  };

  return (
    <footer className="bg-[#152063] text-white text-center py-6 dark:bg-[#293951]">
      <div className="flex flex-col items-center container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2">VaccineView</h1>
        <img src="/image/logo.png" alt="logo" className="w-[50px] h-[50px] mb-2" />
        <p className="text-sm mb-4">
          &copy; 2025 Auckland ICT Graduate School. All rights reserved.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleExpand}
            className="text-sm underline hover:text-blue-400"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("/privacy-policy")}
            className="text-sm underline hover:text-blue-400"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => navigate("/terms-of-service")}
            className="text-sm underline hover:text-blue-400"
          >
            Terms of Service
          </button>
        </div>

        <div
          ref={aboutUsRef}
          className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {expanded && <AboutUs />}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
