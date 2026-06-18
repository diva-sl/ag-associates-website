import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { useSubscribeNewsletterMutation } from "../../redux/services/newsletterApi";

const KnowledgeNewsletter = () => {
  const [email, setEmail] = useState("");

  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubscribe = async () => {
    try {
      if (!email.trim()) {
        alert("Please enter your email address");
        return;
      }

      await subscribeNewsletter({ email }).unwrap();

      alert("Successfully subscribed to our newsletter");

      setEmail("");
    } catch (error) {
      alert(error?.data?.message || "Subscription failed");
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5" />

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2

          w-[700px]
          h-[700px]

          bg-blue-500/10
          blur-[180px]
          rounded-full
        "
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="
              relative
              overflow-hidden

              rounded-[32px]

              border
              border-white/10

              bg-white/[0.04]
              backdrop-blur-2xl

              p-6
              sm:p-8
              md:p-12
              lg:p-16

              text-center
            "
          >
            {/* Decorative Glow */}
            <div
              className="
                absolute
                top-0
                left-0

                w-72
                h-72

                bg-blue-500/10
                blur-3xl
                rounded-full
              "
            />

            <div
              className="
                absolute
                bottom-0
                right-0

                w-72
                h-72

                bg-purple-500/10
                blur-3xl
                rounded-full
              "
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                className="
                  w-16
                  h-16
                  md:w-20
                  md:h-20

                  mx-auto

                  rounded-2xl

                  bg-gradient-to-br
                  from-blue-500
                  to-purple-600

                  flex
                  items-center
                  justify-center

                  shadow-lg
                  shadow-blue-500/20
                "
              >
                <Mail
                  size={34}
                  className="text-white md:w-[38px] md:h-[38px]"
                />
              </motion.div>
              {/* Heading */}
              <h2
                className="
                  mt-6

                  text-3xl
                  md:text-4xl
                  lg:text-5xl

                  font-black

                  bg-gradient-to-r
                  from-blue-400
                  via-white
                  to-purple-400

                  bg-clip-text
                  text-transparent
                "
              >
                Stay Updated with Tax & GST Changes
              </h2>
              {/* Description */}
              <p
                className="
                  mt-5

                  text-white/70

                  text-sm
                  md:text-lg

                  max-w-2xl
                  mx-auto

                  leading-relaxed
                "
              >
                Get the latest Income Tax updates, GST notifications, compliance
                alerts, filing deadlines, and expert insights delivered directly
                to your inbox.
              </p>
              {/* Form */}

              <div
                className="
    mt-10

    flex
    flex-col
    md:flex-row

    gap-4

    w-full
    max-w-3xl

    mx-auto
  "
              >
                {/* Email Input */}
                <div className="relative flex-1 w-full">
                  <Mail
                    size={18}
                    className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2

        text-white/40

        pointer-events-none
      "
                  />

                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="
        w-full

        h-14
        sm:h-16

        pl-12
        pr-4

        text-sm
        sm:text-base

        rounded-2xl

        bg-white/10

        border
        border-white/15

        text-white

        placeholder:text-white/50

        outline-none

        backdrop-blur-md

        focus:border-blue-400
        focus:ring-4
        focus:ring-blue-500/20

        transition-all
        duration-300
      "
                  />
                </div>

                {/* Subscribe Button */}
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="
      group

      w-full
      md:w-auto

      h-14
      sm:h-16

      px-8

      rounded-2xl

      bg-gradient-to-r
      from-blue-500
      to-purple-600

      hover:from-blue-600
      hover:to-purple-700

      text-white
      font-semibold

      shadow-lg
      shadow-blue-500/20

      hover:shadow-blue-500/40
      hover:-translate-y-1

      transition-all
      duration-300

      disabled:opacity-50
      disabled:cursor-not-allowed

      flex
      items-center
      justify-center
      gap-2

      whitespace-nowrap
    "
                >
                  {isLoading ? "Subscribing..." : "Subscribe Now"}

                  <ArrowRight
                    size={18}
                    className="
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
                  />
                </button>
              </div>
              {/* Footer Text */}
              <p
                className="
                  mt-5

                  text-xs
                  md:text-sm

                  text-white/50
                "
              >
                No spam. Only important tax updates, GST alerts, compliance
                reminders, and expert advisory content.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeNewsletter;
