import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      dispatch(setCredentials({ token }));
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#511D43] to-[#901E3E] text-white">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Logging you in securely...</h2>
      </div>
    </div>
  );
}
