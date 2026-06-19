import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/services/authApi";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        token,
        password,
      }).unwrap();

      alert("Password reset successful. Please login.");

      navigate("/auth");
    } catch (err) {
      alert(err?.data?.message || "Invalid or expired reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#511D43] to-[#901E3E] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>

        <p className="text-gray-500 text-center mb-6">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#511D43] text-white p-3 rounded-lg"
          >
            {isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-5">
          <Link to="/auth" className="text-[#511D43]">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
