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
            {nav.head.page === "back" ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  redirect(-1);
                }}
              >
                {" "}
                <i className="bi bi-chevron-left"></i> Dashboard{" "}
              </a>
            ) : (
              <Link to={nav.head.page}>
                <i className="bi bi-chevron-left"></i> {nav.head.name}
              </Link>
            )}
          </div>
        )}
        {nav.items.map((group) => (
          <ul
            key={group.name}
            className={
              styles.menuGroup +
              " " +
              (group.name == "" ? styles.menuGroupInvisible : "")
            }
          >
            <label>{group.name}</label>
            {group.items.map((item) => (
              <li
                key={item.name}
                className={styles.menuItem + " " + item.classNames}
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
