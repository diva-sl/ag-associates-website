import React from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Receipt,
  Building,
  Shield,
  PiggyBank,
  Users,
} from "lucide-react";

import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Calculator,
      title: "Direct Taxation",
      description:
        "Comprehensive income tax planning, filing, audits, and capital gains advisory for individuals and businesses.",
      features: [
        "Income Tax Planning & Filing",
        "Tax Audits and Assessments",
        "Capital Gains Advisory",
        "Tax Deduction Structuring",
      ],
    },
    {
      icon: Receipt,
      title: "Indirect Taxation",
      description:
        "Complete GST compliance, registration, optimization, and audit services to ensure seamless operations.",
      features: [
        "GST Compliance & Registration",
        "Input Tax Credit Optimization",
        "GST Audits & Advisory",
        "Return Filing Support",
      ],
    },
    {
      icon: Building,
      title: "Corporate Tax Solutions",
      description:
        "Strategic tax structuring for businesses, M&A support, and cross-border taxation expertise.",
      features: [
        "Tax Structuring for New Ventures",
        "Mergers & Acquisitions Support",
        "Cross-border Taxation",
        "Transfer Pricing",
      ],
    },
    {
      icon: Shield,
      title: "Advisory Services",
      description:
        "Risk management, compliance review, and representation before tax authorities with dispute resolution.",
      features: [
        "Tax Risk Management",
        "Regulatory Compliance Review",
        "Tax Authority Representation",
        "Dispute Resolution & Appeals",
      ],
    },
    {
      icon: PiggyBank,
      title: "Financial Planning",
      description:
        "Comprehensive wealth management, retirement planning, and estate planning services.",
      features: [
        "Wealth Management Advisory",
        "Retirement Planning",
        "Estate Planning",
        "Investment Tax Planning",
      ],
    },
    {
      icon: Users,
      title: "Business Consulting",
      description:
        "Strategic business advisory services to help optimize your financial structure and growth.",
      features: [
        "Business Structure Optimization",
        "Financial Strategy Consulting",
        "Compliance Management",
        "Growth Planning",
      ],
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <section id="services" className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>

          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            Comprehensive tax and financial solutions designed to support
            individuals, startups, and enterprises with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.25 },
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="
        service-card
        rounded-2xl
        p-6
        h-full
        flex
        flex-col
        group
        relative
        overflow-hidden
      "
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className="
            p-3
            bg-gradient-to-br
            from-blue-500
            to-purple-600
            rounded-xl
            shadow-lg
            flex-shrink-0
          "
                >
                  <service.icon className="h-8 w-8 text-white" />
                </motion.div>
                ```
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex-1">
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start text-white/80"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />

                      <span className="text-sm md:text-[15px] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="
        w-full
        bg-gradient-to-r
        from-blue-500
        to-purple-600
        hover:from-blue-600
        hover:to-purple-700
        text-white
        font-semibold
        h-11
        rounded-xl
        shadow-md
        transition-all
        duration-300
      "
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
