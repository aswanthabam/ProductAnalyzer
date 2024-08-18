import styles from "./DefaultLoader.module.css";

const DefaultLoader = ({ visible }: { visible?: boolean }) => {
  return (
    <div className={styles.container + (visible ? ` ${styles.visible}` : "")}>
      <div className={styles.loader}></div>
      <div className={styles.text}>Loading..</div>
    </div>
  );
};

export default DefaultLoader;
