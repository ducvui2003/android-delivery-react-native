/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { ApiResponse } from "../../configs/axios/axios.config";
import { KEY_SECURE, removeFromStorage, setToStorage } from "../../services/secureStore.service";
import LoginFormType from "../../types/loginForm.type";
import { ResponseAuthentication, User } from "../../types/user.type";
import { EndPoint } from "../../utils/EndPoint";
import { setLoading } from "./modal.slice";

type AuthState = {
	user: User | null;
	accessToken: string | null;
};

const initialState: AuthState = {
	user: null,
	accessToken: null,
};

enum AuthType {
	ROOT = "auth",
	LOGIN = "auth/login",
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
		const result = await axiosInstance.post<ApiResponse<ResponseAuthentication>>(EndPoint.LOGIN, data);

		const { user, accessToken } = result.data.data;
		await setToStorage(KEY_SECURE.ACCESS_TOKEN, accessToken);

		return {
			user,
			accessToken,
		};
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	} finally {
		dispatch(setLoading(false)); // Gọi action setLoading với giá trị false
	}
});

export const logout = createAsyncThunk(AuthType.LOGOUT, async () => {
	await removeFromStorage(KEY_SECURE.ACCESS_TOKEN);
	await removeFromStorage(KEY_SECURE.REFRESH_TOKEN);
});

const authSlice = createSlice({
	name: AuthType.ROOT,
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(logout.fulfilled, state => {
				state.user = null;
				state.accessToken = null;
			});
	},
});

// export const {login} = authSlice.actions;
export default authSlice.reducer;

export { AuthType };
