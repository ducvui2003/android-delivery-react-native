/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:27 PM - 28/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import Row from "../custom/Row";
import { CheckBox } from "@rneui/themed";
import textStyle from "../../configs/styles/textStyle.config";
import { neutral, primary } from "../../configs/colors/color-template.config";
import OptionItemProps from "./type/optionItem.props";

export function OptionItem({ name, price, beforeText, selected, onPress, icon, color }: OptionItemProps) {
	const groupIcon: Record<"square" | "circle", Icon> = {
		square: squareIcon,
		circle: circleIcon,
	};

	return (
		<Row style={{ justifyContent: "space-between", alignItems: "center" }}>
			<Row>
				{beforeText}
				<Text style={[styles.textDescribe]}>{name}</Text>
			</Row>
			<Row style={[{ gap: 3, alignItems: "center" }]} flex={0}>
				<Text style={[styles.textDescribe]}>{price}</Text>
				<CheckBox
					checked={selected}
					onPress={onPress}
					iconType={groupIcon[icon].iconType}
					checkedIcon={groupIcon[icon].checkedIcon}
					uncheckedIcon={groupIcon[icon].uncheckedIcon}
					checkedColor={primary.getColor("500")}
					size={28}
					containerStyle={{
						padding: 2,
						margin: 2,
						marginRight: 0,
						paddingRight: 0,
						backgroundColor: undefined,
					}}
					uncheckedColor={color}
				/>
			</Row>
		</Row>
	);
}

const styles = StyleSheet.create({
	textDescribe: {
		...textStyle["16_light"],
		color: neutral.getColor("300"),
	},
});

type Icon = {
	checkedIcon: "checkbox-marked" | "dot-circle-o";
	uncheckedIcon: "checkbox-blank-outline" | "circle-o";
	iconType?: "material-community";
};

const squareIcon: Icon = {
	checkedIcon: "checkbox-marked",
	uncheckedIcon: "checkbox-blank-outline",
	iconType: "material-community",
};
const circleIcon: Icon = {
	checkedIcon: "dot-circle-o",
	uncheckedIcon: "circle-o",
};
