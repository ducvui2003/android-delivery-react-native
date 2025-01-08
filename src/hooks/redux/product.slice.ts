import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./modal.slice";
import { likeProduct, unlikeProduct } from "../../services/product.service";

enum ProductEndpoint {
	LIKE = "product/favorite/like",
	UNLIKE = "product/favorite/unlike",
}

export const like = createAsyncThunk(ProductEndpoint.LIKE, async (id: string, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI;
	try {
		dispatch(setLoading(true)); // Gọi action setLoading với giá trị true
		return await likeProduct(id);
	} catch (error: any) {
		console.log("Error logging in", error);
		return rejectWithValue(error.response.data);
	} finally {
		dispatch(setLoading(false));
	}
});

export const unlike = createAsyncThunk(ProductEndpoint.UNLIKE, async (id: string, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI;
	try {
		dispatch(setLoading(true)); // Gọi action setLoading với giá trị true
		return await unlikeProduct(id);
	} catch (error: any) {
		console.log("Error logging in", error);
		return rejectWithValue(error.response.data);
	} finally {
		dispatch(setLoading(false));
	}
});
