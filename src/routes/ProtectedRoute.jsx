import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("authToken");
      return <Navigate to="/auth" />;
    }
  } catch (err) {
    localStorage.removeItem("authToken");
    return <Navigate to="/auth" />;
  }

  return children;
}
