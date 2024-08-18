import { useEffect, useState } from "react";
import styles from "./DashboardHome.module.css";
import { getProducts, ProductInfo } from "./api";
import { useToast } from "../../../context/ToastContext";
import { useDialog } from "../../../context/DialogContext";
import CreateProduct from "../../../components/form/CreateProduct/CreateProduct";
import { useRefresh } from "../../../context/RefreshContext";
import DefaultLoader from "../../../components/loaders/DefaultLoader/DefaultLoader";
import { useNavbar } from "../../../context/NavbarContext";
import { productMenu } from "../../../menu/menu";

const DashboardHome = () => {
  const { showToast } = useToast();
  const { showDialog } = useDialog();
  const { refresh } = useRefresh();
  const [products, setProducts] = useState<ProductInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  // const setNav = useNavbar().setNav;
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (refresh === "products") {
      fetchProducts();
    }
    // setNav(
    //   productMenu("james", {
    //     name: "James",
    //     page: "/dashboard/home",
    //     icon: <i className="bi bi-house-door-fill"></i>,
    //   })
    // );
  }, [refresh]);
  const fetchProducts = async () => {
    setLoading(true);
    await getProducts().then((res) => {
      if (res.status === "success") {
        setProducts(res.data);
      } else {
        showToast(res.message, 3000);
      }
    });
    setLoading(false);
  };

  const showCreateProductPopup = () => {
    showDialog(<CreateProduct />);
  };
  return (
    <div className={styles.container}>
      <h3>Your Products</h3>
      <div className={styles.quickActions}>
        <button
          className={styles.newProductButton}
          onClick={showCreateProductPopup}
        >
          <i className="bi bi-plus-circle-fill"></i>
          New Product
        </button>
      </div>
      <DefaultLoader visible={loading} />
      <div className={styles.products}>
        {products?.map((product) => (
          <div key={product.id} className={styles.product}>
            <div className={styles.container}>
              <a className="indirect-link" href={product.base_url}>
                {product.base_url
                  .replace("http://", "")
                  .replace("https://", "")}{" "}
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
            </div>
            <div className={styles.actions}>
              <i className={styles.openIcon + " bi bi-box-arrow-in-right"}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
