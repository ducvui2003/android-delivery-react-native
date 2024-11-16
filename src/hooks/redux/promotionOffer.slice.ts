import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PromotionType from "../../types/promotion.type";
type PromotionOfferState = {
	shipping?:PromotionType
	order?: PromotionType;
};
const initialState: PromotionOfferState = {};

const promotionOfferSlice = createSlice({
	name: "promotion offer",
	initialState: initialState,
	reducers: {
		setShippingPromotion: (state, action: PayloadAction<PromotionType>) => {
			state.shipping = action.payload;
		},
		setOrderPromotion: (state, action: PayloadAction<PromotionType>) => {
			state.order = action.payload;
		},
	},
});

export default promotionOfferSlice.reducer;
export const {setShippingPromotion, setOrderPromotion} = promotionOfferSlice.actions;