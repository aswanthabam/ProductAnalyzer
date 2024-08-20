import { APIResponse, privateGatewayPOST } from "../../../services/apiGateway";

export const logout = async (refresh_token: string, all = false) => {
  return await privateGatewayPOST<APIResponse<{}>>("/api/user/auth/logout", {
    refresh_token,
    all,
  });
};
