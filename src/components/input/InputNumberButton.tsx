/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:49 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import SolarAddLinear from "../../../assets/images/icons/SolarAddLinear";
import SolarMinusLinear from "../../../assets/images/icons/SolarMinusLinear";
import { neutral } from "../../configs/colors/color-template.config";
import { RootState } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../custom/Row";
import InputNumberButtonProps from "./type/inputNumberButton.props";

function InputNumberButton({
	onAmount,
	totalAmount,
	styleButton,
	styleText,
	sizeIcon = 25,
	quantity = 1,
}: InputNumberButtonProps) {
	const [amount, setAmount] = useState<number>(quantity);
	const theme = useSelector((state: RootState) => state.themeState.theme);

	const onChangeAmount = (quantityChange: number) => {
		if (quantityChange < 1) return;
		if (quantityChange > totalAmount) return;
		const canChange = onAmount?.(quantityChange);
		if (canChange) {
			setAmount(quantityChange);
		}
	};

	return (
		<Row style={{ alignItems: "center" }}>
			<TouchableOpacity onPress={() => onChangeAmount(quantity - 1)} style={[styles.button, styleButton]}>
				<SolarMinusLinear width={sizeIcon} height={sizeIcon} color={theme.text_1.getColor()} />
			</TouchableOpacity>
			<Text style={[styles.text, { color: theme.text_1.getColor() }, styleText]}>{amount}</Text>
			<TouchableOpacity onPress={() => onChangeAmount(quantity - 1)} style={[styles.button, styleButton]}>
				<SolarAddLinear width={sizeIcon} height={sizeIcon} color={theme.text_1.getColor()} />
			</TouchableOpacity>
		</Row>
	);
}

const styles = StyleSheet.create({
	text: {
		...textStyle["22_regular"],
		width: 50,
		textAlign: "center",
	},
	button: {
		borderRadius: 999,
		padding: 12,
		borderColor: neutral.getColor("50"),
		borderWidth: 1,
		borderStyle: "solid",
	},
});

export default InputNumberButton;
