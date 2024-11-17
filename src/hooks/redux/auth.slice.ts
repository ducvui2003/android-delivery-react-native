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
import { setLoading } from "./modal.slice";
import { getUserInfoApi, loginApi, logoutApi } from "../../services/auth.service";

type AuthState = {
	user: User | null;
	error: string | null;
};

const initialState: AuthState = {
	user: null,
	error: null,
};

enum AuthType {
	ROOT = "auth",
	LOGIN = "auth/login",
	ACCOUNT = "auth/account",
	LOGIN_PENDING = "auth/login/pending",
	LOGIN_FULFILLED = "auth/login/fulfilled",
	LOGIN_REJECTED = "auth/login/rejected",
	LOGOUT = "auth/logout",
}

// Async Thunks for login, token refresh, and logout
export const login = createAsyncThunk(AuthType.LOGIN, async (data: LoginFormType, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI;
	try {
		dispatch(setLoading(true)); // Gọi action setLoading với giá trị true
		const { user } = await loginApi(data);
		return { user };
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	} finally {
		dispatch(setLoading(false)); // Gọi action setLoading với giá trị false
	}
});

export const getAccount = createAsyncThunk(AuthType.ACCOUNT, async _ => {
	try {
		const user = await getUserInfoApi();
		return { user };
	} catch (error: any) {
		return error.response.data;
	}
});

export const logout = createAsyncThunk(AuthType.LOGOUT, async _ => {
	await logoutApi();
});

const authSlice = createSlice({
	name: AuthType.ROOT,
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(logout.fulfilled, state => {
				state.user = null;
			})
			.addCase(getAccount.fulfilled, (state, action) => {
				state.user = action.payload.user;
			});
	},
});

export default authSlice.reducer;

export { AuthType };
