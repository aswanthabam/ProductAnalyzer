import styles from "./DashboardSidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Product Analyzer</div>
      <div className={styles.menu}>
        <ul className={styles.menuGroup}>
          <label>Products</label>
          <li className={styles.menuItem}>
            <i className="bi bi-rocket-takeoff-fill"></i> Products
          </li>
          <li className={styles.menuItem}>
            <i className="bi bi-pie-chart-fill"></i> Usage
          </li>
          <li className={styles.menuItem}>
            <i className="bi bi-file-earmark-code-fill"></i> API Docs
          </li>
        </ul>
        <ul className={styles.menuGroup}>
          <label>Account</label>
          <li className={styles.menuItem}>
            <i className="bi bi-rocket-takeoff-fill"></i> Upgrade
          </li>
          <li className={styles.menuItem}>
            <i className="bi bi-pie-chart-fill"></i> Usage
          </li>
          <li className={styles.menuItem}>
            <i className="bi bi-gear-fill"></i> Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
