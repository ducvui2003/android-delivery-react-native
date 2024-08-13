/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:50 PM - 06/08/2024
 * User: lam-nguyen
 **/
import {useDispatch} from "react-redux";
import themeSlice from "../../hooks/redux/theme.slice";
import {
    configureStore,
} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        themeState: themeSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export default store;
