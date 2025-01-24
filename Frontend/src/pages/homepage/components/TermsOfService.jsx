import React from "react";

const updateDate = () => {
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
};

const TermsOfService = () => {
  const lastUpdated = updateDate();
  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">

      
      <p className="text-sm text-gray-700 text-center mb-1 font-bold">
            Welcome to VaccineView! By accessing or using our website, you agree to be bound by the
            following terms and conditions. If you do not agree with these terms, you should not use
            our services.
          </p>

      <p className="text-base text-gray-500 text-center mb-6">Last Updated: {lastUpdated}</p>
      <div className="grid grid-cols-1 md:grid-cols-4 text-gray-700 text-xs text-justify gap-4">

        <section>
          <h2 className="text-base font-bold mb-2">1. Eligibility</h2>
          <p>Our website is an information-providing website and is not recommended for use by users who may not yet have the ability to make clear judgments about information, 
            such as children under the age of 13 or individual with a mental disorder.</p>
          <p>We reserve the right to deny access to our services to anyone at any time for any reason.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">2. Use of Services</h2>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these terms. You may not:
          </p>
          <li>Violate any applicable laws or regulations.</li>
          <li>Transmit any harmful, offensive, or illegal content.</li>
          <li>Attempt to interfere with the proper functioning of the platform (e.g., hacking, spreading malware).</li>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">3. Intellectual Property</h2>
          <p>
            All content on VaccineView, including text, graphics, logos, and machine learning model, is owned by
            VaccineView or its licensors and is protected by copyright, trademark, and other laws.
          </p>
          <p>You may not use our intellectual property without prior written permission.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">4. Privacy</h2>
          <p>
            Your privacy is important to us. Please refer to our Privacy Policy
            for information about how we collect, use, and protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">5. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites for your convenience. We are not
            responsible for the content, policies, or practices of these third-party websites. Use of
            third-party links is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">6. Modifications to Services</h2>
          <p>
            We may modify, suspend, or terminate our services or any part of them at any time without
            notice. We will not be liable for any losses caused by such modifications or interruptions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">7. Limitation of Liability</h2>
          <p>
            VaccineView is not responsible for any direct, indirect, incidental, or consequential
            damages arising from your use of the platform. Use of our services is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">8. Indemnification</h2>
          <p>
            You agree to indemnify and hold VaccineView and its affiliates harmless from any claims,
            damages, or expenses (including attorney fees) arising from your use of the platform or
            violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to our services if you violate
            these terms. You may stop using our services at any time.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">10. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms of Service are governed by the laws of Auckland, New Zealand. Any
            disputes arising under these terms will be resolved through negotiation, mediation, or the
            courts of Auckland, New Zealand.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">11. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Changes will be effective upon
            posting on this page. Your continued use of our services after changes are posted
            constitutes your acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
