import { Link, useNavigate } from "react-router-dom";
import { useNavbar } from "../../../context/NavbarContext";
import styles from "./DashboardSidebar.module.css";

const Sidebar = () => {
  const { nav } = useNavbar();
  const redirect = useNavigate();
  return (
    <div className={styles.container}>
      {!nav.head && <div className={styles.logo}>Product Analyzer</div>}
      <div className={styles.menu}>
        {nav.head && (
          <div className={styles.header}>
            <Link to={nav.head.page}>
              <i className="bi bi-chevron-left"></i> {nav.head.name}
            </Link>
          </div>
        )}
        {nav.items.map((group) => (
          <ul key={group.name} className={styles.menuGroup}>
            <label>{group.name}</label>
            {group.items.map((item) => (
              <li
                key={item.name}
                className={styles.menuItem}
                onClick={() => {
                  redirect(item.page);
                }}
              >
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
