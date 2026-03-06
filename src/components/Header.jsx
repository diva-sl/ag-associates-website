import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
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
  const drawerRef = useRef();

  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setDropdown(false);
    setIsOpen(false);
  };

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE DRAWER ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  /* ================= SCROLL TO SECTION ================= */
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
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getSubscriptionColor = (sub) => {
    switch (sub) {
      case "premium":
        return "bg-yellow-400 text-black";
      case "corporate":
        return "bg-blue-400 text-black";
      case "basic":
        return "bg-green-400 text-black";
      default:
        return "bg-gray-400 text-black";
    }
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
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
            {/* ================= LOGO ================= */}
            <motion.button
              onClick={() => scrollToSection("home")}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <img
                src={logo}
                alt="AG & Associates"
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold text-white tracking-wide">
                AG & ASSOCIATES
              </span>
            </motion.button>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) =>
                item.link ? (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="relative text-white font-medium group"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="relative text-white font-medium group"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ),
              )}

              {/* Consultation Button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-6 py-2 rounded-full shadow-md"
                >
                  Get Consultation
                </Button>
              </motion.div>

              {/* Auth */}
              {token ? (
                <div className="relative">
                  <div
                    onClick={() => setDropdown(!dropdown)}
                    className="w-10 h-10 rounded-full bg-white text-purple-700 flex items-center justify-center font-bold cursor-pointer shadow-md"
                  >
                    {/* {user?.name?.charAt(0)?.toUpperCase() || "U"} */}
                    {user?.name?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() ||
                      "U"}
                  </div>

                  {dropdown && (
                    <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-2xl w-44 py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdown(false)}
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
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/auth"
                    className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-2 rounded-full font-semibold shadow-md"
                  >
                    Login / Signup
                  </Link>
                </motion.div>
              )}
            </nav>

            {/* ================= MOBILE MENU ICON ================= */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#511D43] z-50 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                {/* <span className="text-white font-bold text-lg">Menu</span> */}
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-white" />
                </button>
              </div>

              <div className="flex flex-col h-full text-white">
                {/* ================= USER CARD ================= */}
                {token && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 flex items-center gap-3 border border-white/20">
                    {/* Avatar */}
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white text-purple-700 flex items-center justify-center font-bold text-lg">
                        {user?.name?.[0]?.toUpperCase() ||
                          user?.email?.[0]?.toUpperCase() ||
                          "U"}
                      </div>
                    )}

                    {/* User Info */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-sm truncate">
                        {user?.name}
                      </span>

                      <span className="text-xs opacity-80 truncate">
                        {user?.email}
                      </span>

                      <span className="text-[11px] opacity-70 mt-1">
                        Joined {formatDate(user?.createdAt)}
                      </span>

                      {/* Subscription Badge */}
                      <span
                        className={`mt-1 text-[10px] px-2 py-0.5 rounded w-fit font-semibold ${getSubscriptionColor(
                          user?.subscription,
                        )}`}
                      >
                        {user?.subscription?.toUpperCase() || "FREE"}
                      </span>

                      {/* Expiry only if active subscription */}
                      {user?.subscription !== "none" &&
                        user?.subscriptionExpiry && (
                          <span className="text-[10px] text-white/60">
                            Expires{" "}
                            {new Date(
                              user.subscriptionExpiry,
                            ).toLocaleDateString()}
                          </span>
                        )}
                    </div>
                  </div>
                )}

                {/* ================= NAVIGATION ================= */}

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((item) =>
                    item.link ? (
                      <Link
                        key={item.name}
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium hover:text-gray-300 transition"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-lg font-medium hover:text-gray-300 transition"
                      >
                        {item.name}
                      </button>
                    ),
                  )}

                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-white text-purple-700 rounded-full py-2 font-semibold"
                  >
                    Get Consultation
                  </Button>
                </div>

                {/* Auth Actions */}
                <div className="mt-6">
                  {token ? (
                    <div className="flex justify-center gap-6 pt-4 border-t border-white/20">
                      {/* Profile */}
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1 text-white hover:text-purple-300 transition"
                      >
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md transition hover:scale-110">
                          <User size={20} />
                        </div>
                        <span className="text-xs">Profile</span>
                      </Link>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex flex-col items-center gap-1 text-white hover:text-red-300 transition"
                      >
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md transition hover:scale-110">
                          <LogOut size={20} />
                        </div>
                        <span className="text-xs">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-white/20">
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="bg-white text-purple-700 rounded-full py-2 font-semibold text-center block"
                      >
                        Login / Signup
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
