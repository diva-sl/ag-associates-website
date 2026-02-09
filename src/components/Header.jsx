import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Calculator } from "lucide-react";
import { Button } from "@/ui/button";
import { navLinks } from "@/lib/constants";

import { scrollTo } from "@/lib/scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);

    if (isOpen) {
      window.addEventListener("scroll", closeMenu);
    }

    return () => window.removeEventListener("scroll", closeMenu);
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    scrollTo(sectionId);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // scrolled ? "glass-effect shadow-lg" : "bg-transparent"
        scrolled
          ? "backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("home")}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-2"
          >
            <Calculator className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">
              AG & ASSOCIATES
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-6 py-2 rounded-full"
            >
              Get Consultation
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-effect rounded-lg p-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Get Consultation
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
