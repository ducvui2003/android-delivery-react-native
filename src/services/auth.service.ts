import axiosInstance, { ApiResponse, setCookie } from "../configs/axios/axios.config";
import { EndPoint } from "../utils/EndPoint";
import { getFromStorage, KEY_SECURE, removeAllFromStorage, setToStorage } from "./secureStore.service";
import { ResponseAuthentication, User } from "../types/user.type";
import LoginFormType from "../types/loginForm.type";

import { UnAuthorizationError } from "../utils/error";

export const loginApi = async (data: LoginFormType): Promise<{ user: User; accessToken: string }> => {
	const result = await axiosInstance.post<ApiResponse<ResponseAuthentication>>(EndPoint.LOGIN, data);
	const { user, access_token } = result.data.data;
	return {
		user,
		accessToken: access_token,
	};
};

export const logoutApi = async (): Promise<void> => {
	const instance = axiosInstance;
	const refresh = await getRefreshToken();
	const access = await getAccessToken();
	setCookie("refresh_token", refresh, instance);
	setCookie("access_token", access, instance);
	await instance.post(EndPoint.LOGOUT);
	await removeAllToken();
};

export const getUserInfo = async (): Promise<User> => {
	try {
		const result = await axiosInstance.get<ApiResponse<User>>(EndPoint.ACCOUNT);
		return result.data.data;
	} catch (error) {
		console.error("Error getting account", error);
		throw new UnAuthorizationError("User not found");
	}
};

export const getAccessToken = async (): Promise<string | null> => {
	const accessToken = await getFromStorage(KEY_SECURE.ACCESS_TOKEN);
	if (accessToken === null) return null;
	return accessToken;
};

export const setAccessToken = async (accessToken: string): Promise<void> => {
	await setToStorage(KEY_SECURE.ACCESS_TOKEN, accessToken);
};

export const setRefreshToken = async (refreshToken: string): Promise<void> => {
	await setToStorage(KEY_SECURE.REFRESH_TOKEN, refreshToken);
};

export const removeAllToken = async (): Promise<void> => {
	await removeAllFromStorage();
};

export const getRefreshToken = async (): Promise<string | null> => {
	const refreshToken = await getFromStorage(KEY_SECURE.REFRESH_TOKEN);
	if (refreshToken === null) return null;
	return refreshToken;
};
