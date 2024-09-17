/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:21 PM - 13/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Row from "../custom/Row";
import ButtonPaymentMethodProps from "./type/buttonPaymentMethod.props";
import { CheckBox } from "@rneui/themed";
import spacing from "../../configs/styles/space.config";
import textStyle from "../../configs/styles/textStyle.config";
import BorderConfig from "../../configs/styles/border.config";
import { neutral, primary } from "../../configs/colors/color-template.config";

function ButtonPaymentMethod({
	icon,
	title,
	onChecked,
	checked = false,
	showCheckBox = true,
	onPress,
	titleStyle,
	containerStyle,
}: ButtonPaymentMethodProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<TouchableOpacity onPress={onPress}>
			<Row
				style={[
					styles.container,
					{ borderColor: theme.border.getColor(), backgroundColor: theme.basket.background.getColor() },
					containerStyle,
				]}
				flex={0}
			>
				<Row flex={0} style={[styles.titleContainer]}>
					{icon}
					<Text style={[styles.title, { color: theme.text_1.getColor() }, titleStyle]}>{title}</Text>
				</Row>
				{showCheckBox && (
					<CheckBox
						containerStyle={[styles.checkBox]}
						checked={checked}
						onPress={onChecked}
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						checkedColor={primary.getColor("500")}
						uncheckedColor={neutral.getColor("100")}
					/>
				)}
			</Row>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderStyle: "solid",
		borderRadius: BorderConfig.radius["rounded-2"],
		borderWidth: 1,
		padding: spacing["spaced-5"],
		justifyContent: "space-between",
	},
	titleContainer: {
		gap: spacing["spaced-2"],
		alignItems: "center",
	},
	title: {
		...textStyle["18_semibold"],
	},
	checkBox: {
		margin: 0,
		padding: 0,
		backgroundColor: undefined,
	},
});

export default ButtonPaymentMethod;
