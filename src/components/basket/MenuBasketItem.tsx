/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:13 PM - 06/09/2024
 *  User: lam-nguyen
 **/

import React, { ReactNode } from "react";
import Row from "../custom/Row";
import Col from "../custom/Col";
import GradientIconSvg from "../grandientIconSvg/GradientIconSvg";
import { gradient, neutral } from "../../configs/colors/color-template.config";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import SolarAltArrowRightOutline from "../../../assets/images/icons/SolarArrowRightOutline";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import MenuItemProps from "./type/menuItem.props";

function MenuBasketItem({ icon, title, footer, onPress, childRightTitle }: MenuItemProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<TouchableOpacity onPress={onPress}>
			<Row
				style={[
					{
						backgroundColor: theme.basket.background.getColor(),
						borderColor: theme.border.getColor(),
					},
					styles.container,
				]}
			>
				<Col style={{ gap: 10 }}>
					<Row style={{ alignItems: "center", gap: 5 }}>
						<GradientIconSvg gradientColors={gradient.getColor()} icon={icon} />
						<Text style={[{ ...textStyle["16_regular"], color: theme.text_1.getColor() }]}>{title}</Text>
						{childRightTitle}
					</Row>
					{footer}
				</Col>
				<SolarAltArrowRightOutline width={35} height={35} color={theme.text_1.getColor()} />
			</Row>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: "solid",
		gap: 10,
		padding: 15,
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default MenuBasketItem;
