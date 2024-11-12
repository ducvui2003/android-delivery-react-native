/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:55 PM - 17/08/2024
 * User: lam-nguyen
 **/

import React, { useEffect } from "react";
import Row from "../custom/Row";
import { TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import InputIconProps from "./type/inputIcon.props";
import InputStyles from "./style/input.styles";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

function InputIcon({
	onChange,
	onFocus,
	onBlur,
	placeholder,
	value,
	keyboardType,
	iconLeft,
	iconRight,
	borderColor,
	borderColorFocus,
	width,
	height,
	backgroundColor,
	styleInput,
	focus,
	secureTextEntry,
	onPressIconLeft,
	onPressIconRight,
	autoFocus,
	multiline,
	numberOfLines,
}: InputIconProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [isFocus, setIsFocus] = React.useState<boolean>(false);
	const textInputRef = React.useRef<TextInput>(null);

	const borderColorArr: Record<"true" | "false", ColorValue> = {
		true: borderColorFocus ? borderColorFocus : theme.border_hover.getColor(),
		false: borderColor ? borderColor : theme.border.getColor(),
	};

	useEffect(() => {
		if (focus) textInputRef.current?.focus();
		else textInputRef.current?.blur();
	}, [focus]);

	return (
		<Row
			style={[
				InputStyles.container,
				{
					backgroundColor: backgroundColor ?? theme.background_input.getColor(),
					borderColor: borderColorArr[isFocus.toString() as "false" | "true"],
				},
				{ width, height },
			]}
			flex={0}
		>
			{iconLeft && <TouchableOpacity onPress={onPressIconLeft}>{iconLeft}</TouchableOpacity>}
			<TextInput
				style={[InputStyles.input, { color: theme.text_3.getColor() }, styleInput]}
				placeholderTextColor={theme.placeholder.getColor()}
				onBlur={() => {
					onBlur?.();
					setIsFocus(false);
				}}
				ref={textInputRef}
				keyboardType={keyboardType}
				onChange={onChange}
				onFocus={() => {
					onFocus?.();
					setIsFocus(true);
				}}
				secureTextEntry={secureTextEntry}
				value={value}
				placeholder={placeholder}
				autoFocus={autoFocus}
				multiline={multiline}
				numberOfLines={numberOfLines}
			/>
			{iconRight && <TouchableOpacity onPress={onPressIconRight}>{iconRight}</TouchableOpacity>}
		</Row>
	);
}

export default InputIcon;
