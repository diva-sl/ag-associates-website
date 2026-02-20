import React from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "@/lib/constants";
import { scrollTo } from "@/lib/scroll";

const Footer = () => {
  const services = [
    "Direct Taxation",
    "GST Compliance",
    "Corporate Tax",
    "Financial Planning",
    "Tax Advisory",
    "Business Consulting",
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://m.facebook.com/profile.php?id=61587441165580&name=xhp_nt__fb__action__open_user",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ag_and_associates8/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ag-and-associates-751b133ab/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/AgAndAssocites",
      label: "Twitter (X)",
    },
  ];

  return (
    <footer className="relative py-16 bg-gradient-to-t from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">
                AG & ASSOCIATES
              </span>
            </div>

            <p className="text-white/80 leading-relaxed">
              Your trusted partner for comprehensive tax consultancy services.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>

            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-white/90">Tirupur</p>
                  <p className="text-white/80">Tamil Nadu - 641608</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a
                  href="tel:+917373476048"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  +91 73734 76048
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a
                  href="mailto:info@agandassociates.org"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  info@agandassociates.org
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-center md:text-left">
              © {new Date().getFullYear()} AG & ASSOCIATES. All rights reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Link to="/disclaimer" className="text-white/70 hover:text-white">
                Disclaimer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
