import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import OrderType from "../types/order.type";
import OrderDetailType from "../types/orderDetail.type";
import { EndPoint } from "../utils/EndPoint";

export const getOrders = async (): Promise<OrderType[] | undefined> => {
	try {
		const response = await axiosInstance.get<ApiResponse<OrderType[]>>(EndPoint.GET_ORDERS);
		if (response.data.data) {
			return response.data.data;
		}
		return undefined;
	} catch (error) {
		console.error("Error while fetching orders", error);
		throw error;
	}
};

export const getOrderDetail = async (id: string): Promise<OrderDetailType | undefined> => {
	try {
		const response = await axiosInstance.get<ApiResponse<OrderDetailType>>(`${EndPoint.GET_ORDER_DETAIL}/${id}`);
		if (response.data.data) {
			console.log("response", JSON.stringify(response.data.data, null, 2));

			return response.data.data;
		}
		return undefined;
	} catch (error) {
		console.error("Error while fetching order detail", error);
		throw error;
	}
};

export const createOrder = async (
	cartItemIds: number[],
	promotionShipId: string | null,
	promotionProductId: string | null,
	address: string,
	paymentMethod: string
): Promise<OrderType> => {
	try {
		const response = await axiosInstance.post<OrderType>(EndPoint.CREATE_ORDER, {
			cartItemIds,
			promotionShipId,
			promotionProductId,
			address,
			paymentMethod,
		});
		return response.data;
	} catch (error) {
		console.error("Error while creating order", error);
		throw error;
	}
};
