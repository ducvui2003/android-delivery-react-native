/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:29 PM - 12/09/2024
 * User: lam-nguyen
 **/
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

type PopUpProps = {
	header?: ReactNode;
	body?: ReactNode;
	footer?: ReactNode;
	showed?: boolean;
	onEndHide?: () => void;
	hideHeader?: boolean;
	hideFooter?: boolean;
	height?: number;
	contentStyle?: StyleProp<ViewStyle>;
};

export default PopUpProps;
