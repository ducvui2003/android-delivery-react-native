/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartService from "../../services/cart.service";
import { Cart, CartAdded } from "../../types/cart.type";
import { RootState } from "../../configs/redux/store.config";
import PaymentEnum from "../../utils/payment.enum";
import { MyLocation } from "../../../assets/data/location/location";

export const DEFAULT_QUANTITY_CHANGE = 1;
const DEFAULT_TIME_BETWEEN_CALLS = 5 * 60;

type CartState = {
	items: Cart[];
	lastTimeCalled?: Date;
	paymentMethod?: PaymentEnum;
	address?: MyLocation;
};

const initialState: CartState = {
	items: [],
};

enum CartType {
	ROOT = "cart",
	GET_LIST = "cart/getList",
	GET_LIST_PENDING = "cart/getList/pending",
	GET_LIST_FULFILLED = "cart/getList/fulfilled",
	GET_LIST_REJECTED = "cart/getList/rejected",
	ADD = "cart/add",
	ADD_PENDING = "cart/add/pending",
	ADD_FULFILLED = "cart/add/fulfilled",
	ADD_REJECTED = "cart/add/rejected",
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
	PAYMENT = "cart/payment",
}

const betweenTime = (date1: Date, date2: Date, seconds: number) => {
	return Math.abs(date1.getTime() - date2.getTime()) / 1000 < seconds;
};

export const fetchCarts = createAsyncThunk<Cart[], void, { state: RootState }>(
	CartType.GET_LIST,
	async (_, thunkAPI) => {
		const { getState, rejectWithValue } = thunkAPI;
		const { lastTimeCalled } = getState().cart;

		if (lastTimeCalled === undefined || !betweenTime(new Date(), lastTimeCalled, DEFAULT_TIME_BETWEEN_CALLS)) {
			try {
				const response = await cartService.getCartItems();

				return response || [];
			} catch (error: any) {
				return rejectWithValue("Fetch carts failed");
			}
		} else {
			return rejectWithValue("Time between calls is too short");
		}
	}
);

export const addCart = createAsyncThunk(
	CartType.ADD,
	async ({ productId, optionIds, quantity }: CartAdded, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response: Cart = await cartService.addCart({ productId, quantity, optionIds });
			return response;
		} catch (error: any) {
			return rejectWithValue("Add cart failed");
		}
	}
);
export const increaseCart = createAsyncThunk<{ id: number }, number>(
	CartType.INCREASE,
	async (cartId: number, { rejectWithValue }) => {
		try {
			await cartService.increaseCart(cartId);
			return {
				id: cartId,
			};
		} catch (error: any) {
			return rejectWithValue("Increase cart failed");
		}
	}
);

export const decreaseCart = createAsyncThunk<{ id: number }, number>(
	CartType.DECREASE,
	async (cartId: number, { rejectWithValue }) => {
		try {
			await cartService.decreaseCart(cartId);
			return {
				id: cartId,
			};
		} catch (error: any) {
			return rejectWithValue("Decrease cart failed");
		}
	}
);

export const deleteCart = createAsyncThunk<{ id: number }, number>(
	CartType.DELETE,
	async (cartId: number, { rejectWithValue }) => {
		try {
			await cartService.deleteCart(cartId);
			return {
				id: cartId,
			};
		} catch (error: any) {
			return rejectWithValue("Delete cart failed");
		}
	}
);

const cartSlice = createSlice({
	name: CartType.ROOT,
	initialState: initialState,
	reducers: {
		setPayment: (state, action: PayloadAction<PaymentEnum>) => {
			state.paymentMethod = action.payload;
		},
		setLastTimeCalled: (state) => {
			state.lastTimeCalled = undefined;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCarts.fulfilled, (state, action) => {
				state.items = action.payload;
				// state.lastTimeCalled = new Date();
			})
			.addCase(fetchCarts.rejected, (state, rejectWithValue) => {
				if (rejectWithValue.payload === "Time between calls is too short") return;
				state.items = [];
			})
			.addCase(addCart.fulfilled, (state, action) => {
				const cart = state.items.find(cart => cart.id === action.payload.id);

				if (cart) {
					cart.quantity = action.payload.quantity;
				} else {
					state.items.push(action.payload);
				}
			})
			.addCase(addCart.rejected, (state, action) => {
				console.error(action.payload);
			})
			.addCase(increaseCart.fulfilled, (state, action) => {
				const cart = state.items.find(cart => cart.id === action.payload.id);
				if (cart) {
					cart.quantity += DEFAULT_QUANTITY_CHANGE;
				}
			})
			.addCase(decreaseCart.fulfilled, (state, action) => {
				const cart = state.items.find(cart => cart.id === action.payload.id);

				if (cart) {
					cart.quantity -= DEFAULT_QUANTITY_CHANGE;
				}
			})
			.addCase(deleteCart.fulfilled, (state, action) => {
				state.items = state.items.filter(cart => cart.id !== action.payload.id);
			});
	},
});

export default cartSlice.reducer;
export const { setPayment , setLastTimeCalled} = cartSlice.actions;
export { CartType };
