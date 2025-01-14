import { MyLocation } from "../../../assets/data/location/location";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAddress } from "../../services/address.service";

type AddressState = {
	address: MyLocation[];
};

const initialState: AddressState = {
	address: [],
};

export const thunkGetAllAddress = createAsyncThunk("get-all-address", async (_, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	try {
		return await getAllAddress();
	} catch (e) {
		rejectWithValue(e);
	}
});

const addressSlice = createSlice({
	name: "Address",
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(thunkGetAllAddress.fulfilled, (state, action) => {
			if (action.payload) state.address = action.payload;
		});
	},
});

export default addressSlice.reducer;
