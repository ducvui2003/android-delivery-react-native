/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:55 AM - 06/09/2024
 * User: lam-nguyen
 **/
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type InputNumberButtonProps = {
	styleButton?: StyleProp<ViewStyle>;
	styleText?: StyleProp<TextStyle>;
	sizeIcon?: number;
	current?: number;
	step?: number;
	max: number;
	min?: number;
	onMountCurrent?: (value: number) => void;
	onPlusAction?: () => boolean;
	onMinusAction?: () => boolean;
	onPlusActionController?: () => Promise<void>;
	onMinusActionController?: () => Promise<void>;
};

export default InputNumberButtonProps;
