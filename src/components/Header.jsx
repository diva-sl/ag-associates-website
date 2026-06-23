import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/ui/button";
import { navLinks } from "@/lib/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import logo from "../assets/ag-logo.png";

const Header = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const drawerRef = useRef();
  const dropdownRef = useRef(null);
  const profileFields = [
    user?.name,
    user?.email,
    user?.phone,
    user?.pan,
    user?.aadhaar,
    user?.address,
  ];

  const [avatarError, setAvatarError] = useState(false);

  const avatar =
    !avatarError && (user?.avatar || user?.picture || user?.photoURL);
  const completion = Math.round(
    (profileFields.filter(Boolean).length / profileFields.length) * 100,
  );

  const [resourcesOpen, setResourcesOpen] = useState(false);

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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
              <div>
                <h1 className="font-bold text-white leading-none">
                  AG & ASSOCIATES
                </h1>

                <p className="text-[10px] text-white/60 tracking-widest">
                  TAX • GST • COMPLIANCE
                </p>
              </div>
            </motion.button>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => {
                if (item.dropdown) {
                  return (
                    <div
                      key={item.name}
                      ref={dropdownRef}
                      className="relative group"
                    >
                      <button
                        className="
            flex
            items-center
            gap-1

            text-white
            font-medium
          "
                      >
                        {item.name}
                        <ChevronDown size={16} />
                      </button>

                      <div
                        className="
            absolute
            top-full
            left-0

            mt-3
            w-56

            rounded-2xl

            bg-white
            shadow-2xl

            opacity-0
            invisible

            group-hover:opacity-100
            group-hover:visible

            transition-all
            duration-300

            overflow-hidden
          "
                      >
                        {item.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.link}
                            className="
                block

                px-5
                py-3

                text-gray-700

                hover:bg-gray-100
              "
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return item.link ? (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`
font-medium
transition-all
${
  location.pathname === item.link
    ? "text-white"
    : "text-white/70 hover:text-white"
}
`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`
font-medium
transition-all
${
  location.pathname === item.link
    ? "text-white"
    : "text-white/70 hover:text-white"
}
`}
                  >
                    {item.name}
                  </button>
                );
              })}
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
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="
      flex
      items-center
      gap-3
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-full
      px-2
      py-2
      hover:bg-white/20
      transition-all
      duration-300
      shadow-lg
    "
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={user?.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => setAvatarError(true)}
                        className="
    w-11
    h-11
    rounded-full
    object-cover
    border-2
    border-white
  "
                      />
                    ) : (
                      <div
                        className="
          w-11
          h-11
          rounded-full
          bg-white
          text-[#511D43]
          flex
          items-center
          justify-center
          font-bold
        "
                      >
                        {user?.name?.[0]?.toUpperCase() ||
                          user?.email?.[0]?.toUpperCase() ||
                          "U"}
                      </div>
                    )}

                    <div className="hidden xl:block text-left">
                      <p className="text-white text-sm font-semibold truncate max-w-[140px]">
                        {user?.name}
                      </p>

                      <p className="text-white/60 text-xs">
                        {user?.subscription?.toUpperCase() || "FREE"}
                      </p>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-white transition-all ${
                        dropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="
        absolute
        right-0
        mt-4
        w-80
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        border
        border-slate-100
      "
                    >
                      {/* User Header */}
                      <div className="p-5 bg-gradient-to-r from-[#511D43] to-[#901E3E] text-white">
                        <div className="flex items-center gap-3">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={user?.name}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={(e) => setAvatarError(true)}
                              className="
    w-11
    h-11
    rounded-full
    object-cover
    border-2
    border-white
  "
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-white text-[#511D43] flex items-center justify-center font-bold">
                              {user?.name?.[0]?.toUpperCase()}
                            </div>
                          )}

                          <div className="flex-1">
                            <h4 className="font-semibold truncate">
                              {user?.name}
                            </h4>

                            <p className="text-xs text-white/70 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span
                            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              ${getSubscriptionColor(user?.subscription)}
            `}
                          >
                            {user?.subscription?.toUpperCase() || "FREE"}
                          </span>

                          {user?.subscriptionExpiry && (
                            <span className="text-xs text-white/70">
                              {formatDate(user.subscriptionExpiry)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Profile Completion */}
                      <div className="p-5 border-b">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">
                            Profile Completion
                          </span>

                          <span className="font-semibold">{completion}%</span>
                        </div>

                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="
              h-full
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
            "
                            style={{
                              width: `${completion}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Verification Status */}
                      <div className="p-5 border-b">
                        <div className="flex flex-wrap gap-2">
                          {user?.panStatus === "approved" && (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              ✓ PAN Verified
                            </span>
                          )}

                          {user?.aadhaarStatus === "approved" && (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              ✓ Aadhaar Verified
                            </span>
                          )}

                          {user?.gstinStatus === "approved" && (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              ✓ GST Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setDropdown(false)}
                          className="
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-slate-50
            transition
          "
                        >
                          <User size={18} />
                          My Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            text-red-600
            hover:bg-red-50
            transition
          "
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
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
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-[#511D43] z-50 shadow-2xl p-6 flex flex-col"
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
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={user?.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => setAvatarError(true)}
                        className="
    w-11
    h-11
    rounded-full
    object-cover
    border-2
    border-white
  "
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
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {user?.panStatus === "approved" && (
                          <span
                            className="
        text-[10px]
        bg-green-500/20
        text-green-300
        px-2
        py-1
        rounded-full
        border
        border-green-500/20
      "
                          >
                            ✓ PAN Verified
                          </span>
                        )}

                        {user?.aadhaarStatus === "approved" && (
                          <span
                            className="
        text-[10px]
        bg-green-500/20
        text-green-300
        px-2
        py-1
        rounded-full
        border
        border-green-500/20
      "
                          >
                            ✓ Aadhaar Verified
                          </span>
                        )}

                        {user?.gstinStatus === "approved" && (
                          <span
                            className="
        text-[10px]
        bg-green-500/20
        text-green-300
        px-2
        py-1
        rounded-full
        border
        border-green-500/20
      "
                          >
                            ✓ GST Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= NAVIGATION ================= */}

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((item) => {
                    if (item.dropdown) {
                      return (
                        <div key={item.name}>
                          <button
                            onClick={() => setResourcesOpen(!resourcesOpen)}
                            className="
                              w-full
                              flex
                              items-center
                              justify-between

                              text-left
                              text-lg
                              font-medium

                              hover:text-gray-300
                              transition
                            "
                          >
                            <span>{item.name}</span>

                            <motion.div
                              animate={{
                                rotate: resourcesOpen ? 180 : 0,
                              }}
                              transition={{
                                duration: 0.2,
                              }}
                            >
                              <ChevronDown size={18} />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {resourcesOpen && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pl-5 mt-3 flex flex-col gap-3">
                                  {item.items.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.link}
                                      onClick={() => setIsOpen(false)}
                                      className="
                                        text-white/75
                                        hover:text-white
                                        transition
                                      "
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    if (item.link) {
                      return (
                        <Link
                          key={item.name}
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-medium"
                        >
                          {item.name}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-lg font-medium"
                      >
                        {item.name}
                      </button>
                    );
                  })}

                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="
      bg-white
      text-[#511D43]
      rounded-full
      py-2
      font-semibold
    "
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
