// loadingSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ModelType from "../../types/model.type";

type ModelState = {
	isLoading: boolean;
	notify: ModelType;
};

const initialState: ModelState = {
	isLoading: false,
	notify: {} as ModelType,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		showModalNotify: (state, action: PayloadAction<ModelType>) => {
			state.notify = action.payload;
			action.payload.active = true;
		},
		hiddenModalNotify: state => {
			state.notify.active = false;
		},
	},
});

export const { setLoading, showModalNotify, hiddenModalNotify } = modalSlice.actions;
export default modalSlice.reducer;
