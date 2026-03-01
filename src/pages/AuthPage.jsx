import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
// import animationData from "@/assets/auth-animation.json";

import animationData from "../assets/auth-animation.json";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= VALIDATION ================= */

  const validate = () => {
    const newErrors = {};

    if (!form.email.match(/\S+@\S+\.\S+/))
      newErrors.email = "Enter valid email address";

    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin && form.name.trim() === "")
      newErrors.name = "Full name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const response = isLogin
        ? await login(form).unwrap()
        : await register(form).unwrap();

      dispatch(setCredentials(response));
      localStorage.setItem("authToken", response.token);
      navigate("/");
    } catch (err) {
      alert(err.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-[#511D43] to-[#901E3E]">
      {/* ================= LEFT SIDE ================= */}

      {/* ================= LEFT SIDE ================= */}

      <div className="hidden lg:flex relative flex-col justify-center items-center text-white px-16 py-20 overflow-hidden">
        {/* Floating Glow Background */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Secure Access to Your Account
            </h1>
            <p className="text-white/80 max-w-md mx-auto leading-relaxed">
              Manage tax filings, GST compliance, and advisory services in one
              secure professional dashboard.
            </p>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="w-[360px]"
          >
            <Lottie animationData={animationData} loop autoplay />
          </motion.div>
          <motion.div
            whileHover={{ rotateY: 5 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="w-[360px] perspective-1000"
          ></motion.div>
        </div>
      </div>
      {/* ================= RIGHT SIDE ================= */}

      <div className="flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-[#511D43]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            {!isLogin && (
              <div>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 p-3 border rounded-xl"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 p-3 border rounded-xl"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 p-3 border rounded-xl"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#511D43] text-white py-3 rounded-xl font-semibold hover:bg-[#3d1432] transition-all"
            >
              {loading ? (
                "Please wait..."
              ) : (
                <>
                  {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  {isLogin ? "Login" : "Register"}
                </>
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#511D43] cursor-pointer ml-1 font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
