import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { Cart } from "../types/cart.type";
import { EndPoint } from "../utils/EndPoint";

const getCartItems = async (): Promise<Cart[]> => {
	try {
		const response = await axiosInstance.get<ApiResponse<Cart[]>>(EndPoint.GET_CARTS);
		return response.data.data ?? [];
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const addCart = async ({
	productId,
	quantity,
	optionIds,
}: {
	productId: string;
	quantity: number;
	optionIds: [];
}): Promise<Cart> => {
	try {
		const response = await axiosInstance.post(EndPoint.ADD_CART, { productId, quantity, optionIds });
		return response.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const increaseCart = async (cartId: number): Promise<void> => {
	try {
		const response = await axiosInstance.post(`${EndPoint.INCREASE_CART}/${cartId}`);
		return response.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const decreaseCart = async (cartId: number): Promise<void> => {
	try {
		const response = await axiosInstance.post(`${EndPoint.DECREASE_CART}/${cartId}`);
		return response.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const deleteCart = async (cartId: number): Promise<void> => {
	try {
		const response = await axiosInstance.post(`${EndPoint.DELETE_CART}/${cartId}`);
		return response.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export default { getCartItems, addCart, increaseCart, decreaseCart, deleteCart };
