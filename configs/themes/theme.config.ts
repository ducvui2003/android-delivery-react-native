/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:07 PM - 06/08/2024
 * User: lam-nguyen
 **/
import {NameTheme, ThemeType} from "../../types/theme.type";
import lightTheme from "./LightTheme";
import darkTheme from "./DarkTheme";

const themes: Record<NameTheme, ThemeType> = {
    DarkTheme: darkTheme,
    LightTheme: lightTheme,
}

export default themes;
