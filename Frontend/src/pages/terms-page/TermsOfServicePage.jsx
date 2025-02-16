/**
 * This component displays the Terms of Service for the VaccineView platform,
 * including information about eligibility, use of services, intellectual property, privacy, and more.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const lastUpdated = "2025-01-29";
  const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-2 text-justify">
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg max-w-[1000px] w-full dark:bg-slate-800 dark:border dark:border-slate-200 dark:shadow-slate-500">
        <h1 className="text-3xl font-bold text-center text-[#152063] mb-4 dark:text-white">Terms of Service</h1>
        <p className="text-sm text-gray-600 text-center dark:text-slate-300">Last Updated: {lastUpdated}</p>

        <div className="text-lg text-gray-700 text-center mt-6 leading-relaxed dark:text-slate-300">
          <p>Welcome to <span className="font-semibold dark:text-white">VaccineView</span>!</p>
          <p>By accessing or using our website,
            you agree to be bound by the following terms and conditions.</p>
          <p>If you do not agree with these terms, you should not use our services.</p>
        </div>

        <div className="mt-8 flex flex-col space-y-6 text-gray-700 leading-relaxed dark:text-slate-300">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
            <p>
              Our website is an information-providing website and is not recommended for use by users who may not yet
              have the ability to make clear judgments about information, such as children under the age of 13 or individuals
              with a mental disorder.
            </p>
            <p>We reserve the right to deny access to our services to anyone at any time for any reason.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Use of Services</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these terms. You may not:</p>
            <ul className="list-disc list-inside">
              <li>Violate any applicable laws or regulations.</li>
              <li>Transmit any harmful, offensive, or illegal content.</li>
              <li>Attempt to interfere with the proper functioning of the platform (e.g., hacking, spreading malware).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
            <p>
              All content on <span className="font-semibold">VaccineView</span>, including text, graphics, logos, and machine learning models,
              is owned by VaccineView or its licensors and is protected by copyright, trademark, and other laws.
            </p>
            <p>You may not use our intellectual property without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Privacy</h2>
            <p>
              Your privacy is important to us. Please refer to our <span className="underline text-blue-600 cursor-pointer"
                onClick={() => navigate("/privacy-policy")}>Privacy Policy</span> for information about how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites for your convenience. We are not
              responsible for the content, policies, or practices of these third-party websites.
              Use of third-party links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Modifications to Services</h2>
            <p>
              We may modify, suspend, or terminate our services or any part of them at any time without notice.
              We will not be liable for any losses caused by such modifications or interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
            <p>
              VaccineView is not responsible for any direct, indirect, incidental, or consequential damages
              arising from your use of the platform. Use of our services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold VaccineView and its affiliates harmless from any claims, damages, or
              expenses (including attorney fees) arising from your use of the platform or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services if you violate these terms.
              You may stop using our services at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms of Service are governed by the laws of Auckland, New Zealand. Any disputes arising under
              these terms will be resolved through negotiation, mediation, or the courts of Auckland, New Zealand.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Changes will be effective upon posting on this page.
              Your continued use of our services after changes are posted constitutes your acceptance of the updated terms.
            </p>
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

export default TermsOfService;
