import { useEffect } from "react";
import { logout } from "./api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const Logout = () => {
  const redirect = useNavigate();
  const showToast = useToast().showToast;
  useEffect(() => {
    var refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }
    logout(refreshToken, false).then((res) => {
      if (res.status === "success") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        showToast("Logged out successfully");
        redirect("/login");
      } else {
        showToast(res.message, 5000);
      }
    });
  }, []);
  return <div>Logging out...</div>;
};

export default Logout;
