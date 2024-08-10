/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 11:33 am
 * User: ducvui2003
 **/
import axios, {
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import { getItem } from "./secureStore.service";

const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL_BACK_END,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

interface ApiResponse<T> {
  statusCode: number;
  error: string;
  message: object;
  data: T;
}

apiInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      console.log("config: ", config);
      const token = await getItem("ACCESS_TOKEN");
      if (token != null) config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      // Network Error
      console.error("API error:", error);
      return Promise.reject(error);
    }
  }
);

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    switch (response.data.statusCode) {
      case HttpStatusCode.NotFound:
        break;
      case HttpStatusCode.Unauthorized:
        // Tiến hành gửi lại refresh token
        break;
      case HttpStatusCode.BadRequest:
        break;
      case HttpStatusCode.Forbidden:
        break;
      default:
        return response.data;
    }
  },
  (error) => {
    //Network
    if (!error.response) {
      console.log("Network Error:", error.message);
    }
    // Timeout
    if (error.code === "ECONNABORTED")
      console.log("Request timed out:", error.message);
    //Error from server
    if (error.response && error.response.status >= 400)
      console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default apiInstance;
