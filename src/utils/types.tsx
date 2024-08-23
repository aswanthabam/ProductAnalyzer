export type Product = {
  name: string;
  product_id: string;
  description: string;
  base_url: string;
};
export type ProductInfo = {
  id: string;
} & Product;
