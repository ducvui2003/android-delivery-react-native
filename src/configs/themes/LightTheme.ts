/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:10 PM - 06/08/2024
 * User: lam-nguyen
 **/
import { ThemeType } from "../../types/theme.type";
import { neutral, primary, white } from "../colors/color-template.config";
import ColorFactory from "../../utils/Color";

const background_1 = ColorFactory.createSingleColor(white.getColor());
const background_2 = ColorFactory.createSingleColor(primary.getColor("50"));
const background_card = ColorFactory.createSingleColor(white.getColor());
const background_input = ColorFactory.createSingleColor("#EAEAEC");
const background_bottom_sheet = ColorFactory.createSingleColor(white.getColor());
const border = ColorFactory.createSingleColor(neutral.getColor("50"));
const border_hover = ColorFactory.createSingleColor(neutral.getColor("100"));
const text_1 = ColorFactory.createSingleColor(neutral.getColor("900"));
const text_2 = ColorFactory.createSingleColor(neutral.getColor("400"));
const text_3 = ColorFactory.createSingleColor(neutral.getColor("900"));
const textSkip = ColorFactory.createSingleColor("#9EA0A2");
const background = ColorFactory.createSingleColor(white.getColor());
const dialCode = ColorFactory.createSingleColor(neutral.getColor("300"));
const arrowSelector = ColorFactory.createSingleColor(neutral.getColor("900"));
const placeholder = ColorFactory.createSingleColor(neutral.getColor("300"));
// Home
const home_category_background = ColorFactory.createSingleColor("white");
const home_category_text = ColorFactory.createSingleColor(neutral.getColor("900"));
const home_search_icon = ColorFactory.createSingleColor(neutral.getColor("900"));
const home_heading = ColorFactory.createSingleColor(neutral.getColor("900"));
const home_cart_background = ColorFactory.createSingleColor("white");
const home_cart_icon = ColorFactory.createSingleColor(neutral.getColor("900"));
const home_product_card_background = ColorFactory.createSingleColor("white");
const home_product_card_text = ColorFactory.createSingleColor(neutral.getColor("900"));
const lightTheme: ThemeType = {
	background: background,
	background_1: background_1,
	background_2: background_2,
	background_card: background_card,
	background_input: background_input,
	background_bottom_sheet: background_bottom_sheet,
	border: border,
	border_hover: border_hover,
	text_1: text_1,
	text_2: text_2,
	text_3: text_3,
	textSkip: textSkip,
	dialCode: dialCode,
	arrowSelector: arrowSelector,
	placeholder: placeholder,
	home: {
		heading: home_heading,
		search: {
			icon: home_search_icon,
		},
		category: {
			background: home_category_background,
			text: home_category_text,
		},
		cart: {
			background: home_cart_background,
			icon: home_cart_icon,
		},
		product_card: {
			background: home_product_card_background,
			text: home_product_card_text,
		},
	},
};

export default lightTheme;
