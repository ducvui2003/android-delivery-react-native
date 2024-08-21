/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:55 PM - 17/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import Row from "../custom/Row";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import InputIconProps from "./type/InpuIcontProps";
import InputStyles from "./style/input.styles";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

function InputIcon({
	onChange,
	onFocus,
	onBlur,
	placeholder,
	value,
	keyboardType,
	icon,
	side = "left",
	borderColor,
	borderColorFocus,
	width,
	height,
	backgroundColor,
	styleInput,
}: InputIconProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [isFocus, setIsFocus] = React.useState<boolean>(false);

	const borderColorArr: Record<"true" | "false", ColorValue> = {
		true: borderColorFocus ? borderColorFocus : theme.border_hover.getColor(),
		false: borderColor ? borderColor : theme.border.getColor(),
	};

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
		>
			{side === "left" && icon}
			<TextInput
				style={[InputStyles.input, { color: theme.text_3.getColor() }, styleInput]}
				placeholderTextColor={theme.placeholder.getColor()}
				onBlur={() => {
					onBlur && onBlur();
					setIsFocus(false);
				}}
				keyboardType={keyboardType}
				onChange={onChange}
				onFocus={() => {
					onFocus && onFocus();
					setIsFocus(true);
				}}
				value={value}
				placeholder={placeholder}
			/>
			{side === "right" && icon}
		</Row>
	);
}

export default InputIcon;
