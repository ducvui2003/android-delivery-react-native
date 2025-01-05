import axios from "axios";
import { Alert } from "react-native";
import axiosInstance from "../configs/axios/axios.config";
import RegisterFormType from "../types/registerForm.type";
import { EndPoint } from "../utils/EndPoint";
import { getFromStorage, KEY_SECURE } from "./secureStore.service";

export const isLogin = async (): Promise<void> => {
	const accessToken = await getFromStorage(KEY_SECURE.ACCESS_TOKEN);
	if (accessToken !== null) return;
	throw new Error("Not logged in");
};

// export const loginApi = async (data: LoginFormType): Promise<User> => {
// 	try {
// 		const result = await axiosInstance.post<ApiResponse<ResponseAuthentication>>(EndPoint.LOGIN, data);
// 		await setToStorage(KEY_SECURE.ACCESS_TOKEN, result.data.data.accessToken);
// 		console.log("Save access token successfully");
// 		return result.data.data.user;
// 	} catch (error: unknown) {
// 		if (axios.isAxiosError(error)) {
// 			const errorMessage = error.response?.data?.message || "An error occurred";
// 			Alert.alert("Lỗi đăng nhập", errorMessage);
// 		} else {
// 			console.log(error);
// 			Alert.alert("Error", "An unexpected error occurred");
// 		}

// 		throw error;
// 	}
// };

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

// export const logout = async (): Promise<void> => {
// 	try {
// 		await removeFromStorage(KEY_SECURE.ACCESS_TOKEN);
// 		await removeFromStorage(KEY_SECURE.REFRESH_TOKEN);
// 	} catch (error) {
// 		Alert.alert("Error", "An unexpected error occurred");
// 		throw error;
// 	}
// };
