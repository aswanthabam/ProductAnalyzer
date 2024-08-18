import { useEffect } from "react";
import { useDialog } from "../../context/DialogContext";
import styles from "./Dialog.module.css";
const Dialog = () => {
  const { dialog, hideDialog } = useDialog();
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideDialog();
      }
    });
  }, []);
  return (
    <>
      <div
        className={styles.dialog + (dialog.child ? ` ${styles.visible}` : "")}
      >
        {dialog.child}
      </div>
      <div
        onClick={hideDialog}
        className={styles.overlay + (dialog.child ? ` ${styles.visible}` : "")}
      ></div>
    </>
  );
};

export default Dialog;
