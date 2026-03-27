import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/services/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email }).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#511D43] to-[#901E3E]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-[#511D43] text-white p-3 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
