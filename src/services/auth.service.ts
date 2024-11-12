import axios from "axios";
import {Alert} from "react-native";
import axiosInstance, {ApiResponse} from "../configs/axios/axios.config";
import RegisterFormType from "../types/registerForm.type";
import {EndPoint} from "../utils/EndPoint";
import {getFromStorage, KEY_SECURE, removeFromStorage, setToStorage} from "./secureStore.service";
import {ResponseAuthentication, User} from "../types/user.type";
import LoginFormType from "../types/loginForm.type";
import {
	KEY_ASYNC,
	removeFromStorage as asyncRemoveFromStorage,
	saveToStorage as asyncSetToStorage,
	getFromStorage as asyncGetFromStorage,
} from "./aysncStore.service";

export const isLogin = async (): Promise<void> => {
	const accessToken = await getFromStorage(KEY_SECURE.ACCESS_TOKEN);
	if (accessToken !== null) return;
	throw new Error("Not logged in");
};

export const loginApi = async (data: LoginFormType): Promise<{ user: User, accessToken: string }> => {
	const result = await axiosInstance.post<ApiResponse<ResponseAuthentication>>(EndPoint.LOGIN, data);
	const {user, access_token} = result.data.data;
	await setToStorage(KEY_SECURE.ACCESS_TOKEN, access_token);
	await asyncSetToStorage(KEY_ASYNC.USER, JSON.stringify(user));
	return {
		user,
		accessToken: access_token,
	};
};

export const registerApi = async (data: RegisterFormType): Promise<void> => {
	try {
		const result = await axiosInstance.post(EndPoint.REGISTER, data);
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || "An error occurred";
			Alert.alert("Lỗi đăng ký", error.response?.data?.message);
		} else {
			// Handle any other types of errors
			Alert.alert("Error", "An unexpected error occurred");
		}
		throw error;
	}
};

export const logoutApi = async (): Promise<void> => {
	try {
		await axiosInstance.post(EndPoint.LOGOUT);
		await removeFromStorage(KEY_SECURE.ACCESS_TOKEN);
		await removeFromStorage(KEY_SECURE.REFRESH_TOKEN);
		await asyncRemoveFromStorage(KEY_ASYNC.USER);
	} catch (error) {
		Alert.alert("Error", "An unexpected error occurred");
		console.log("Error logging out", error);
		throw error;
	}
};

export const getUserInfoApi = async (): Promise<User> => {
	const key = await asyncGetFromStorage(KEY_ASYNC.USER);
	if (key === null) throw new Error("User not found");
	return JSON.parse(key);
}