/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:58 PM - 17/08/2024
 *  User: lam-nguyen
 **/
import {
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	StyleProp,
	TextInputChangeEventData,
	TextStyle,
} from "react-native";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";
import { DimensionValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type InputProps = {
	placeholder?: string;
	keyboardType?: KeyboardTypeOptions;
	value?: string;
	onChange?: ((element: NativeSyntheticEvent<TextInputChangeEventData>) => void) | undefined;
	onBlur?: () => void;
	onFocus?: () => void;
	borderColor?: ColorValue;
	borderColorFocus?: ColorValue;
	width?: number | undefined;
	height?: number | undefined;
	backgroundColor?: ColorValue;
	styleInput?: StyleProp<TextStyle>;
	focus?: boolean;
	secureTextEntry?: boolean;
	autoFocus?: boolean;
	multiline?: boolean;
	numberOfLines?: number;
	editable?: boolean;
};

export default InputProps;
