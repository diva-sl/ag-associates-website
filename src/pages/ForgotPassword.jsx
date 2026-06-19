import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "@/redux/services/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({
        email,
      }).unwrap();

      setSuccess(res.message || "Password reset link sent successfully.");

      setEmail("");
    } catch (err) {
      alert(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#511D43] to-[#901E3E] px-4">
      {" "}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>

        <p className="text-gray-500 text-center mb-6">
          Enter your registered email address.
        </p>

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#511D43] text-white p-3 rounded-lg"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="flex justify-between mt-5 text-sm">
          <Link to="/auth" className="text-[#511D43]">
            ← Back to Login
          </Link>

          <Link to="/" className="text-[#511D43]">
            Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
