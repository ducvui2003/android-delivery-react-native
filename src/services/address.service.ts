/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:25 PM - 14/01/2025
 * User: lam-nguyen
 **/
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { EndPoint } from "../utils/EndPoint";
import { MyLocation } from "../../assets/data/location/location";
import store from "../configs/redux/store.config";
import { updateAddress } from "../hooks/redux/auth.slice";

export const getAllAddress = async (): Promise<MyLocation[]> => {
	const result = await axiosInstance.get<ApiResponse<MyLocation[]>>(EndPoint.ADDRESS);
	return result.data.data;
};

export const updateDefaultAddress = async (id: number): Promise<MyLocation> => {
	const result = await axiosInstance.put<ApiResponse<MyLocation>>(EndPoint.ADDRESS + "/" + id);
	store.dispatch(updateAddress(result.data.data));
	return result.data.data;
};
