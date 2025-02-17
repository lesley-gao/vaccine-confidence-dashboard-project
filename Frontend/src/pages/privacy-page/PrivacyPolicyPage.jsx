 /**
 * This component displays the application's privacy policy, outlining data collection, usage, security, and user rights.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const lastUpdated = "2025-01-29";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4  ">
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg max-w-[1000px] w-full dark:bg-slate-800 dark:border dark:border-slate-200 dark:shadow-slate-500">
        <h1 className="text-3xl font-bold text-center text-[#152063] mb-4 dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-gray-600 text-center dark:text-slate-300">Last Updated: {lastUpdated}</p>

        <div className="mt-6 flex flex-col space-y-6 text-gray-700 leading-relaxed dark:text-slate-300">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Personal Information You Provide:</strong> User name, email address, and other voluntarily provided data.</li>
              <li><strong>Automatically Collected Information:</strong> IP address, browser type, pages visited.</li>
              <li><strong>Health-Related Information:</strong> Vaccine preferences or related data input.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Provide and improve our services.</li>
              <li>Personalize user experience and updates.</li>
              <li>Conduct research for public health education.</li>
              <li>Comply with legal requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. How We Share Your Information</h2>
            <p>We do not sell personal data but may share in cases like:</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>With Service Providers:</strong> Third-party vendors assisting in site operation.</li>
              <li><strong>For Legal Compliance:</strong> When legally required.</li>
              <li><strong>With Your Consent:</strong> When you explicitly allow sharing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
            <p>As a user, you have the right to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Access your data.</li>
              <li>Correct or update personal data.</li>
              <li>Request data deletion (subject to legal obligations).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p>We implement security measures but acknowledge that no platform is fully secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
            <p>Our site may contain links to third-party websites. We are not responsible for their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Children's Privacy</h2>
            <p>Our platform is not intended for children under 13.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Policy Updates</h2>
            <p>This policy may be updated periodically. Changes will be reflected in the "Last Updated" date.</p>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 w-48 submission-btn"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
