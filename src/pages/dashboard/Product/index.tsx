import { useParams } from "react-router-dom";
import styles from "./style.module.css";

const DashboardProduct = () => {
  const { productId } = useParams();
  return (
    <div className={styles.container}>
      <h1>Dashboard Product</h1>
      <p>Product ID: {productId}</p>
    </div>
  );
};

export default DashboardProduct;
