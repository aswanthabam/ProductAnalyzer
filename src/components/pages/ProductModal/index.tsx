import { useNavigate } from "react-router-dom";
import { ProductInfo } from "../../../utils/types";
import styles from "./styles.module.css";

const ProductModal = ({ product }: { product: ProductInfo }) => {
  const redirect = useNavigate();
  return (
    <div
      key={product.id}
      className={styles.product}
      onClick={() => {
        redirect(`/dashboard/product/${product.product_id}`);
      }}
    >
      <div className={styles.container}>
        <a className="indirect-link" href={product.base_url}>
          {product.base_url.replace("http://", "").replace("https://", "")}{" "}
          <i className="bi bi-box-arrow-up-right"></i>
        </a>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </div>
      <div className={styles.actions}>
        <i className={styles.openIcon + " bi bi-box-arrow-in-right"}></i>
      </div>
    </div>
  );
};
export default ProductModal;
