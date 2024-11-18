/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:24 PM - 18/11/2024
 * User: lam-nguyen
 **/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryType from "../../types/category.type";
import { getCategories, getHomeCategories } from "../../services/category.service";

type CategoryState = {
	categories: CategoryType[];
	homeCategory: CategoryType[];
};

const initialState: CategoryState = {
	categories: [],
	homeCategory: [],
};

enum CategoryEnum {
	ROOT = "category",
}

// Async Thunks for login, token refresh, and logout
export const loadCategories = createAsyncThunk(CategoryEnum.ROOT, async (): Promise<CategoryType[]> => {
	try {
		return await getCategories();
	} catch (_: any) {
		return [];
	}
});

const categorySlice = createSlice({
	name: CategoryEnum.ROOT,
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loadCategories.fulfilled, (state, action) => {
			state.categories = action.payload;
			state.homeCategory = getHomeCategories(action.payload);
		});
	},
});

export default categorySlice.reducer;

export { CategoryType };
