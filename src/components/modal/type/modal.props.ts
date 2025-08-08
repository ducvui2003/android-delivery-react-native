/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:04 PM - 10/09/2024
 * User: lam-nguyen
 **/
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { DimensionValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type ModalProps = {
	children: ReactNode;
	contentStyle?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	active: boolean;
	width?: DimensionValue;
	durationAnimation?: number;
	background?: {
		backgroundColor?: string;
		opacity?: number;
	};
	onEndHide?: () => void;
	displayCancelButton?: boolean;
};

export default ModalProps;
