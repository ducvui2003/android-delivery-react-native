/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:07 PM - 20/08/2024
 * User: lam-nguyen
 **/
import * as React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type HeaderProps = {
	showIconBack?: boolean;
	sizeIconBack?: number;
	colorIconBack?: string | string[];
	styleIconBack?: StyleProp<ViewStyle>;
	onPressBack?: () => void;
	title: string;
	colorTitle?: string | string[];
	titleStyle?: StyleProp<TextStyle>;
	style?: StyleProp<ViewStyle>;
	iconRight?: React.ReactNode;
	styleIconRight?: StyleProp<ViewStyle>;
	strokeWidth?: number;
};

export default HeaderProps;
