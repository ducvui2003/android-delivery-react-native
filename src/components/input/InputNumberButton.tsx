/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:49 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import SolarMinusLinear from "../../../assets/images/icons/SolarMinusLinear";
import SolarAddLinear from "../../../assets/images/icons/SolarAddLinear";
import Row from "../custom/Row";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import { neutral } from "../../configs/colors/color-template.config";
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

	useEffect(() => {
		onAmount?.(amount);
	}, [amount]);

	const onPlus = () => {
		if (amount >= totalAmount) return;

		setAmount(amount + 1);
	};
	const onMinus = () => {
		if (amount <= 1) return;

		setAmount(amount - 1);
	};

	return (
		<Row style={{ alignItems: "center" }}>
			<TouchableOpacity onPress={onMinus} style={[styles.button, styleButton]}>
				<SolarMinusLinear width={sizeIcon} height={sizeIcon} color={theme.text_1.getColor()} />
			</TouchableOpacity>
			<Text style={[styles.text, { color: theme.text_1.getColor() }, styleText]}>{amount}</Text>
			<TouchableOpacity onPress={onPlus} style={[styles.button, styleButton]}>
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
