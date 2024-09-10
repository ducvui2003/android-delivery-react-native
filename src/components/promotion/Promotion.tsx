/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 1:06 PM - 10/09/2024
 * User: Binnguci
 **/
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import Row from "../custom/Row";
import { StyleSheet, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { CheckBox } from "@rneui/themed";
import { neutral, primary } from "../../configs/colors/color-template.config";
import * as React from "react";
import PromotionProps from "./type/promotion.props";
import SolarTicketSaleBold from "../../../assets/images/icons/SolarTicketSaleBold";
import { SolarQuestionCircleBold } from "../../../assets/images/icons/SolarQuestionCircleBold";

export function Promotion({ name, checked = false, onCheck }: PromotionProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Row
			style={[
				{
					backgroundColor: theme.promotion.background.getColor(),
					borderColor: theme.border.getColor(),
					opacity: checked ? 1 : 0.5,
				},
				styles.container,
			]}
		>
			<SolarTicketSaleBold style={{ marginRight: 15 }} />
			<Row style={{ gap: 5, width: "70%", alignItems: "center" }}>
				<Text style={[{ ...textStyle["18_semibold"], color: theme.text_1.getColor() }]}>{name}</Text>
				<SolarQuestionCircleBold style={{ marginLeft: 5 }} />
			</Row>
			<CheckBox
				checked={checked}
				onPress={onCheck}
				iconType={"material-community"}
				checkedIcon={"checkbox-marked"}
				uncheckedIcon={"checkbox-blank-outline"}
				checkedColor={primary.getColor("500")}
				uncheckedColor={neutral.getColor("100")}
				size={26}
				containerStyle={{
					backgroundColor: theme.background.getColor(),
					padding: 0,
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
