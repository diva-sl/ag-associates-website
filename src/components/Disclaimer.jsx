import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer | AG & Associates</title>
        <meta
          name="description"
          content="Read the professional disclaimer of AG & Associates regarding advisory services, website usage, and liability limitations."
        />
      </Helmet>

      <LegalBanner title="Disclaimer" />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumb current="Disclaimer" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-10 md:p-14 mt-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Professional Disclaimer
            </h2>

            <p className="text-white/90 mb-6 leading-relaxed">
              The information provided on this website is for general
              informational purposes only and does not constitute professional
              tax, accounting, or legal advice.
            </p>

            <p className="text-white/90 mb-6 leading-relaxed">
              Engagement of professional services shall occur only through
              formal agreements. Users should not rely solely on website content
              without seeking qualified professional consultation.
            </p>

            <p className="text-white/90 leading-relaxed">
              AG & Associates shall not be held liable for any loss or damage
              arising from reliance on information presented on this website.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Disclaimer;
