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

const background_1 = ColorFactory.createSingleColor(primary.getColor("900"));
const background_2 = ColorFactory.createSingleColor(primary.getColor("900"));
const background_card = ColorFactory.createSingleColor(primary.getColor("600"));
const background_input = ColorFactory.createSingleColor(white.getColor(0.1));
const background_bottom_sheet = ColorFactory.createSingleColor(primary.getColor("500"));
const border = ColorFactory.createSingleColor(neutral.getColor("400"));
const border_hover = ColorFactory.createSingleColor(neutral.getColor("400"));
const text_1 = ColorFactory.createSingleColor(neutral.getColor("100"));
const text_2 = ColorFactory.createSingleColor(neutral.getColor("300"));
const text_3 = ColorFactory.createSingleColor(neutral.getColor("50"));
const textSkip = ColorFactory.createSingleColor("#65696C");
const background = ColorFactory.createSingleColor(neutral.getColor("900"));
const dialCode = ColorFactory.createSingleColor("#898B8E");
const arrowSelector = ColorFactory.createSingleColor(neutral.getColor("50"));
const placeholder = ColorFactory.createSingleColor("#898B8E");
const navigation = ColorFactory.createSingleColor(neutral.getColor("400"));
// Header
const backgroundIconBack = ColorFactory.createSingleColor("#25292E");
// Home
const home_category_background = ColorFactory.createSingleColor(neutral.getColor("700"));
const home_category_text = ColorFactory.createSingleColor(neutral.getColor("100"));
const home_search_icon = ColorFactory.createSingleColor(neutral.getColor("50"));
const home_heading = ColorFactory.createSingleColor(neutral.getColor("50"));
const home_cart_background = ColorFactory.createSingleColor("#25292E");
const home_cart_icon = ColorFactory.createSingleColor(neutral.getColor("100"));
const home_product_card_background = ColorFactory.createSingleColor(neutral.getColor("500"));
const home_product_card_text = ColorFactory.createSingleColor(neutral.getColor("100"));
// Add new location
const drop_button = ColorFactory.createSingleColor("#DBD6CE");
const background_3 = ColorFactory.createSingleColor(neutral.getColor("500"));

const darkTheme: ThemeType = {
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
	navigation: navigation,
	header: {
		backgroundIconBack: backgroundIconBack,
	},
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
	add_new_location: {
		drop_button: drop_button,
		background: background_3,
	},
	my_location: {
		background_button_add: ColorFactory.createSingleColor(neutral.getColor("700")),
		color_button_add: ColorFactory.createSingleColor(neutral.getColor("50")),
	},
	review: {
		backgroundButtonReview: ColorFactory.createSingleColor(neutral.getColor("500")),
		colorRatingUnSelected: ColorFactory.createSingleColor("#252415"),
	},
};

export default darkTheme;
