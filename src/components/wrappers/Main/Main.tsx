import { Outlet } from "react-router-dom";
import { Toast } from "../../toast/Toast/Toast";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <Toast />
      <Outlet />
    </div>
  );
};

export default Main;
