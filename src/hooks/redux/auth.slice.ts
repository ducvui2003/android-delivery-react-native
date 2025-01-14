/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginFormType from "../../types/loginForm.type";
import { User } from "../../types/user.type";
import { getUserInfo, loginApi, logoutApi, setAccessToken } from "../../services/auth.service";

type AuthState = {
	user?: User;
};

const initialState: AuthState = {
	user: undefined,
};

enum AuthType {
	ROOT = "auth",
	GET_ACCOUNT = "auth/getAccount",
	GET_ACCOUNT_PENDING = "auth/getAccount/pending",
	GET_ACCOUNT_FULFILLED = "auth/getAccount/fulfilled",
	GET_ACCOUNT_REJECTED = "auth/getAccount/rejected",
	LOGIN = "auth/login",
	LOGIN_PENDING = "auth/login/pending",
	LOGIN_FULFILLED = "auth/login/fulfilled",
	LOGIN_REJECTED = "auth/login/rejected",
	LOGOUT = "auth/logout",
}

export const initialStateAuth = createAsyncThunk<User, void>(AuthType.GET_ACCOUNT, async _ => {
	try {
		const user = await getUserInfo();
		console.log("User info", user);

		return user;
	} catch (error: any) {
		console.error("Error getting user info", error);
		return error.response.data;
	}
});

export const login = createAsyncThunk<User, LoginFormType>(AuthType.LOGIN, async (data: LoginFormType, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		const { user, accessToken } = await loginApi(data);
		await setAccessToken(accessToken);
		return user;
	} catch (error: any) {
		console.log("Error logging in", error);
		return rejectWithValue(error.response.data);
	}
});

export const logout = createAsyncThunk(AuthType.LOGOUT, async (_, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		await logoutApi();
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});

const authSlice = createSlice({
	name: AuthType.ROOT,
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(initialStateAuth.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(logout.fulfilled, state => {
				state.user = undefined;
			});
	},
});

export default authSlice.reducer;

export { AuthType };
