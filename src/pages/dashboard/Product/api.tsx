import { APIResponse, privateGatewayGET } from "../../../services/apiGateway";
import { ProductInfo } from "../../../utils/types";

export type ProductInfoResponse = APIResponse<ProductInfo>;

export const getProductInfo = async (product_id: string) => {
  return privateGatewayGET<ProductInfoResponse>(
    `/api/dashboard/products/info?product_id=${product_id}`
  );
};
