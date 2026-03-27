import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/redux/services/authApi";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ token, password }).unwrap();
      alert("Password reset successful");
      navigate("/auth");
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
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-[#511D43] text-white p-3 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
