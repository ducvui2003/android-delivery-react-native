/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:43 AM - 06/09/2024
 *  User: lam-nguyen
 **/
import SolarStarBold from "../../../assets/images/icons/SolarStarBold";
import IconRatingItemProps from "./type/iconRatingItem.props";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

function IconRatingItem({
	icon = <SolarStarBold />,
	iconSize = 20,
	colorSelected = "yellow",
	colorUnselected = "grey",
	percent,
	onSelect,
	index,
}: IconRatingItemProps) {
	useEffect(() => {
		if (percent < 0 || percent > 100) throw new Error("Percent must be in range [0, 100]");
	}, [percent]);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				onSelect?.(index);
			}}
		>
			<View style={[styles.container, { width: iconSize, height: iconSize }]}>
				<View
					style={[
						styles.left,
						{
							width: `${percent}%`,
						},
					]}
				>
					{React.cloneElement(icon, {
						color: colorSelected,
						width: iconSize,
						height: iconSize,
						style: {
							color: colorSelected,
							width: iconSize,
							height: iconSize,
						},
					})}
				</View>
				<View
					style={[
						{
							width: `${100.001 - percent}%`,
						},
						styles.left,
						styles.right,
					]}
				>
					{React.cloneElement(icon, {
						color: colorUnselected,
						width: iconSize,
						height: iconSize,
						style: {
							color: colorUnselected,
							width: iconSize,
							height: iconSize,
						},
					})}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	left: {
		position: "absolute",
		overflow: "hidden",
	},
	right: {
		right: 0,
		alignItems: "flex-end",
	},
});

export default IconRatingItem;
