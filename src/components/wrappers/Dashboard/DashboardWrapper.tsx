import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "./api";
import styles from "./DashboardWrapper.module.css";
import { useToast } from "../../../context/ToastContext";
import InfoToast from "../../toast/InfoToast/InfoToast";

export default function DashboardWrapper() {
  const redirect = useNavigate();
  const { showToast, showInfoToast } = useToast();
  const [info, setInfo] = useState<{
    id: string;
    fullname: string;
    email_verified: boolean;
  } | null>(null);
  useEffect(() => {
    var token = localStorage.getItem("accessToken");
    if (!token) {
      redirect("/login");
    }
    getUserInfo().then((res) => {
      if (res.status === "success") {
        setInfo(res.data);
        if (!res.data.email_verified) {
          showInfoToast(
            <p>
              Your email is not verified. Please{" "}
              <Link to="/register/confirm-email">verify your email</Link> to
              continue.
            </p>
          );
        }
      } else {
        showToast(res.message, 5000);
        redirect("/login");
      }
    });
  }, []);
  return info == null ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}></div>
      <div className={styles.main}>
        <h1>Dashboard</h1>
        <InfoToast />
        <Outlet />
      </div>
    </div>
  );
}
