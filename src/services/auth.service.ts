import axios from "axios";
import { Alert } from "react-native";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import RegisterFormType from "../types/registerForm.type";
import { EndPoint } from "../utils/EndPoint";
import { getFromStorage, KEY_SECURE, removeAllFromStorage, setToStorage } from "./secureStore.service";
import { ResponseAuthentication, User } from "../types/user.type";
import LoginFormType from "../types/loginForm.type";

import { UnAuthorizationError } from "../utils/error";

export const loginApi = async (data: LoginFormType): Promise<{ user: User; accessToken: string }> => {
	try {
		const result = await axiosInstance.post<ApiResponse<ResponseAuthentication>>(EndPoint.LOGIN, data);
		const { user, access_token } = result.data.data;
		return {
			user,
			accessToken: access_token,
		};
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || "An error occurred";
			Alert.alert("Lỗi đăng nhập", errorMessage);
		} else {
			Alert.alert("Error", "An unexpected error occurred");
		}
		throw error;
	}
};

export const registerApi = async (data: RegisterFormType): Promise<void> => {
	try {
		await axiosInstance.post(EndPoint.REGISTER, data);
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || "An error occurred";
			Alert.alert("Lỗi đăng ký", error.response?.data?.message);
		} else {
			Alert.alert("Error", "An unexpected error occurred");
		}
		throw error;
	}
};

export const logoutApi = async (): Promise<void> => {
	try {
		await axiosInstance.post(EndPoint.LOGOUT);
		await removeAllToken();
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || "An error occurred";
			Alert.alert("Lỗi đăng xuất", errorMessage);
		}
		console.log("Error logging out", error);
		throw error;
	}
};

export const getUserInfo = async (): Promise<User> => {
	try {
		const result = await axiosInstance.get<ApiResponse<User>>(EndPoint.ACCOUNT);
		const user: User = result.data.data;
		return user;
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
