/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:52 PM - 18/08/2024
 * User: lam-nguyen
 **/
import { StyleProp, ViewStyle } from "react-native";
import GradientType from "./position.type";
import { ReactNode } from "react";

type GradientProps = {
	gradientColors: string[];
	style?: StyleProp<ViewStyle>;
	start?: GradientType;
	end?: GradientType;
	children?: ReactNode;
};

export default GradientProps;
