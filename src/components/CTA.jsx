import { motion } from "framer-motion";
import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";
import { scrollTo } from "@/lib/scroll";

const CTA = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
        rounded-3xl
        bg-gradient-to-br from-purple-600/40 to-blue-600/40
        backdrop-blur-xl
        border border-white/20
        p-16
        text-center
        "
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Simplify Your Taxes?
          </h2>

          <p className="text-white/80 mb-10 max-w-2xl mx-auto">
            Get expert guidance today and ensure your financial future stays
            secure and optimized.
          </p>

          <Button
            onClick={() => scrollTo("contact")}
            size="lg"
            className="px-10 py-6 text-lg rounded-full bg-white text-purple-700 hover:bg-purple-50"
          >
            Book Free Consultation
            <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
