/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:34 PM - 06/08/2024
 * User: lam-nguyen
 **/
import {GradientColor, GroupColor, SingleColor} from "../utils/Color";

export type NameTheme = "DarkTheme" | "LightTheme";

export type ThemeType = {
    gradient: GradientColor;
    gradient2: GradientColor;
    primary: GroupColor;
    secondary: GroupColor;
    green: GroupColor;
    neutral: GroupColor;
    blackBottomSheet: SingleColor;
    blackPopUp: SingleColor;
    gradientBorder: GradientColor;
}
