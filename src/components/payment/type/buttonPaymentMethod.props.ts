/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:21 PM - 13/09/2024
 * User: lam-nguyen
 **/
import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type ButtonPaymentMethodProps = {
	icon?: ReactNode;
	title: string;
	onPress?: () => void;
	onChecked?: () => void;
	showCheckBox?: boolean;
	checked?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
};
export default ButtonPaymentMethodProps;
