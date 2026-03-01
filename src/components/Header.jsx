import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/ui/button";
import { navLinks } from "@/lib/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import logo from "../assets/ag-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("home")}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover="hover"
            className="flex items-center space-x-1.5 group perspective"
          >
            {/* Logo */}
            <motion.div
              className="flex items-center justify-center"
              variants={{
                hover: {
                  rotateY: 8,
                  rotateX: -6,
                  scale: 1.08,
                },
              }}
              transition={{ type: "spring", stiffness: 250, damping: 12 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={logo}
                alt="AG & Associates Logo"
                className="h-14 w-14 object-contain"
              />
            </motion.div>

            {/* Brand Name */}
            <motion.span
              className="text-xl font-bold text-white tracking-wide"
              variants={{
                hover: {
                  scale: 1.03,
                },
              }}
              transition={{ duration: 0.3 }}
            >
              AG & ASSOCIATES
            </motion.span>
          </motion.button>
          {/* ✅ Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) =>
              item.link ? (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`relative font-medium text-white group ${
                    location.pathname === item.link ? "text-white" : ""
                  }`}
                >
                  {item.name}

                  {/* Underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300
                  ${
                    location.pathname === item.link
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                  ></span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="relative font-medium text-white group"
                >
                  {item.name}

                  {/* Hover underline */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              ),
            )}

            {/* Keep your existing button same */}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-white text-purple-700 px-6 py-2 rounded-full"
            >
              Get Consultation
            </Button>

            {/* 🔐 AUTH SECTION (No color change) */}
            {token ? (
              <div className="relative">
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="w-10 h-10 rounded-full bg-white text-purple-700 flex items-center justify-center font-bold cursor-pointer"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {dropdown && (
                  <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-lg w-40 py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold"
              >
                Login / Signup
              </Link>
            )}
          </nav>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
