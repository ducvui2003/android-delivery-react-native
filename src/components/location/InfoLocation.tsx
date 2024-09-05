/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:09 PM - 26/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import Col from "../custom/Col";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { CheckBox } from "@rneui/themed";
import { neutral, primary } from "../../configs/colors/color-template.config";
import Row from "../custom/Row";
import InfoLocationProps from "./type/infoLocation,props";

export function InfoLocation({ name, address, checked = false, onCheck }: InfoLocationProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Row
			style={[
				{
					backgroundColor: theme.add_new_location.background.getColor(),
					borderColor: theme.border.getColor(),
				},
				styles.container,
			]}
		>
			<Col style={{ gap: 5, width: "90%" }}>
				<Text style={[{ ...textStyle["16_semibold"], color: theme.text_1.getColor() }]}>{name}</Text>
				<Text numberOfLines={1} style={[{ ...textStyle["18_semibold"], color: theme.text_1.getColor() }]}>
					{address}
				</Text>
			</Col>
			<CheckBox
				checkedColor={primary.getColor("500")}
				uncheckedColor={neutral.getColor("100")}
				checked={checked}
				onPress={onCheck}
				checkedIcon="dot-circle-o"
				uncheckedIcon="circle-o"
				size={30}
				containerStyle={{
					margin: 0,
					padding: 0,
					width: 30,
					height: 30,
					backgroundColor: theme.add_new_location.background.getColor(),
				}}
			/>
		</Row>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		padding: 15,
	},
});
