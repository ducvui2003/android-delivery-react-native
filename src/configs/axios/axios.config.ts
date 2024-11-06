/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 11:33am
 * User: ducvui2003
 **/
import axios, {AxiosError, AxiosInstance, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig} from "axios";
import {getFromStorage, KEY_SECURE, setToStorage} from "../../services/secureStore.service";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL_BACK_END,
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

interface ApiResponseError {
	statusCode: number;
	error?: string;
	message: string;
}

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	try {
		const token = await getFromStorage(KEY_SECURE.ACCESS_TOKEN);
		if (token != null) config.headers.Authorization = `Bearer ${token}`;
	} catch (error) {
		console.error("API request error:", error);
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		switch (response.data.statusCode) {
			case HttpStatusCode.Ok:
				const cookies = response.headers["set-cookie"];
				cookies?.forEach((cookies: string) => {
					if (cookies.startsWith(KEY_SECURE.REFRESH_TOKEN)) {
						const refreshToken = cookies.substring("refresh_token".length + 1);
						setToStorage(KEY_SECURE.REFRESH_TOKEN, refreshToken).then();
					}
				});
				break;
			case HttpStatusCode.BadRequest:
				console.error("Bad request", response.data.data);
				break;
			default:
				console.warn(response.data);
				break;
		}
		return response;
	},
	(error: AxiosError<ApiResponseError>) => {
		if (axios.isAxiosError(error)) {
			switch (error.response?.status) {
				case HttpStatusCode.Unauthorized:
					console.error("Unauthorized");
					break;
				case HttpStatusCode.Forbidden:
					console.error("Forbidden");
					break;
			}
		} else
			console.log("Unexpected error:", error);
		return Promise.reject(error);
	}
);

export default axiosInstance;
export {ApiResponse};
