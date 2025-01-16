import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import OrderType from "../types/order.type";
import OrderDetailType from "../types/orderDetail.type";
import { EndPoint } from "../utils/EndPoint";

type OrderSearchType = {
	status: string | null;
	star: number | null | string;
	page: number | null;
	limit: number | null;
};

export const getOrders = async (
	{ status, star, page, limit }: OrderSearchType,
	isAdmin: boolean = false
): Promise<OrderType[] | undefined> => {
	try {
		let response;
		status = status === "ALL" ? null : status;
		star = star === "ALL" ? null : star;

		if (star) {
			response = await axiosInstance.get<ApiResponse<OrderType[]>>(
				isAdmin ? EndPoint.GET_ORDERS_ADMIN : EndPoint.GET_ORDERS,
				{
					params: {
						status,
						star,
						page,
						limit,
					},
				}
			);
		} else
			response = await axiosInstance.get<ApiResponse<OrderType[]>>(EndPoint.GET_ORDERS, {
				params: {
					status,
					page,
					limit,
				},
			});
		if (response.data.data) {
			return response.data.data;
		}
		return undefined;
	} catch (error) {
		console.error("Error while fetching orders", error);
		throw error;
	}
};

export const getOrderDetail = async (id: number | string): Promise<OrderDetailType | undefined> => {
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

export const updateOrderStatus = async (id: string, status: string): Promise<void> => {
	try {
		await axiosInstance.put<OrderType>(`${EndPoint.UPDATE_ORDER_STATUS}/${id}`, {
			status,
		});
	} catch (error) {
		console.error("Error while updating order status", error);
		throw error;
	}
};
