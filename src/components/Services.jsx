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
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tax and financial services tailored to meet your
            unique needs and objectives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 200 }}
              // transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="service-card rounded-2xl p-8 group"
            >
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"> */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
                >
                  <service.icon className="h-8 w-8 text-white" />
                </motion.div>
                {/* </div> */}
                <h3 className="text-2xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              <p className="text-white/90 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-white/80 flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => scrollToSection("contact")}
                className="mt-6 w-full bg-gradient-to-r 
             from-blue-500 to-purple-600 
             hover:from-blue-600 hover:to-purple-700
             text-white font-semibold py-6 rounded-xl"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* 
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl border border-white/10"
              >
                <span className="text-white font-semibold">
                  Get Expert Consultation
                </span>
              </motion.div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
