import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "@/lib/constants";
import logo from "../assets/ag-logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    "Direct Taxation",
    "GST Compliance",
    "Corporate Tax",
    "Financial Planning",
    "Tax Advisory",
    "Business Consulting",
  ];

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://m.facebook.com/profile.php?id=61587441165580",
    },
    { icon: Instagram, href: "https://www.instagram.com/ag_and_associates8/" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ag-and-associates-751b133ab/",
    },
    { icon: Twitter, href: "https://x.com/AgAndAssocites" },
    { icon: Youtube, href: "https://www.youtube.com/@AG_AND_ASSOCIATES" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#511d43] to-[#901e3e] text-white pt-24">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44C200.2,82,0,0,0,0V120H1200V0s-200.2,82-321.39,56.44C757.42,30.89,578.81,30.89,321.39,56.44Z"
            className="fill-white/10"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <img src={logo} alt="AG Logo" className="h-14 w-14" />
              <span className="text-2xl font-bold">AG & ASSOCIATES</span>
            </div>

            <p className="text-white/80 leading-relaxed">
              Trusted experts in taxation, compliance, and financial advisory
              services.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-white/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.link ? (
                    <Link
                      to={link.link}
                      className="hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleScroll(link.id)}
                      className="hover:text-white transition"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
              {/* <li>
                <Link to="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3 text-white/80">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScroll("contact")}
                    className="hover:text-white transition"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>

            <div className="space-y-4 text-white/80">
              <div className="flex items-start space-x-3">
                <MapPin size={18} />
                <div>
                  <p>Tirupur</p>
                  <p>Tamil Nadu - 641608</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <a href="tel:+917373476048" className="hover:text-white">
                  +91 73734 76048
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <a href="mailto:info@agandassociates.org">
                  info@agandassociates.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/70 space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} AG & ASSOCIATES. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
