/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:10 PM - 06/08/2024
 * User: lam-nguyen
 **/
import {ThemeType} from "../../types/theme.type";
import {
    blackBottomSheet,
    blackPopUp,
    gradient,
    gradient2,
    gradientBorder,
    green,
    neutral,
    primary,
    secondary,
    white
} from "../colors/color-template.config";
import ColorFactory from "../../utils/Color";

const background_1 = white;
const background_2 = ColorFactory.createSingleColor(primary.getColor("50"));
const background_card = white;
const background_input = ColorFactory.createSingleColor(primary.getColor("500", 0.05));
const background_bottom_sheet = white;
const border = ColorFactory.createSingleColor(neutral.getColor("50"));
const border_hover = ColorFactory.createSingleColor(neutral.getColor("100"));
const text_1 = ColorFactory.createSingleColor(neutral.getColor("900"));
const text_2 = ColorFactory.createSingleColor(neutral.getColor("400"));


const lightTheme: ThemeType = {
    gradient: gradient,
    gradient2: gradient2,
    blackBottomSheet: blackBottomSheet,
    blackPopUp: blackPopUp,
    gradientBorder: gradientBorder,
    primary: primary,
    secondary: secondary,
    green: green,
    neutral: neutral,
    background_1: background_1,
    background_2: background_2,
    background_card: background_card,
    background_input: background_input,
    background_bottom_sheet: background_bottom_sheet,
    border: border,
    border_hover: border_hover,
    text_1: text_1,
    text_2: text_2,
}

export default lightTheme;
