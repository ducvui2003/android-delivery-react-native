/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:54 PM - 28/08/2024
 * User: lam-nguyen
 **/
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ReactNode } from "react";

type ButtonHasStatusProps = {
	title: string;
	active?: boolean;
	onPress?: () => void;
	styleText?: StyleProp<TextStyle>;
	styleButtonNotActive?: StyleProp<ViewStyle>;
	styleButtonActive?: StyleProp<ViewStyle>;
	styleButton?: StyleProp<ViewStyle>;
	icon?: ReactNode;
	side?: "left" | "right";
};

export default ButtonHasStatusProps;
