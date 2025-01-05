/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 11:33am
 * User: ducvui2003
 **/
import axios, { AxiosError, AxiosInstance, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { isRequestWhitelisted } from "./whitelist";
import { getAccessToken, setRefreshToken } from "../../services/auth.service";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL_BACK_END,
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
	withCredentials: true,
});

interface ApiResponse<T> {
	statusCode: number;
	error?: string;
	message: string;
	data: T;
}

interface ApiResponseError {
	statusCode: number;
	error?: string;
	message: string;
}

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	try {
		// Log the URL before the request is sent
		console.log("Request URL:", (config.baseURL ?? "") + config.url);

		// You can log other details here if needed
		console.log("Request Method:", config.method);

		if (!isRequestWhitelisted(config.url ?? "")) {
			const token = await getAccessToken();
			if (token != null) config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (error) {
		console.error("API request error:", error);
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		switch (response.status) {
			case HttpStatusCode.Ok:
				const cookies = response.headers["set-cookie"];
				cookies?.forEach((cookies: string) => {
					if (cookies.startsWith("refresh_token")) {
						const refreshToken = cookies.substring("refresh_token".length + 1);
						setRefreshToken(refreshToken);
					}
				});
				break;
			case HttpStatusCode.BadRequest:
				console.error("Bad request", response);
				break;
			default:
				console.log("Response status:", response.status);
				console.log(response);
				break;
		}
		return response;
	},
	(error: AxiosError<ApiResponseError>) => {
		if (axios.isAxiosError(error)) {
			switch (error.response?.status) {
				case HttpStatusCode.Unauthorized:
					// console.error("Unauthorized");
					break;
				case HttpStatusCode.Forbidden:
					console.error("Forbidden");
					break;
			}
		} else console.log("Unexpected error:", error);
		return Promise.reject(error);
	}
);

export default axiosInstance;
export { ApiResponse };
