import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { CheckCircle } from "lucide-react";
import Lottie from "lottie-react";
import taxConsultantAnimation from "@/assets/lottie/tax-consultant.json";

const floatingCards = [
  {
    id: 1,
    title: "Income Tax Filing",
    type: "progress",
    value: 80,
    subtitle: "Return Processing",
    points: ["ITR Filing", "Tax Planning", "Refund Tracking"],
  },
  {
    id: 2,
    title: "GST Compliance",
    type: "loading",
    subtitle: "Uploading Documents",
    points: ["GST Registration", "GST Returns", "GST Audit"],
  },
  {
    id: 3,
    title: "Compliance Score",
    type: "percentage",
    value: 98,
    subtitle: "Verified & Secure",
    points: ["Legal Compliance", "Risk Reduction", "Expert Review"],
  },
  {
    id: 4,
    title: "Tax Refund",
    type: "refund",
    value: "₹45,850",
    subtitle: "Approved Successfully",
    points: ["Refund Support", "Documentation", "Fast Processing"],
  },
];

const HeroRightDashboard = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) =>
        prev === floatingCards.length - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const current = floatingCards[activeCard];

  return (
    <div className="relative flex flex-col items-center w-full max-w-[450px] mx-auto">
      {/* Glow */}
      <div
        className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[350px]
    h-[350px]
    bg-purple-500/20
    blur-[120px]
    rounded-full
    -z-10
  "
      />
      {/* Image */}
      {/* <div className="relative z-10 w-[280px] sm:w-[340px] md:w-[420px]">
        <img
          src="/images/tax-consultant.png"
          alt="Tax Consultant"
          className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
        />
      </div> */}
      <div
        className="
  relative
  w-full
  max-w-[600px]
  mx-auto
  flex
  justify-center
  items-center
  mb-2
"
      >
        <Lottie
          animationData={taxConsultantAnimation}
          loop
          className="
    w-full
    max-w-[550px]
    h-[380px]
    md:h-[450px]
  "
        />
      </div>
      {/* Overlapping Card */}
      <div
        className="
  w-full
  max-w-[380px]
  min-h-[260px]
  h-[260px]
  md:h-[280px]
  bg-white/95
backdrop-blur-md
rounded-3xl
border
border-slate-100
p-5
shadow-[0_10px_40px_rgba(0,0,0,0.08)]
  "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="
  h-full
  flex
  flex-col
"
            key={current.id}
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {current.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {current.subtitle}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                Live
              </span>
            </div>

            {/* Progress */}
            {current.type === "progress" && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-700 mb-2">
                  <span>Processing</span>
                  <span>80%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 3 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Loading */}
            {current.type === "loading" && (
              <div className="flex gap-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.2,
                    }}
                    className="w-3 h-3 rounded-full bg-blue-500"
                  />
                ))}
              </div>
            )}

            {/* Percentage */}
            {current.type === "percentage" && (
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="text-center mb-2"
              >
                <div className="text-6xl font-bold text-green-600">
                  <CountUp end={98} duration={2} />%
                </div>
              </motion.div>
            )}

            {/* Refund */}
            {current.type === "refund" && (
              <div className="mb-2">
                <div className="text-4xl font-bold text-green-600">
                  {current.value}
                </div>

                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  Approved Successfully
                </div>
              </div>
            )}

            {/* Points */}
            <div className="space-y-2 mt-auto pt-4">
              {" "}
              {current.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroRightDashboard;
