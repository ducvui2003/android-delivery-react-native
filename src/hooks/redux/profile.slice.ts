import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChangeProfile from "../../types/changeProfile";
import { updateProfileAPI } from "../../services/profile.service";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";


type ProfileState = {
	user?: ChangeProfile;
	loading: boolean;
	error?: string;
};

const initialState: ProfileState = {
	user: undefined,
	loading: false,
	error: undefined,
};

enum ProfileType {
	ROOT = "profile",
	UPDATE_PROFILE = "profile/update",
}

export const updateProfile = createAsyncThunk(
	ProfileType.UPDATE_PROFILE,
	async (data: ChangeProfile, thunkAPI) => {
		try {
			const response = await updateProfileAPI(data);
			// return response.data.data;
			const state = thunkAPI.getState() as RootState;
			const currentUser = state.authState.user;
			const updatedUser = {
				...currentUser,
				...response.data.data,
			};
			return updatedUser;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data || e.message);
		}
	},
);

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default profileSlice.reducer;
