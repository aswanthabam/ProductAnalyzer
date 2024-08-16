import { useToast } from "../../context/toast/ToastContext";
import styles from "./Toast.module.css";

export interface ToastProps {}

export const Toast: React.FC<ToastProps> = () => {
  const { toast } = useToast();
  return (
    <div className={styles.toast + (toast.child ? ` ${styles.visible}` : "")}>
      {toast.child}
    </div>
  );
};
