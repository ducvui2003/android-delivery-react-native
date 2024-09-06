/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:47 AM - 06/09/2024
 *  User: lam-nguyen
 **/
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { gradient, neutral } from "../../configs/colors/color-template.config";
import GradientView from "../gradientView/GradientView";
import LineRatingItemProps from "./type/lineRatingItem.props";

function LineRatingItem({ percent }: LineRatingItemProps) {
	const growAnim = useSharedValue(0);

	useEffect(() => {
		if (percent < 0 || percent > 100) {
			throw new Error("Percent must be in range [0, 100]");
		}

		growAnim.value = withTiming(percent, { duration: 1000 });
	}, []);

	const animatedGrow = useAnimatedStyle(() => ({
		right: `${100 - growAnim.value}%`,
	}));

	return (
		<View style={[styles.container]}>
			<Animated.View style={[animatedGrow, styles.line]}>
				<GradientView style={[{ height: "100%" }]} gradientColors={gradient.getColor()} />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 7,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: neutral.getColor("50"),
	},
	line: {
		borderRadius: 10,
		overflow: "hidden",
	},
});

export default LineRatingItem;
