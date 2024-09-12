/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:44 AM - 21/08/2024
 * User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primary, white } from "../../configs/colors/color-template.config";
import textStyle from "../../configs/styles/textStyle.config";
import ButtonHasStatusProps from "./type/buttonHasStatus.props";
import NumberValue from "../../configs/value/number.value";

function ButtonHasStatus({
	title,
	styleButtonNotActive,
	styleButtonActive,
	styleButton,
	styleText,
	active = false,
	onPress,
	icon,
	side = "left",
}: ButtonHasStatusProps) {
	const button: Record<"true" | "false", ReactNode> = {
		true: (
			<TouchableOpacity
				style={[styles.buttonNotActive, styles.button, styleButton, styleButtonActive]}
				onPress={onPress}
			>
				{side === "left" && icon}
				<Text style={[styles.textButton, styleText]}>{title}</Text>
				{side === "right" && icon}
			</TouchableOpacity>
		),
		false: (
			<View style={[[styles.buttonNotActive, styleButton, styleButtonNotActive]]}>
				{side === "left" && icon}
				<Text style={[styles.textButton, styleText]}>{title}</Text>
				{side === "right" && icon}
			</View>
		),
	};

	return button[active.toString() as "true" | "false"];
}

const styles = StyleSheet.create({
	buttonNotActive: {
		paddingVertical: 16,
		backgroundColor: primary.getColor("100"),
		borderRadius: 999,
		alignItems: "center",
		marginBottom: NumberValue.marginBottomScreen,
		flexDirection: "row",
		justifyContent: "center",
	},
	button: {
		backgroundColor: primary.getColor("500"),
	},
	textButton: {
		...textStyle["18_semibold"],
		color: white.getColor(),
	},
});

export default ButtonHasStatus;
