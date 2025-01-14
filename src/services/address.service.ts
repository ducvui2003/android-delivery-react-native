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

export const getAllAddress = async (): Promise<MyLocation[]> => {
	const result = await axiosInstance.get<ApiResponse<MyLocation[]>>(EndPoint.ADDRESS);
	return result.data.data;
};
