/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:52 PM - 18/08/2024
 * User: lam-nguyen
 **/
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import GradientType from "./position.type";

type GradientProps = {
	text: string;
	gradientColors: string[];
	textStyle?: TextStyle;
	style?: StyleProp<ViewStyle>;
	start?: GradientType;
	end?: GradientType;
};

export default GradientProps;
