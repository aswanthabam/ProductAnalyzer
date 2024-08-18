import { useToast } from "../../../context/ToastContext";
import styles from "./InfoToast.module.css";

const InfoToast = () => {
  const { infoToast } = useToast();
  return (
    <div
      className={
        styles.infoToast + (infoToast.child ? ` ${styles.visible}` : "")
      }
    >
      <i className="bi bi-info-circle"></i>{" "}
      <div className={styles.child}>{infoToast.child}</div>
    </div>
  );
};

export default InfoToast;
