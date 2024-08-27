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
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { primary, white } from "../../configs/colors/color-template.config";
import textStyle from "../../configs/styles/textStyle.config";

type Props = {
	title: string;
	active?: boolean;
	onPress?: () => void;
	styleText?: StyleProp<TextStyle>;
	styleButtonNotActive?: StyleProp<ViewStyle>;
	styleButtonActive?: StyleProp<ViewStyle>;
	styleButton?: StyleProp<ViewStyle>;
};

export function ButtonHasStatus({
	title,
	styleButtonNotActive,
	styleButtonActive,
	styleButton,
	styleText,
	active = false,
	onPress,
}: Props) {
	const button: Record<"true" | "false", ReactNode> = {
		true: (
			<TouchableOpacity
				style={[styles.buttonNotActive, styles.button, styleButton, styleButtonActive]}
				onPress={onPress}
			>
				<Text style={[styles.textButton, styleText]}>{title}</Text>
			</TouchableOpacity>
		),
		false: (
			<View style={[[styles.buttonNotActive, styleButton, styleButtonNotActive]]}>
				<Text style={[styles.textButton, styleText]}>{title}</Text>
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
		marginBottom: 25,
	},
	button: {
		backgroundColor: primary.getColor("500"),
	},
	textButton: {
		...textStyle["18_semibold"],
		color: white.getColor(),
	},
});
