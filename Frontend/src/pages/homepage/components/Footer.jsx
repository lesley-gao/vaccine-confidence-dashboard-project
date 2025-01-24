import React, { useState, useRef, useEffect } from "react";
import AboutUs from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const sectionRef = useRef(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    if (expandedSection && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expandedSection]);

  return (
    <footer className="bg-[#152063] text-white text-center py-6">
      <div className="flex flex-col items-center container mx-auto px-4 ">
        <h1 className="text-2xl font-bold mb-2">VaccineView</h1>
        <img src="/image/logo.png" alt="logo"
        className="w-[50px] h-[50px]  mb-2"/>
        <p className="text-sm mb-4">
          &copy; 2025 Auckland ICT Graduate School. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => toggleSection("about us")}
            className="text-sm underline hover:text-blue-400"
          >
            About Us
          </button>
          <button
            onClick={() => toggleSection("privacy")}
            className="text-sm underline hover:text-blue-400"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => toggleSection("terms")}
            className="text-sm underline hover:text-blue-400"
          >
            Terms of Service
          </button>
        </div>

        <div
          ref={sectionRef}
          className={`transition-transform duration-700 ease-in-out transform origin-top ${
            expandedSection ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
        >
          <div className="mt-6">
            {expandedSection === "about us" && <AboutUs />}
            {expandedSection === "privacy" && <PrivacyPolicy />}
            {expandedSection === "terms" && <TermsOfService />}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
