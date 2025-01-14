/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NameTheme, ThemeType } from "../../types/theme.type";
import themes from "../../configs/themes/theme.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeState = {
	theme: ThemeType;
	textTheme: NameTheme;
};

const initialState: ThemeState = {
	theme: themes.light,
	textTheme: "light",
};

export const setTheme = createAsyncThunk("theme", async (data: string): Promise<NameTheme> => {
	await AsyncStorage.setItem("theme", data);
	return data as NameTheme;
});

const themeSlice = createSlice({
	name: "theme",
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(setTheme.fulfilled, (state, action) => {
			state.theme = themes[action.payload];
			state.textTheme = action.payload;
		});
	},
});

export default themeSlice.reducer;
