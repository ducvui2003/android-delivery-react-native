/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../../services/cart.service";
import { Cart } from "../../types/cart.type";

type CartState = {
	items: Cart[] | null;
};

const initialState: CartState = {
	items: null,
};

enum CartType {
	ROOT = "cart",
	GET_LIST = "cart/getList",
	GET_LIST_PENDING = "cart/getList/pending",
	GET_LIST_FULFILLED = "cart/getList/fulfilled",
	GET_LIST_REJECTED = "cart/getList/rejected",
	INCREASE = "cart/increase",
	INCREASE_PENDING = "cart/increase/pending",
	INCREASE_FULFILLED = "cart/increase/fulfilled",
	INCREASE_REJECTED = "cart/increase/rejected",
	DECREASE = "cart/decrease",
	DECREASE_PENDING = "cart/decrease/pending",
	DECREASE_FULFILLED = "cart/decrease/fulfilled",
	DECREASE_REJECTED = "cart/decrease/rejected",
	DELETE = "cart/delete",
	DELETE_PENDING = "cart/delete/pending",
	DELETE_FULFILLED = "cart/delete/fulfilled",
	DELETE_REJECTED = "cart/delete/rejected",
}

export const fetchCarts = createAsyncThunk(CartType.GET_LIST, async () => {
	try {
		const response = await cartService.getCartItems();
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error("Fetch cart failed");
	}
});

export const increaseCart = createAsyncThunk(CartType.INCREASE, async (cartId: number) => {
	try {
		await cartService.increaseCart(cartId);
		return {
			id: cartId,
			quantity: 1,
		};
	} catch (error: any) {
		throw new Error("Increase cart failed");
	}
});

export const decreaseCart = createAsyncThunk(CartType.DECREASE, async (cartId: number) => {
	try {
		await cartService.decreaseCart(cartId);
		return {
			id: cartId,
			quantity: 1,
		};
	} catch (error: any) {
		console.log(error);

		throw new Error("Increase cart failed");
	}
});

export const deleteCart = createAsyncThunk(CartType.DELETE, async (cartId: number) => {
	try {
		await cartService.deleteCart(cartId);
		return {
			id: cartId,
		};
	} catch (error: any) {
		throw new Error("Delete cart failed");
	}
});

const cartSlice = createSlice({
	name: CartType.ROOT,
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCarts.fulfilled, (state, action) => {
				console.log("Get cart success", action.payload);
				state.items = action.payload;
			})
			.addCase(fetchCarts.rejected, state => {
				console.log("Get cart failed");

				state.items = null;
			})
			.addCase(increaseCart.fulfilled, (state, action) => {
				const index = state.items?.findIndex(cart => cart.id === action.payload.id);
				if (state.items && index) {
					state.items[index].quantity += action.payload.quantity;
				}
			})
			.addCase(decreaseCart.fulfilled, (state, action) => {
				const index = state.items?.findIndex(cart => cart.id === action.payload.id);
				if (state.items && index) {
					state.items[index].quantity = action.payload.quantity;
				}
			})
			.addCase(deleteCart.fulfilled, (state, action) => {
				const index = state.items?.findIndex(cart => cart.id === action.payload.id);
				if (state.items && index) {
					delete state.items[index];
				}
			});
	},
});

export default cartSlice.reducer;

export { CartType as AuthType };
