import axios, { AxiosInstance } from "axios";

export type APIResponse<T> = {
  status: "success" | "failed";
  message: string;
  data: T;
};

export type APIError = {
  message: string;
  status: "failed";
};

export const publicGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});
export type TokenResponse = APIResponse<{
  access_token: string;
  refresh_token: string;
}>;
privateGateway.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response?.data?.status === "failed") {
      if (error.response.data.code === 1001) {
        console.log("Token expired, redirecting to login page");
        var refToken = localStorage.getItem("refreshToken");
        if (refToken) {
          var res = await publicGatewayPOST<TokenResponse>(
            `/api/user/auth/get-access-token`,
            {
              refresh_token: refToken,
            }
          ).then((res) => {
            if (res.status === "success") {
              localStorage.setItem("accessToken", res.data.access_token);
              localStorage.setItem("refreshToken", res.data.refresh_token);
              console.log("Token refreshed, retrying the request");
              return privateGateway.request(error.config);
            } else {
              console.log("Failed to refresh token, redirecting to login page");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              return Promise.reject(error);
            }
          });
          return res;
        }
      }
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor
privateGateway.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const publicGatewayPOST = async <T,>(
  url: string,
  data: any
): Promise<T | APIError> => {
  return GatewayPOST<T>(url, data, publicGateway);
};

export const privateGatewayPOST = async <T,>(
  url: string,
  data: any
): Promise<T | APIError> => {
  return GatewayPOST<T>(url, data, privateGateway);
};

export const publicGatewayGET = async <T,>(
  url: string
): Promise<T | APIError> => {
  return GatewayGET<T>(url, publicGateway);
};

export const privateGatewayGET = async <T,>(
  url: string
): Promise<T | APIError> => {
  return GatewayGET<T>(url, privateGateway);
};

export const publicGatewayDELETE = async <T,>(
  url: string
): Promise<T | APIError> => {
  return GatewayDELETE<T>(url, publicGateway);
};

export const privateGatewayDELETE = async <T,>(
  url: string
): Promise<T | APIError> => {
  return GatewayDELETE<T>(url, privateGateway);
};

export const publicGatewayPUT = async <T,>(
  url: string,
  data: any
): Promise<T | APIError> => {
  return GatewayPUT<T>(url, data, publicGateway);
};

export const privateGatewayPUT = async <T,>(
  url: string,
  data: any
): Promise<T | APIError> => {
  return GatewayPUT<T>(url, data, privateGateway);
};

export const GatewayPOST = async <T,>(
  url: string,
  data: any,
  client: AxiosInstance
): Promise<T | APIError> => {
  try {
    const response = await client.post(url, data);
    return response.data as T;
  } catch (error: any) {
    if (error.response?.data?.status === "failed") {
      return error.response.data as T;
    } else {
      return {
        message: "An error occurred!",
        status: "failed",
      };
    }
  }
};

export const GatewayGET = async <T,>(
  url: string,
  client: AxiosInstance
): Promise<T | APIError> => {
  try {
    const response = await client.get(url);
    return response.data as T;
  } catch (error: any) {
    if (error.response?.data?.status === "failed") {
      return error.response.data as T;
    } else {
      return {
        message: "An error occurred!",
        status: "failed",
      };
    }
  }
};

export const GatewayDELETE = async <T,>(
  url: string,
  client: AxiosInstance
): Promise<T | APIError> => {
  try {
    const response = await client.delete(url);
    return response.data as T;
  } catch (error: any) {
    if (error.response?.data?.status === "failed") {
      return error.response.data as T;
    } else {
      return {
        message: "An error occurred!",
        status: "failed",
      };
    }
  }
};

export const GatewayPUT = async <T,>(
  url: string,
  data: any,
  client: AxiosInstance
): Promise<T | APIError> => {
  try {
    const response = await client.put(url, data);
    return response.data as T;
  } catch (error: any) {
    if (error.response?.data?.status === "failed") {
      return error.response.data as T;
    } else {
      return {
        message: "An error occurred!",
        status: "failed",
      };
    }
  }
};
