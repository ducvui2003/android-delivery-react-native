/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RatingFormType from "../../types/ratingForm.type";
import DriverInfoType from "../../types/driverInfo.type";
import MeatInfoType from "../../types/meatInfo.type";

type FormType = {
	id: string;
	[key: string]: any;
};

type RatingState = {
	oderRating?: {
		id: string;
		rating: number;
	};
	driverRating?: RatingFormType;
	tip?: number;
	meatRating?: RatingFormType[];
	driverInfo?: DriverInfoType;
	meats?: MeatInfoType[];
};

const initialState: RatingState = {};

const ratingSlice = createSlice({
	name: "rating",
	initialState: initialState,
	reducers: {
		setIdOderRating: (state, action: PayloadAction<string>) => {
			state.oderRating = {
				id: action.payload,
				rating: 0,
			};
		},
		setIdDriverRating: (state, action: PayloadAction<string>) => {
			state.driverInfo = {
				id: action.payload,
				name: "",
				image: "",
			};
			state.driverRating = {
				id: state.driverRating?.id || "",
				rating: 0,
				review: "",
				images: [],
			};
		},
		setOderRating: (state, action: PayloadAction<number>) => {
			state.oderRating = {
				id: state.oderRating?.id || "",
				rating: action.payload,
			};
		},
		setDriverRating: (state, action: PayloadAction<RatingFormType>) => {
			state.driverRating = action.payload;
		},
		skipDriverRating: state => {
			state.driverRating = {
				id: state.driverRating?.id || "",
				rating: 0,
				review: "",
				images: [],
			};
		},
		setTip: (state, action: PayloadAction<number>) => {
			state.tip = action.payload;
		},
		setMeatRating: (state, action: PayloadAction<RatingFormType[]>) => {
			state.meatRating = action.payload;
		},
		setDriverInfo: (state, action: PayloadAction<DriverInfoType>) => {
			state.driverInfo = action.payload;
		},
		setMeats: (state, action: PayloadAction<MeatInfoType[]>) => {
			state.meats = action.payload;
			state.meatRating = action.payload.map(value => ({
				id: value.id,
				rating: 0,
				review: "",
				images: [],
			}));
		},

		skipMeatRating: state => {
			state.meatRating = state.meatRating?.map(item => ({
				...item,
				rating: 0,
				review: "",
				images: [],
			}));
		},
	},
});

export const {
	setIdOderRating,
	setIdDriverRating,
	skipDriverRating,
	setOderRating,
	setDriverRating,
	setTip,
	setMeatRating,
	setDriverInfo,
	setMeats,
	skipMeatRating,
} = ratingSlice.actions;
export default ratingSlice.reducer;
