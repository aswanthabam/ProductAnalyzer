import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavbar } from "../../../context/NavbarContext";
import { backItem, productMenu } from "../../../menu/menu";
import { getProductInfo } from "./api";
import DefaultLoader from "../../../components/loaders/DefaultLoader/DefaultLoader";
import { ProductInfo } from "../../../utils/types";
import ProductModal from "../../../components/pages/ProductModal";

const DashboardProduct = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const { setNav } = useNavbar();
  useEffect(() => {
    setNav(productMenu(productId ?? "", backItem));
    setLoading(true);
    getProductInfo(productId ?? "").then((res) => {
      setLoading(false);
      if (res.status === "success") {
        setProductInfo(res.data);
      } else {
        setProductInfo(null);
      }
    });
  }, [productId]);

  return (
    <div className={styles.container}>
      <DefaultLoader visible={loading} />

      {productInfo ? (
        <>
          <h2 className={styles.title}>{productInfo.name} - Dashboard</h2>
          <div className={styles.productSection}>
            <h3 className={styles.subTitleMotivation}>
              You made a great progress this month 🚀
            </h3>
            <span className={styles.subTitle}>
              Here is the summary of your product performance for July 2024.
            </span>
            <div className={styles.productBaseData}>
              <div className={styles.productBaseDataItem}>
                <span className={styles.head}>10M</span>
                <span className={styles.subHead}>Total Unique Visitors</span>
              </div>
              <div className={styles.productBaseDataItem}>
                <span className={styles.head}>50 Lakh</span>
                <span className={styles.subHead}>New visitors this month</span>
              </div>
              <div className={styles.productBaseDataItem}>
                <span className={styles.head}>32%</span>
                <span className={styles.subHead}>
                  Increase in visitors count
                </span>
              </div>
              <div className={styles.productBaseDataItem}>
                <h3>Premium Plans Page</h3>
                <p>Most Visited</p>
              </div>
            </div>
            <div className={styles.productGraph}>
              <img src="/pngaaa.com-511596.png" alt="product" />
            </div>
          </div>
        </>
      ) : (
        <h1>Product not found</h1>
      )}
    </div>
  );
};

export default DashboardProduct;
