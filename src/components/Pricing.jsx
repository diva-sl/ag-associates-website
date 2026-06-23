import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle, X } from "lucide-react";
import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { useState, useEffect } from "react";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "@/redux/services/transactionApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetPlansQuery } from "../redux/services/planApi";

import Lottie from "lottie-react";
import paymentSuccessAnimation from "@/assets/lottie/payment sucess.json";
import UploadingAnimation from "@/assets/lottie/Uploading.json";

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
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetPlansQuery();
  const [paidPlan, setPaidPlan] = useState(null);

  const incomeTaxPlans = data.filter((plan) => plan.category === "Income Tax");

  const advisoryPlans = data.filter((plan) => plan.category === "Advisory");

  const gstPlans = data.filter((plan) => plan.category === "GST");

  useEffect(() => {
    const savedPlan = localStorage.getItem("pendingPlan");

    if (savedPlan && token) {
      setSelectedPlan(JSON.parse(savedPlan));
      localStorage.removeItem("pendingPlan");
    }
  }, [token]);

  const handlePayment = async () => {
    try {
      if (!selectedPlan?._id) {
        alert("Invalid plan selected");
        return;
      }

      const res = await createOrder({
        planId: selectedPlan._id,
      }).unwrap();

      const order = res?.order;

      if (!order?.id) {
        console.error("Order creation failed", res);
        return;
      }

      if (isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            Loading Plans...
          </div>
        );
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency || "INR",

        name: "AG & Associates",

        description: selectedPlan.name,

        order_id: order.id,

        prefill: {
          name: "",
          email: "",
        },

        theme: {
          color: "#511D43",
        },

        handler: async (response) => {
          try {
            setVerifyingPayment(true);

            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            setVerifyingPayment(false);

            setPaidPlan(selectedPlan);

            setPaymentSuccess(true);

            window.dispatchEvent(new Event("subscriptionUpdated"));

            setTimeout(() => {
              setPaymentSuccess(false);
              setSelectedPlan(null);

              navigate("/profile");
            }, 7000);
          } catch (error) {
            setVerifyingPayment(false);
            console.error("Payment Verification Error:", error);
            alert("Payment received but verification failed. Contact support.");
          }
        },

        modal: {
          ondismiss: () => {
            console.log("Payment popup closed");
          },
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);

        alert(response.error.description || "Payment Failed");
      });

      rzp.open();
    } catch (error) {
      console.error("Create Order Error:", error);

      alert("Unable to initiate payment");
    }
  };

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
          {plan.features?.map((feature, i) => (
            <li key={i} className="flex items-start text-white/90 text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-1" />
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            if (!token) {
              localStorage.setItem("pendingPlan", JSON.stringify(plan));
              navigate("/auth?redirect=pricing");
            } else {
              setSelectedPlan(plan);
            }
          }}
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
        {/* {plans.map((plan, i) => (
          <div key={plan.id}>{renderCard(plan)}</div>
        ))} */}
        {plans.map((plan, index) => (
          <div key={plan._id || index}>{renderCard(plan)}</div>
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

      {/* ================= PAYMENT MODAL ================= */}

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-4
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
              }}
              className="
          relative
          overflow-hidden
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/20
          bg-gradient-to-br
          from-[#511D43]
          via-[#6a2557]
          to-[#901E3E]
          shadow-[0_25px_100px_rgba(81,29,67,0.45)]
          text-white
        "
            >
              <div className="absolute -top-24 -left-24 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />

              <div className="absolute -bottom-24 -right-24 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />

              <div
                className="absolute inset-0 opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle,#ffffff 0%,transparent 70%)",
                }}
              />

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white/60 uppercase text-xs tracking-widest">
                      Subscription Plan
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold mt-2">
                      {selectedPlan.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="
                w-10
                h-10
                rounded-xl
                bg-white/10
                hover:bg-white/20
                flex
                items-center
                justify-center
              "
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
                  <div className="flex justify-between py-2">
                    <span className="text-white/70">Plan Amount</span>

                    <span>₹{selectedPlan.price.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-white/70">CGST (9%)</span>

                    <span>₹{(selectedPlan.price * 0.09).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-white/70">SGST (9%)</span>

                    <span>₹{(selectedPlan.price * 0.09).toFixed(2)}</span>
                  </div>

                  <div className="border-t border-white/20 mt-3 pt-4 flex justify-between">
                    <span className="font-semibold">Total Payable</span>

                    <span className="text-2xl font-bold text-green-300">
                      ₹{(selectedPlan.price * 1.18).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="
              mt-6
              w-full
              py-4
              rounded-2xl
              bg-white
              text-[#511D43]
              font-bold
              text-lg
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
            "
                >
                  Proceed to Secure Payment
                </button>

                <p className="text-center text-xs text-white/60 mt-4">
                  🔒 Secured by Razorpay • SSL Encrypted
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ================= SUCCESS MODAL ================= */}

      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-4
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
              }}
              className="
          relative
          overflow-hidden
          w-full
          max-w-lg
          rounded-[32px]
          border
          border-white/20
          bg-gradient-to-br
          from-[#511D43]
          via-[#6a2557]
          to-[#901E3E]
          shadow-[0_25px_100px_rgba(81,29,67,0.5)]
        "
            >
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />

              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />

              <div className="relative z-10 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <Lottie
                      animationData={paymentSuccessAnimation}
                      loop={true}
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <div
                      className="
          inline-flex
          items-center
          px-3
          py-1
          rounded-full
          bg-green-500/20
          text-green-300
          text-xs
          font-semibold
          mb-2
        "
                    >
                      Subscription Activated
                    </div>

                    <h2 className="text-2xl font-bold">Payment Successful</h2>

                    <p className="text-sm text-white/70 mt-1">
                      Your subscription has been activated successfully.
                    </p>
                  </div>
                </div>

                <div
                  className="
      mt-5
      rounded-2xl
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      p-4
    "
                >
                  <div className="flex justify-between py-2">
                    <span className="text-white/60">Plan</span>

                    <span className="font-semibold">{paidPlan?.name}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-white/60">Amount Paid</span>

                    <span className="font-semibold text-green-300">
                      ₹{paidPlan?.price?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-white/60">Status</span>

                    <span className="font-semibold text-green-300">Active</span>
                  </div>
                </div>

                <div
                  className="
      mt-4
      flex
      items-center
      gap-2
      text-xs
      text-white/60
    "
                >
                  <CheckCircle size={14} />
                  Invoice & confirmation email sent successfully
                </div>

                <button
                  onClick={() => {
                    setPaymentSuccess(false);
                    setSelectedPlan(null);
                  }}
                  className="
      mt-5
      w-full
      py-3
      rounded-2xl
      bg-white
      text-[#511D43]
      font-semibold
      hover:scale-[1.02]
      transition-all
    "
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ================= LOADER MODAL ================= */}

      <AnimatePresence>
        {verifyingPayment && (
          <motion.div
            className="
        fixed
        inset-0
        z-[100000]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-4
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="
          w-full
          max-w-md
          rounded-3xl
          overflow-hidden
          border
          border-white/20
          bg-gradient-to-br
          from-[#511D43]
          via-[#6a2557]
          to-[#901E3E]
          text-white
          text-center
          p-8
        "
            >
              <div className="w-40 h-40 mx-auto">
                <Lottie animationData={UploadingAnimation} loop />
              </div>

              <h2 className="text-2xl font-bold">Verifying Payment</h2>

              <p className="text-white/70 mt-3">
                Please wait while we confirm your payment and activate your
                subscription.
              </p>

              <div className="mt-6">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-400"
                    animate={{
                      x: ["-100%", "300%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-white/50 mt-4">
                Do not close this window
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
