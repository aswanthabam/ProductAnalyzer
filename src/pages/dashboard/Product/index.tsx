import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect } from "react";
import { useNavbar } from "../../../context/NavbarContext";
import { backItem, productMenu } from "../../../menu/menu";

const DashboardProduct = () => {
  const { productId } = useParams();
  const { setNav } = useNavbar();
  useEffect(() => {
    setNav(productMenu(productId ?? "", backItem));
  }, [productId]);
  return (
    <div className={styles.container}>
      <h1>Dashboard Product</h1>
      <p>Product ID: {productId}</p>
    </div>
  );
};

export default DashboardProduct;
