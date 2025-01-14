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
	max,
	styleButton,
	styleText,
	sizeIcon = 25,
	min = 1,
	step = 1,
	current = 1,
	onMountCurrent,
	onPlusAction = () => true,
	onMinusAction = () => true,
	onPlusActionController,
	onMinusActionController,
}: InputNumberButtonProps) {
	const [amount, setAmount] = useState<number>(current);
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [canPlus, setCanPlus] = useState<boolean>(current < max);
	const [canMinus, setCanMinus] = useState<boolean>(current > min);

	const onPlus = () => {
		if (!canPlus) return;
		if (amount >= max) {
			setCanPlus(true);
			return;
		}
		if (amount >= max) return;
		if (onPlusActionController)
			onPlusActionController()
				.then(() => {
					onSetAmount(amount + step);
				})
				.catch(() => {
					return;
				});
		else if (onPlusAction()) onSetAmount(amount + step);

		if (amount + step >= max) {
			if (canPlus) setCanPlus(false);
		}
		if (!canMinus) {
			setCanMinus(true);
		}
	};

	const onMinus = () => {
		if (!canMinus) return;
		if (amount <= min) {
			setCanMinus(false);
			return;
		}
		if (onMinusActionController)
			onMinusActionController()
				.then(() => {
					onSetAmount(amount - step);
				})
				.catch(() => {
					return;
				});
		else if (onMinusAction()) onSetAmount(amount - step);

		if (amount - step <= min) {
			setCanMinus(false);
		}

		if (!canPlus) {
			setCanPlus(true);
		}
	};

	const onSetAmount = (value: number) => {
		if (onMountCurrent) onMountCurrent(value);
		setAmount(value);
	};

	return (
		<Row style={{ alignItems: "center" }}>
			<TouchableOpacity disabled={!canMinus} onPress={onMinus} style={[styles.button, styleButton]}>
				<SolarMinusLinear
					width={sizeIcon}
					height={sizeIcon}
					color={canMinus ? theme.text_1.getColor() : neutral.getColor("50")}
				/>
			</TouchableOpacity>
			<Text style={[styles.text, { color: theme.text_1.getColor() }, styleText]}>{amount}</Text>
			<TouchableOpacity disabled={!canPlus} onPress={onPlus} style={[styles.button, styleButton]}>
				<SolarAddLinear
					width={sizeIcon}
					height={sizeIcon}
					color={canPlus ? theme.text_1.getColor() : neutral.getColor("50")}
				/>
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
