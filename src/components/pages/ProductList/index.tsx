import { ProductInfo } from "../../../utils/types";
import ProductModal from "../ProductModal";
import styles from "./styles.module.css";

const ProductList = ({ products }: { products: ProductInfo[] }) => {
  return (
    <div className={styles.products}>
      {products?.map((product) => (
        <ProductModal product={product} />
      ))}
    </div>
  );
};
export default ProductList;
