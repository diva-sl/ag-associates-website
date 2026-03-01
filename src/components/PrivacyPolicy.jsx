import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AG & Associates</title>
        <meta
          name="description"
          content="Privacy Policy of AG & Associates covering data protection, confidentiality, and compliance practices."
        />
        <link
          rel="canonical"
          href="https://agandassociates.org/privacy-policy"
        />
      </Helmet>

      {/* Premium Banner */}
      <LegalBanner title="Privacy Policy" />

      {/* Page Fade Animation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-24 relative"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumb current="Privacy Policy" />

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-12 shadow-2xl mt-8 backdrop-blur-xl border border-white/10 py-24 relative legal-bg-pattern"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Privacy Policy Overview
            </h2>

            <p className="text-white/90 mb-6 leading-relaxed">
              AG & Associates is committed to safeguarding the privacy and
              confidentiality of our clients and website visitors. This policy
              outlines how personal information is collected, used, and
              protected.
            </p>

            {/* Section */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-white/90 mb-4">
              We may collect personal and professional information including:
            </p>
            <ul className="text-white/80 space-y-2 mb-6">
              <li>• Full Name</li>
              <li>• Contact Details (Email & Phone)</li>
              <li>• Business Information</li>
              <li>• Tax or Financial Data shared voluntarily</li>
              <li>• Website usage and analytics data</li>
            </ul>

            {/* Section */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              2. Purpose of Data Usage
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              The collected information is used strictly for professional
              purposes including service delivery, communication, compliance
              obligations, record maintenance, and improving user experience. We
              do not sell or distribute your personal data to third parties.
            </p>

            {/* Section */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              3. Confidentiality & Data Security
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              As a professional tax consultancy firm, we adhere to strict
              confidentiality standards. We implement technical and
              organizational safeguards to protect sensitive client information
              against unauthorized access or misuse.
            </p>

            {/* Section */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              4. Cookies & Tracking
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              Our website may use cookies for analytical and performance
              purposes. Users may disable cookies in browser settings if
              desired.
            </p>

            {/* Section */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              5. Legal Compliance
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              We may disclose information if required by law, regulatory
              authority, or judicial process under applicable Indian laws.
            </p>

            {/* Section */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              6. Policy Updates
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              This Privacy Policy may be updated periodically. Changes will be
              reflected on this page with the updated effective date.
            </p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              7. Data Retention
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              We retain personal and professional information only for as long
              as necessary to fulfill the purposes outlined in this policy or as
              required under applicable taxation, financial, and regulatory
              laws. Once data is no longer required, it is securely deleted or
              archived.
            </p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              8. Professional Confidentiality
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              As a professional consultancy firm, AG & Associates maintains
              strict confidentiality standards in handling client financial
              records, documentation, and advisory information. All client
              communications and records are treated with the highest level of
              discretion.
            </p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              9. Your Rights
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              You have the right to request access, correction, or deletion of
              your personal data, subject to legal and regulatory obligations.
              Requests may be submitted through our official contact channels.
            </p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              10. Third-Party Services
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              We may use trusted third-party tools for website analytics,
              hosting, and communication services. These providers operate under
              strict data protection standards and are authorized only to
              perform specific services on our behalf.
            </p>
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              11. Informational Disclaimer
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              Information provided on this website is for general informational
              purposes only and does not constitute professional tax, legal, or
              financial advice. Formal advisory services are provided only
              through signed engagement agreements.
            </p>

            {/* Contact */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              Contact Information
            </h2>
            <p className="text-white/90">
              AG & Associates <br />
              Tirupur, Tamil Nadu – 641608 <br />
              Email: info@agandassociates.org <br />
              Phone: +91 73734 76048
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default PrivacyPolicy;
