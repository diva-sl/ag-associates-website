import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | AG & Associates</title>
        <meta
          name="description"
          content="Terms and Conditions governing the use of AG & Associates website and professional tax consultancy services."
        />
        <link
          rel="canonical"
          href="https://agandassociates.org/terms-and-conditions"
        />
      </Helmet>

      {/* Premium Banner */}
      <LegalBanner title="Terms & Conditions" />

      {/* Page Fade Animation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-24 relative legal-bg-pattern"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Premium Breadcrumb */}
          <Breadcrumb current="Terms & Conditions" />

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-12 shadow-2xl mt-8 backdrop-blur-xl border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Terms of Website Use
            </h2>

            <p className="text-white/90 mb-8 leading-relaxed">
              By accessing or using this website, you agree to comply with these
              Terms & Conditions. These terms govern your interaction with AG &
              Associates and the use of information and services provided
              through this platform.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              1. Website Usage
            </h3>
            <p className="text-white/90 mb-6">
              The information on this website is for general informational
              purposes only and does not constitute professional tax,
              accounting, or legal advice.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              2. Professional Engagement
            </h3>
            <p className="text-white/90 mb-6">
              A formal client relationship is established only upon execution of
              a signed engagement agreement.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              3. Intellectual Property
            </h3>
            <p className="text-white/90 mb-6">
              All website content, branding, graphics, and design elements are
              the exclusive property of AG & Associates and may not be reused
              without permission.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              4. Limitation of Liability
            </h3>
            <p className="text-white/90 mb-6">
              AG & Associates shall not be liable for any direct or indirect
              damages resulting from reliance on website content or technical
              interruptions.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              5. Governing Law
            </h3>
            <p className="text-white/90 mb-6">
              These Terms shall be governed in accordance with the laws of
              India. Any disputes shall fall under the jurisdiction of courts
              located in Tamil Nadu.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              6. No Automatic Client Relationship
            </h3>
            <p className="text-white/90 mb-6">
              Submitting inquiries or forms does not automatically create a
              professional relationship.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              7. Accuracy of Information
            </h3>
            <p className="text-white/90 mb-6">
              While we strive for accuracy, we make no warranties regarding
              completeness or reliability of website content.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              8. Modification of Services
            </h3>
            <p className="text-white/90 mb-6">
              We reserve the right to update or modify website content and
              services at any time without prior notice.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              9. Indemnification
            </h3>
            <p className="text-white/90 mb-6">
              Users agree to indemnify AG & Associates against any claims
              arising from misuse of this website.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              10. Severability
            </h3>
            <p className="text-white/90">
              If any provision of these Terms is deemed invalid, the remaining
              provisions shall remain enforceable.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Terms;
