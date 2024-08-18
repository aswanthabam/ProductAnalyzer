import {
  APIResponse,
  privateGatewayGET,
  privateGatewayPOST,
} from "../../../services/apiGateway";

export type Product = {
  name: string;
  product_id: string;
  description: string;
  base_url: string;
};
export type ProductInfo = {
  id: string;
} & Product;

export type ProductCreateResponse = APIResponse<{
  product_id: string;
}>;

export type ProductInfoResponse = APIResponse<ProductInfo[]>;
export const getProducts = async () => {
  return privateGatewayGET<ProductInfoResponse>("/api/dashboard/products/list");
};

export const createProduct = async (data: Product) => {
  return privateGatewayPOST<ProductCreateResponse>(
    "/api/dashboard/products/create",
    data
  );
};
