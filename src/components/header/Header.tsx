/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:52 PM - 20/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Row from "../custom/Row";
import SolarArrowLeftLinear from "../../../assets/images/icons/SolarArrowLeftLinear";
import GradientText from "../gradientText/GradientText";
import GradientIconSvg from "../grandientIconSvg/GradientIconSvg";
import HeaderProps from "./type/header.props";
import textStyle from "../../configs/styles/textStyle.config";
import NumberValue from "../../configs/value/number.value";

export function Header({
	showIconBack = true,
	onPressBack,
	colorIconBack = "#fff",
	styleIconBack,
	sizeIconBack = 25,
	colorTitle = "#fff",
	title,
	titleStyle = { ...textStyle["22_semibold"] },
	style,
	iconRight,
	styleIconRight,
	strokeWidth = 2,
	onPressIconRight,
}: HeaderProps) {
	const colorTitleArr: string[] = typeof colorTitle === "string" ? [colorTitle, colorTitle] : colorTitle;
	const colorIconArr: string[] = typeof colorIconBack === "string" ? [colorIconBack, colorIconBack] : colorIconBack;
	const [sizeIcon, setsizeIcon] = useState<number>(0);

	return (
		<Row style={[styles.defaultStyleContainer, style]} flex={0}>
			{showIconBack && (
				<View style={[styles.defaultStyleIconBack, styleIconBack]}>
					<TouchableOpacity
						onPress={onPressBack}
						onLayout={event => {
							const layout = event.nativeEvent.layout;
							setsizeIcon(Math.max(layout.width, layout.height));
						}}
					>
						<GradientIconSvg
							icon={
								<SolarArrowLeftLinear
									width={sizeIconBack}
									height={sizeIconBack}
									strokeWidth={strokeWidth}
								/>
							}
							gradientColors={colorIconArr}
						/>
					</TouchableOpacity>
				</View>
			)}
			{typeof title === "string" ? (
				<GradientText textStyle={titleStyle} text={title} gradientColors={colorTitleArr} />
			) : (
				title
			)}
			{iconRight ? (
				<View style={[styles.defaultStyleIconBack, styleIconRight]}>
					<TouchableOpacity onPress={onPressIconRight}>{iconRight}</TouchableOpacity>
				</View>
			) : (
				<View style={[{ opacity: 0, width: sizeIcon, height: sizeIcon }]} />
			)}
		</Row>
	);
}

const styles = StyleSheet.create({
	defaultStyleContainer: {
		justifyContent: "space-between",
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		alignItems: "center",
		marginTop: NumberValue.marginTopScreen,
		marginBottom: 15,
	},
	defaultStyleIconBack: {
		padding: 8,
		borderRadius: 99999999,
		borderStyle: "solid",
		borderWidth: 0,
		borderColor: "gray",
		shadowRadius: 10,
		shadowOffset: { width: -100000, height: 5 },
		shadowColor: "#000",
		shadowOpacity: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
});
