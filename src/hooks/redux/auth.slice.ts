/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.type";

type AuthState = {
	user?: User;
};

const initialState: AuthState = {};

const themeSlice = createSlice({
	name: "theme",
	initialState: initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		logout: state => {
			state.user = undefined;
		},
	},
});

export const { login } = themeSlice.actions;
export default themeSlice.reducer;
