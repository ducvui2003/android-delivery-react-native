/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:41 PM - 13/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect } from "react";
import CellProps from "./type/cell.Props";
import Row from "../custom/Row";
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import Col from "../custom/Col";
import textStyle from "../../configs/styles/textStyle.config";
import { white } from "../../configs/colors/color-template.config";

const width = 14;
const height = 35;

function Cell({ value, focus, color = white.getColor() }: CellProps) {
	const opacityAnim = useSharedValue(0);
	const topAmin = useSharedValue(0);

	useEffect(() => {
		runAnimationChangeValue(value);
		if (!focus) cancelAnimation(opacityAnim);
		else runAnimationOpacity();
	}, [focus, value]);

	const runAnimationOpacity = () => {
		opacityAnim.value = 1;
		opacityAnim.value = withRepeat(
			withSequence(withTiming(1, { duration: 500 }), withTiming(-1, { duration: 500 })),
			-1
		);
	};

	const animatedMinus = useAnimatedStyle(() => ({
		opacity: 1 - opacityAnim.value,
	}));

	const animatedStar = useAnimatedStyle(() => ({
		opacity: opacityAnim.value,
	}));

	const runAnimationChangeValue = (value: number) => {
		opacityAnim.value = 1;
		topAmin.value = withTiming(-(value + 1) * height, { duration: 100 * (value + 1) });
	};

	const animatedTop = useAnimatedStyle(() => ({
		top: topAmin.value,
	}));

	return (
		<Row flex={0}>
			<Col style={{ width, height, overflow: "hidden" }}>
				<Animated.View style={[{ flexDirection: "column" }, animatedTop]}>
					<View>
						<Animated.Text style={[styles.text, animatedMinus, { color, opacity: 0 }]}>_</Animated.Text>
						<Animated.Text
							style={[
								styles.text,
								{ fontSize: 25, position: "absolute", color, opacity: 1 },
								animatedStar,
							]}
						>
							*
						</Animated.Text>
					</View>
					<Text style={[styles.text, { color }]}>0</Text>
					<Text style={[styles.text, { color }]}>1</Text>
					<Text style={[styles.text, { color }]}>2</Text>
					<Text style={[styles.text, { color }]}>3</Text>
					<Text style={[styles.text, { color }]}>4</Text>
					<Text style={[styles.text, { color }]}>5</Text>
					<Text style={[styles.text, { color }]}>6</Text>
					<Text style={[styles.text, { color }]}>7</Text>
					<Text style={[styles.text, { color }]}>8</Text>
					<Text style={[styles.text, { color }]}>9</Text>
				</Animated.View>
			</Col>
		</Row>
	);
}

const styles = StyleSheet.create({
	text: { ...textStyle["22_semibold"], width, height },
});

export default Cell;
