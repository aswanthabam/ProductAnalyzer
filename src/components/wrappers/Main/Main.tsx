import { Outlet } from "react-router-dom";
import { Toast } from "../../toast/Toast/Toast";
import styles from "./Main.module.css";
import Dialog from "../../dialog/Dialog";

const Main = () => {
  return (
    <div className={styles.main}>
      <Toast />
      <Dialog />
      <Outlet />
    </div>
  );
};

export default Main;
