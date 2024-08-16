import { useEffect } from "react";
import styles from "./Home.module.css";
import { useToast } from "../../../context/toast/ToastContext";

const DashboardHome = () => {
  const { showToast } = useToast();
  useEffect(() => {
    showToast(<p>Welcome to the dashboard</p>, null);
  }, []);
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardHome;
