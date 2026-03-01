import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { CheckCircle, X } from "lucide-react";
import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { useState, useEffect } from "react";

/* ================= PLAN DATA ================= */

const incomeTaxPlans = [
  {
    name: "Essential Tax",
    price: 1499,
    originalPrice: 2499,
    ideal: "Salaried professionals with single house property.",
    features: [
      "ITR Filing (Salary)",
      "Form 16 Review",
      "Basic Tax Planning",
      "Email Support",
    ],
  },
  {
    name: "Business Plus",
    price: 4999,
    originalPrice: 9999,
    ideal: "Freelancers & Small Business Owners.",
    highlight: true,
    features: [
      "Business ITR Filing",
      "P&L Review",
      "Expense Optimization",
      "Priority Support",
    ],
  },
  {
    name: "Capital Gains Expert",
    price: 3999,
    originalPrice: 6999,
    ideal: "Stock, F&O, Crypto, Real Estate.",
    features: [
      "Capital Gains Computation",
      "Loss Adjustment",
      "Tax Strategy",
      "Consultation Call",
    ],
  },
];

const advisoryPlans = [
  {
    name: "Global Income",
    price: 8999,
    originalPrice: 19999,
    ideal: "NRIs & Residents with Foreign Assets.",
    features: [
      "NRI ITR Filing",
      "DTAA Advisory",
      "Foreign Asset Reporting",
      "Email Support",
    ],
  },
  {
    name: "Premium Wealth",
    price: 14999,
    originalPrice: 14999,
    ideal: "High-income individuals seeking advisory.",
    features: [
      "Advance Tax Planning",
      "Quarterly Review",
      "Investment Structuring",
      "Priority Consultation",
    ],
  },
  {
    name: "Corporate Signature",
    price: 25000,
    originalPrice: 49999,
    ideal: "Ultra-high-net-worth clients & complex entities.",
    features: [
      "Corporate Structuring",
      "Audit Assistance",
      "Dedicated CA",
      "Full Compliance Support",
    ],
  },
];

const gstPlans = [
  {
    name: "Business Launch (GST)",
    price: 1999,
    originalPrice: 3999,
    ideal: "Individuals & Sole Proprietorships.",
    features: [
      "GST Registration",
      "Application Filing",
      "Documentation Support",
      "Email Assistance",
    ],
  },
  {
    name: "Partnership / LLP Setup",
    price: 7999,
    originalPrice: 14999,
    ideal: "Partnership firms & LLPs.",
    features: [
      "LLP Incorporation",
      "Deed Review",
      "PAN & TAN",
      "Compliance Guidance",
    ],
  },
  {
    name: "Import-Export (GST + IEC)",
    price: 14999,
    originalPrice: 24999,
    ideal: "Global Trade Businesses.",
    features: [
      "GST Registration",
      "IEC Registration",
      "Export Compliance",
      "Consultation Support",
    ],
  },
  {
    name: "Corporate GST Setup",
    price: 19999,
    originalPrice: 39999,
    ideal: "Private Limited Companies.",
    features: [
      "GST Registration",
      "DSC Support",
      "Director KYC",
      "Compliance Setup",
    ],
  },
];

/* ================= COUNT UP ================= */

const CountUpPrice = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 700;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <>₹{count.toLocaleString()}</>;
};

/* ================= COMPONENT ================= */

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedPlan ? "hidden" : "auto";
  }, [selectedPlan]);

  const renderCard = (plan) => {
    const savings = plan.originalPrice - plan.price;
    const discountPercent =
      plan.originalPrice > plan.price
        ? Math.round((savings / plan.originalPrice) * 100)
        : 0;

    return (
      <motion.div
        whileHover={{ y: -10 }}
        className={`relative rounded-3xl p-8 border backdrop-blur-xl flex flex-col h-full transition-all duration-300 ${
          plan.highlight
            ? "bg-gradient-to-br from-[#511D43]/80 to-[#901E3E]/80 border-white/30 shadow-2xl"
            : "bg-white/5 border-white/10"
        }`}
      >
        {plan.highlight && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#511D43] text-xs font-bold px-4 py-1 rounded-full shadow-lg">
            MOST POPULAR
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-4 py-1 rounded-bl-2xl rounded-tr-3xl font-semibold shadow-md">
            Save {discountPercent}%
          </div>
        )}

        <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>

        <div className="mb-4">
          <span className="text-3xl font-bold text-white">
            <CountUpPrice value={plan.price} />
            {plan.name === "Corporate Signature" && "+"}
          </span>

          {plan.originalPrice && (
            <span className="text-sm line-through text-white/60 ml-3">
              ₹{plan.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-white/70 mb-6 text-sm">{plan.ideal}</p>

        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start text-white/90 text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-1" />
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setSelectedPlan(plan)}
          className="mt-auto w-full py-3 rounded-xl bg-white text-[#511D43] font-semibold hover:bg-white/90 transition-all"
        >
          Choose Plan
        </button>
      </motion.div>
    );
  };

  const renderSection = (title, plans, cols) => (
    <>
      <h2 className="text-3xl font-bold text-white text-center mt-24 mb-12">
        {title}
      </h2>
      <div className={`grid ${cols} gap-10`}>
        {plans.map((plan, i) => (
          <div key={i}>{renderCard(plan)}</div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Subscription Plans | AG & Associates</title>
      </Helmet>

      <LegalBanner title="Subscription & Pricing Plans" />

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumb current="Pricing Plans" />

          {renderSection(
            "Income Tax Plans",
            incomeTaxPlans,
            "md:grid-cols-2 lg:grid-cols-3",
          )}

          {renderSection(
            "Advisory Plans",
            advisoryPlans,
            "md:grid-cols-2 lg:grid-cols-3",
          )}

          {renderSection(
            "GST & Business Registration Plans",
            gstPlans,
            "md:grid-cols-2 lg:grid-cols-4",
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gradient-to-br from-[#511D43] to-[#901E3E] p-10 rounded-3xl w-full max-w-md border border-white/20 shadow-2xl text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{selectedPlan.name}</h3>
                <X
                  onClick={() => setSelectedPlan(null)}
                  className="cursor-pointer"
                />
              </div>

              <p className="mb-6">
                Plan Price: ₹{selectedPlan.price.toLocaleString()}
              </p>

              <button className="w-full py-3 rounded-xl bg-white text-[#511D43] font-semibold hover:bg-white/90 transition-all">
                Proceed to Payment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
