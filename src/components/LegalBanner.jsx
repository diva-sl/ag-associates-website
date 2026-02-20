import { motion } from "framer-motion";

const LegalBanner = ({ title }) => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554224154-26032ffc0d07')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#511D43]/90 to-[#901E3E]/90" />

      {/* Subtle Floating Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white relative inline-block">
          {title}
          {/* Animated Underline */}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 bg-white rounded-full"
          />
        </h1>
      </motion.div>
    </section>
  );
};

export default LegalBanner;
