import React from "react";

  const updateDate = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

const PrivacyPolicy = () => {

  const lastUpdated = updateDate();
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">

      <p className="text-base text-gray-500 text-center mb-4">Last Updated: {lastUpdated}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700 text-xs text-justify">
        <section>
          <h2 className="text-base font-bold mb-2">1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <li>
            <strong>Personal Information You Provide:</strong> User name, email address, and any
            other data you provide voluntarily.
          </li>
          <li>
            <strong>Automatically Collected Information:</strong> Device information (IP address,
            browser type) and usage data (pages visited, time spent).
          </li>
          <li>
            <strong>Health-Related Information:</strong> Vaccine preferences or information you input
            while using our services.
          </li>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">2. How We Use Your Information</h2>
          <li>We use the collected information to:</li>
          <li>Provide and improve our services.</li>
          <li>Personalize your experience and communicate updates.</li>
          <li>Conduct research and analysis for public health education.</li>
          <li>Comply with legal requirements.</li>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">3. How We Share Your Information</h2>
          <p>We value your privacy and do not sell your personal data. However, we may share your information in the following circumstances:</p>
          <li>
            <strong>With Service Providers:</strong> Trusted third-party vendors who assist us in
            operating the site.
          </li>
          <li>
            <strong>For Legal Compliance:</strong> If required by law or legal process.
          </li>
          <li>
            <strong>With Your Consent:</strong> When you explicitly allow us to share your
            information.
          </li>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">4. Your Rights</h2>
          <p>As a user, you have the right to:</p>
          <li>Access the data we hold about you.</li>
          <li>Correct or update your personal data.</li>
          <li>Request the deletion of your data (subject to legal obligations).</li>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data from unauthorized
            access, loss, or misuse. However, no online platform is entirely secure.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">6. Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for their
            privacy practices and encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">7. Children's Privacy</h2>
          <p>
            VaccineView is not intended for children under the age of 13. We do not knowingly
            collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-2">8. Policy Updates</h2>
          <p>
            This policy may be updated from time to time. Changes will be reflected with a "Last
            Updated" date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
