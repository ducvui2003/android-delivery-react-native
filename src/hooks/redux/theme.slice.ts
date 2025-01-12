/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const themeSlice = createSlice({
	name: "theme",
	initialState: initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<NameTheme>) => {
			AsyncStorage.setItem("theme", action.payload).then(() => {
				state.theme = themes[action.payload];
				state.textTheme = action.payload;
			});
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
