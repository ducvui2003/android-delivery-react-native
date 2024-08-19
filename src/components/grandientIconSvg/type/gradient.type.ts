/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:52 PM - 18/08/2024
 * User: lam-nguyen
 **/
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import GradientType from "./position.type";
import { DimensionValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import React from "react";

type GradientProps = {
	height?: DimensionValue; // Với android phải điền
	width?: DimensionValue; // Với android phải điền
	icon: React.JSX.Element;
	gradientColors: string[];
	textStyle?: TextStyle;
	style?: StyleProp<ViewStyle>;
	start?: GradientType;
	end?: GradientType;
};

export default GradientProps;
