/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:34 PM - 06/08/2024
 * User: lam-nguyen
 **/
import { GradientColor, GroupColor, SingleColor } from "../utils/Color";
import { ColorSchemeName } from "react-native";

export type NameTheme = "light" | "dark";

export type ThemeType = {
	background: SingleColor;
	background_1: SingleColor;
	background_2: SingleColor;
	background_card: SingleColor;
	background_input: SingleColor;
	background_bottom_sheet: SingleColor;
	border: SingleColor;
	border_hover: SingleColor;
	text_1: SingleColor;
	text_2: SingleColor;
	text_3: SingleColor;
	textSkip: SingleColor;
	dialCode: SingleColor;
	arrowSelector: SingleColor;
	placeholder: SingleColor;
	home: {
		heading: SingleColor;
		search: {
			icon: SingleColor;
		};
		category: {
			background: SingleColor;
			text: SingleColor;
		};
		cart: {
			background: SingleColor;
			icon: SingleColor;
		};
		product_card: {
			background: SingleColor;
			text: SingleColor;
		};
	};
};
