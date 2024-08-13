/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 11:33am
 * User: ducvui2003
 **/
import axios, {AxiosInstance, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig,} from "axios";
import {getToken, setItem} from "../../services/secureStore.service";

const axiosInstance: AxiosInstance =
    axios.create({
        baseURL: process.env.EXPO_PUBLIC_BASE_URL_BACK_END_WIFI_LAM_NGUYEN,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });


interface ApiResponse<T> {
    statusCode: number;
    error?: string;
    message: string;
    data: T;
}

axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const token = await getToken("ACCESS_TOKEN");
            if (token != null) config.headers.Authorization = `Bearer ${token}`;
            return config;
        } catch (error) {
            // Network Error
            console.error("API request error:", error);
            return Promise.reject(error);
        }
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        switch (response.data.statusCode) {
            case HttpStatusCode.Ok:
                const cookies = response.headers["set-cookie"];
                cookies?.forEach((cookies: string) => {
                    if (cookies.startsWith("refresh_token")) {
                        const refreshToken = cookies.substring("refresh_token".length + 1);
                        setItem("REFRESH_TOKEN", refreshToken);
                    }
                })
                return response.data;
            case HttpStatusCode.BadRequest:
                console.error("Bad request", response.data.data)
                break;
            default:
                console.warn(response.data)
                break;
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
            console.error("API response error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
export {ApiResponse};
