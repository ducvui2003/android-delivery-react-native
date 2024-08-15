/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:35 PM - 07/08/2024
 * User: lam-nguyen
 **/
import {TextStyle} from "react-native";

type NameTextStyle =
    "fontFamily" |
    "12_regular" |
    "12_medium" |
    "16_light" |
    "16_regular" |
    "16_semibold" |
    "18_light" |
    "18_semibold" |
    "18_regular" |
    "22_regular" |
    "22_semibold" |
    "22_semibold_5%" |
    "30_bold_5%" |
    "40_semibold"
    ;

const textStyle: Record<NameTextStyle, TextStyle> = {
    fontFamily: {
        fontFamily: "Roboto",
    },
    "12_regular": {
        fontSize: 12,
        fontWeight: "regular",
        fontFamily: "Roboto",
    },
    "12_medium": {
        fontSize: 12,
        fontWeight: "medium",
        fontFamily: "Roboto",
    },
    "16_light": {
        fontSize: 16,
        fontWeight: "light",
        fontFamily: "Roboto",
    },
    "16_regular": {
        fontSize: 16,
        fontWeight: "regular",
        fontFamily: "Roboto",
    },
    "16_semibold": {
        fontSize: 16,
        fontWeight: "semibold",
        fontFamily: "Roboto",
    },
    "18_light": {
        fontSize: 18,
        fontWeight: "light",
        fontFamily: "Roboto",
    },
    "18_semibold": {
        fontSize: 18,
        fontWeight: "semibold",
        fontFamily: "Roboto",
    },
    "18_regular": {
        fontSize: 18,
        fontWeight: "regular",
        fontFamily: "Roboto",
    },
    "22_regular": {
        fontSize: 22,
        fontWeight: "regular",
        fontFamily: "Roboto",
    },
    "22_semibold": {
        fontSize: 22,
        fontWeight: "semibold",
        fontFamily: "Roboto",
    },
    "22_semibold_5%": {
        fontSize: 22,
        fontWeight: "semibold",
        letterSpacing: 1.05,
        fontFamily: "Roboto",
    },
    "30_bold_5%": {
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 1.05,
        fontFamily: "Roboto",
    },
    "40_semibold": {
        fontSize: 40,
        fontWeight: "semibold",
        fontFamily: "Roboto",
    },
}

export default textStyle;
