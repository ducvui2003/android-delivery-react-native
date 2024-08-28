/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:58 PM - 28/08/2024
 * User: lam-nguyen
 **/
import * as React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type CountDownProps = {
	icon?: React.ReactNode;
	time: number;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	onEnd?: () => void;
};

export default CountDownProps;
