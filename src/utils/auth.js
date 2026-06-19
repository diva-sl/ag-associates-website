import { logout } from "@/redux/slices/authSlice";

export const handleUnauthorized = (dispatch) => {
  dispatch(logout());

  window.location.href = "/auth";
};
