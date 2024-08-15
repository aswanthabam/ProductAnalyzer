import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "./api";
import styles from "./DashboardWrapper.module.css";

export default function DashboardWrapper() {
  const redirect = useNavigate();
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
      } else {
        alert(res.message);
        redirect("/login");
      }
    });
  }, []);
  return info == null ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <>
      {info.email_verified ? (
        <></>
      ) : (
        <div className={styles.emailNotVerified}>
          <p>
            Your email is not verified. Please{" "}
            <Link to="/register/confirm-email">verify your email</Link> to
            continue.
          </p>
        </div>
      )}
      <Outlet />
    </>
  );
}
