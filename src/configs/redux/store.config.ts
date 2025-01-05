/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:50 PM - 06/08/2024
 * User: lam-nguyen
 **/
import { useDispatch } from "react-redux";
import themeSlice from "../../hooks/redux/theme.slice";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../hooks/redux/auth.slice";
import ratingSlice from "../../hooks/redux/rating.slice";
import loadingSlice from "../../hooks/redux/modal.slice";
import categorySlice from "../../hooks/redux/category.slice";
import promotionOfferSlice from "../../hooks/redux/promotionOffer.slice";

const store = configureStore({
	reducer: {
		loadingState: loadingSlice,
		themeState: themeSlice,
		authState: authSlice,
		ratingState: ratingSlice,
		categoryState: categorySlice,
		promotionOffer: promotionOfferSlice,
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
