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
import HeaderProps from "./type/header.type";
import textStyle from "../../configs/styles/textStyle.config";

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
}: HeaderProps) {
	const colorTitleArr: string[] = typeof colorTitle === "string" ? [colorTitle, colorTitle] : colorTitle;
	const colorIconArr: string[] = typeof colorIconBack === "string" ? [colorIconBack, colorIconBack] : colorIconBack;
	const [sizeIcon, setsizeIcon] = useState<number>(0);

	return (
		<Row style={[styles.defaultStyleContainer, style]}>
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
			<GradientText textStyle={titleStyle} text={title} gradientColors={colorTitleArr} />
			{iconRight ? (
				<TouchableOpacity
					style={[styles.defaultStyleIconBack, styleIconRight, { width: sizeIcon, height: sizeIcon }]}
					onPress={onPressBack}
				>
					{iconRight}
				</TouchableOpacity>
			) : (
				<View style={[{ opacity: 0, width: sizeIcon, height: sizeIcon }]} />
			)}
		</Row>
	);
}

const styles = StyleSheet.create({
	defaultStyleContainer: {
		justifyContent: "space-between",
		paddingHorizontal: 25,
		alignItems: "center",
		marginTop: 55,
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
