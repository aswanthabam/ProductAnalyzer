import { APIResponse, privateGatewayGET } from "../../../services/apiGateway";

export type UserInfo = APIResponse<{
  id: string;
  fullname: string;
  email_verified: boolean;
}>;
export const getUserInfo = async () => {
  return privateGatewayGET<UserInfo>("/api/user/profile/info");
};
