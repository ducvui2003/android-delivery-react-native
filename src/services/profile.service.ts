import axiosInstance from "../configs/axios/axios.config";
import { EndPoint } from "../utils/EndPoint";
import axios from "axios";
import { Alert } from "react-native";
import ChangeProfile from "../types/changeProfile";

export const updateProfileAPI = async (data: ChangeProfile) => {
	try {
		const response = await axiosInstance.put(EndPoint.UPDATE_PROFILE, data);
		return response.data.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || "An error occurred";
			Alert.alert("Lỗi cập nhật", errorMessage);
		} else {
			Alert.alert("Error", "An unexpected error occurred");
		}
		throw error;
	}
}