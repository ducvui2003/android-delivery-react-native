/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:04 PM - 06/08/2024
 * User: lam-nguyen
 **/

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NameTheme, ThemeType} from "../../types/theme.type";
import themes from "../../configs/themes/theme.config";

type ThemeState = {
    theme: ThemeType;
}

const initialState: ThemeState = {
    theme: themes.light
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<NameTheme>) => {
            if (!action.payload) {
                state.theme = themes["light"];
            } else {
                state.theme = themes[action.payload];
            }
        }
    }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer
