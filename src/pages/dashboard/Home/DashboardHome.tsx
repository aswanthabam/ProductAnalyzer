import { useEffect, useState } from "react";
import styles from "./DashboardHome.module.css";
import { getProducts } from "./api";
import { useToast } from "../../../context/ToastContext";
import { useDialog } from "../../../context/DialogContext";
import CreateProduct from "../../../components/form/CreateProduct/CreateProduct";
import { useRefresh } from "../../../context/RefreshContext";
import DefaultLoader from "../../../components/loaders/DefaultLoader/DefaultLoader";
import { ProductInfo } from "../../../utils/types";
import ProductList from "../../../components/pages/ProductList";
import { useNavbar } from "../../../context/NavbarContext";
import { mainMenu } from "../../../menu/menu";
// import { useNavbar } from "../../../context/NavbarContext";
// import { productMenu } from "../../../menu/menu";

const DashboardHome = () => {
  const { showToast } = useToast();
  const { showDialog } = useDialog();
  const { refresh } = useRefresh();
  const [products, setProducts] = useState<ProductInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const setNav = useNavbar().setNav;
  useEffect(() => {
    setNav(mainMenu);
    fetchProducts();
  }, []);
  useEffect(() => {
    if (refresh === "products") {
      fetchProducts();
    }
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
      <ProductList products={products || []} />
    </div>
  );
};

export default DashboardHome;
