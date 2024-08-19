/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:10 PM - 06/08/2024
 * User: lam-nguyen
 **/
import {ThemeType} from "../../types/theme.type";
import {neutral, primary, white} from "../colors/color-template.config";
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
}

export default darkTheme;
