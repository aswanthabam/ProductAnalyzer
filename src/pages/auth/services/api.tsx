import {
  APIResponse,
  privateGatewayPOST,
  publicGatewayPOST,
} from "../../../services/apiGateway";

export type RegisterResponse = APIResponse<{
  access_token: string;
}>;

export const register = async (
  fullname: string,
  email: string,
  password: string
) => {
  return await publicGatewayPOST<RegisterResponse>("/api/user/auth/register", {
    fullname,
    email,
    password,
  });
};

export type LoginResponse = APIResponse<{
  access_token: string;
}>;

export const login = async (email: string, password: string) => {
  return await publicGatewayPOST<LoginResponse>("/api/user/auth/login", {
    email,
    password,
  });
};

export type EmailValidationResponse = APIResponse<{}>;

export const validateEmail = async (otp: string) => {
  var formData = new FormData();
  formData.append("otp", otp);
  return await privateGatewayPOST<EmailValidationResponse>(
    "/api/user/auth/verify-email",
    formData
  );
};

export type ResendEmailResponse = APIResponse<{}>;

export const resendEmail = async () => {
  var res = await privateGatewayPOST<ResendEmailResponse>(
    "/api/user/auth/resend-otp",
    {
      scope: "email_verification",
    }
  );
  console.log(res);
  return res;
};
