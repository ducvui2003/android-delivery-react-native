import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { Cart } from "../types/cart.type";
import { EndPoint } from "../utils/EndPoint";

const getCartItems = async (): Promise<Cart[]> => {
	try {
		const response = await axiosInstance.get<ApiResponse<Cart[]>>(EndPoint.GET_CARTS);
		return response.data.data ?? [];
	} catch (e) {
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
	optionIds: string[];
}): Promise<Cart> => {
	try {
		const response = await axiosInstance.post<ApiResponse<Cart>>(EndPoint.ADD_CART, {
			productId,
			quantity,
			optionIds,
		});
		return response.data.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const increaseCart = async (cartId: number): Promise<void> => {
	try {
		await axiosInstance.put<ApiResponse<void>>(`${EndPoint.INCREASE_CART}/${cartId}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const decreaseCart = async (cartId: number): Promise<void> => {
	try {
		await axiosInstance.put<ApiResponse<void>>(`${EndPoint.DECREASE_CART}/${cartId}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
};

const deleteCart = async (cartId: number): Promise<void> => {
	try {
		await axiosInstance.delete<ApiResponse<void>>(`${EndPoint.DELETE_CART}/${cartId}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export default { getCartItems, addCart, increaseCart, decreaseCart, deleteCart };
