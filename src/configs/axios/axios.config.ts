/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 11:33am
 * User: ducvui2003
 **/
import axios, { AxiosError, AxiosInstance, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import {
	getAccessToken,
	getRefreshToken,
	removeAllToken,
	setAccessToken,
	setRefreshToken,
} from "../../services/auth.service";
import { ResponseAuthentication } from "../../types/user.type";
import { isRequestWhitelisted } from "./whitelist";
import store from "../redux/store.config";
import { setLoading } from "../../hooks/redux/modal.slice";

let isRefreshing = false;
let failedQueue: Array<any> = [];

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL_BACK_END,
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
	withCredentials: true,
});

const axiosInstanceInternal: AxiosInstance = axios.create({
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
	store.dispatch(setLoading(true));
	try {
		// Log the URL before the request is sent
		console.log("Request Full URL:", (config.baseURL ?? "") + config.url);
		// You can log other details here if needed
		console.log("Request Method:", config.method);
		console.log("Request Endpoint:", config.url);
		const isWhitelist = isRequestWhitelisted(config.url ?? "");
		console.log("Whitelist", isWhitelist);

		if (!isWhitelist) {
			const token = await getAccessToken();
			console.log("Get access token success", token);
			if (token != null) config.headers.Authorization = `Bearer ${token}`;
		} else {
			delete config.headers.Authorization;
		}
	} catch (error) {
		console.error("API request error:", error);
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		store.dispatch(setLoading(false));
		const refreshToken: string | null = getCookie("refresh_token", response);
		if (refreshToken) setRefreshToken(refreshToken);
		return response;
	},
	(error: AxiosError<ApiResponseError>) => {
		store.dispatch(setLoading(false));
		const originalRequest = error.config;
		if (originalRequest != null && axios.isAxiosError(error)) {
			switch (error.response?.status) {
				case HttpStatusCode.Unauthorized:
					console.error(`Token expired`);
					if (!isRefreshing) {
						isRefreshing = true;
						return new Promise((resolve, reject) => {
							exchangeAccessTokenInternal()
								.then(newAccessToken => {
									console.info(`Set new access token success, retry ${originalRequest.url}`);
									setAccessToken(newAccessToken);
									resolve(axiosInstance(originalRequest));
								})
								.catch(err => {
									if (err.statusCode == HttpStatusCode.Unauthorized) {
										removeAllToken();
									}
									console.error(`Set new access token failed`);
									reject(err);
								})
								.finally(() => {
									processQueue(null);
									isRefreshing = false;
								});
						});
					}
					break;
				case HttpStatusCode.Forbidden:
					console.error("Forbidden");
					break;
			}
		} else console.log("Unexpected error:", error);
		return Promise.reject(error);
	}
);

const getCookie = (name: string, response: AxiosResponse): string | null => {
	const cookies = response.headers["set-cookie"];
	if (cookies) {
		for (const cookie of cookies) {
			if (cookie.startsWith(name)) {
				return cookie.substring("refresh_token".length + 1);
			}
		}
	}
	return null;
};

const setCookie = (name: string, value: string | null, instance: AxiosInstance): void => {
	if (value === null) return;
	const cookie = `${name}=${value}`;
	instance.interceptors.request.use(config => {
		if (config.headers["Cookie"]) {
			config.headers["Cookie"] += `; ${cookie}`;
		} else {
			config.headers["Cookie"] = cookie;
		}
		return config;
	});
};

const exchangeAccessTokenInternal = async (): Promise<string> => {
	try {
		const cookie: string | null = await getRefreshToken();
		if (cookie) setCookie("refresh_token", cookie, axiosInstanceInternal);
		const result = await axiosInstanceInternal.post<ApiResponse<ResponseAuthentication>>("/refresh-token");

		// @ts-ignore
		const token = result.data.data?.access_token;
		if (!token) {
			throw new Error("Access token is missing in the response");
		}
		return token;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			switch (error.response?.status) {
				case HttpStatusCode.Unauthorized:
					console.error("Unauthorized: The refresh token is invalid");
					break;
				default:
					console.error("Axios error", error.message);
			}
		} else {
			console.error("Unexpected error occurred while refreshing token");
		}
		throw error;
	}
};

const processQueue = (error: any) => {
	failedQueue.forEach(request => {
		if (!error) {
			request.resolve(axiosInstance(request.originalRequest));
		} else {
			request.reject(error);
		}
	});

	failedQueue = [];
};

export default axiosInstance;
export { ApiResponse, setCookie };
