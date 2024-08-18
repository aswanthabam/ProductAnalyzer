import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "./api";
import styles from "./DashboardWrapper.module.css";
import { useToast } from "../../../context/ToastContext";
import InfoToast from "../../toast/InfoToast/InfoToast";
import Sidebar from "../../menu/DashboardSidebar/DashboardSIdebar";

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

  const [width, setWidth] = useState<number>(300);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sideMenuRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (): void => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging && sideMenuRef.current) {
      const newWidth =
        e.clientX - sideMenuRef.current.getBoundingClientRect().left;
      setWidth(Math.max(200, Math.min(newWidth, 600)));
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  return info == null ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <div className={styles.dashboard}>
      <div
        className={styles.sidebar}
        ref={sideMenuRef}
        style={{ width: `${width}px` }}
      >
        <Sidebar />
        <div className={styles.dragger} onMouseDown={handleMouseDown}></div>
      </div>
      <div className={styles.main}>
        {/* <h1>Dashboard</h1> */}
        <InfoToast />
        <Outlet />
      </div>
    </div>
  );
}
