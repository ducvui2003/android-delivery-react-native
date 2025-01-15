import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PromotionType from "../../types/promotion.type";
import axiosInstance, { ApiResponse } from "../../configs/axios/axios.config";
import PromotionBaseInfoType from "../../types/promotionBaseInfo.type";

type PromotionOfferState = {
	promotions?: PromotionBaseInfoType[];
	shipping?: PromotionType;
	order?: PromotionType;
};
const initialState: PromotionOfferState = {};

export enum EndPointPromotion {
	ROOT = "promotion",
	GET_PROMOTIONS = "promotion/getPromotions",
	DETAIL_PROMOTION = "promotion/detail",
}

export const getPromotions = createAsyncThunk(
	EndPointPromotion.GET_PROMOTIONS,
	async (userId: number | undefined, thunkAPI) => {
		try {
			const promotions = await axiosInstance.get<ApiResponse<PromotionBaseInfoType[]>>(
				EndPointPromotion.ROOT + `/${userId}`
			);
			return promotions.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data || e.message);
		}
	}
);

export const promotionOffer = createAsyncThunk(
	EndPointPromotion.DETAIL_PROMOTION,
	async (PromotionId: String | undefined, thunkAPI) => {
		try {
			const promotions = await axiosInstance.get<ApiResponse<PromotionType>>(
				EndPointPromotion.DETAIL_PROMOTION + `/${PromotionId}`
			);
			return promotions.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data || e.message);
		}
	}
);

const promotionOfferSlice = createSlice({
	name: EndPointPromotion.ROOT,
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getPromotions.fulfilled, (state, action) => {
				state.promotions = action.payload.data;
			})
			.addCase(promotionOffer.fulfilled, (state, action) => {
				const data = action.payload.data;
				switch (action.payload.data.type) {
					case "ORDER":
						state.order = data.id === state.order?.id ? undefined : data;
						break;

					case "SHIPPING":
						state.shipping = data.id === state.shipping?.id ? undefined : data;
						break;
				}
			});
	},
});

export default promotionOfferSlice.reducer;
