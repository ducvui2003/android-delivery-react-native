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
import { StyleSheet, Text } from "react-native";
import Col from "../custom/Col";
import textStyle from "../../configs/styles/textStyle.config";
import { white } from "../../configs/colors/color-template.config";

const width = 14;
const height = 35;

function Cell({ value, focus }: CellProps) {
	const opacityAnim = useSharedValue(0);
	const topAmin = useSharedValue(0);

	useEffect(() => {
		if (!focus) {
			cancelAnimation(opacityAnim);
			runAnimationChangeValue(value);
		} else runAnimation();
	}, [focus, value]);

	const runAnimation = () => {
		opacityAnim.value = 1;
		opacityAnim.value = withRepeat(
			withSequence(withTiming(1, { duration: 500 }), withTiming(-1, { duration: 500 })),
			-1
		);
	};

	const animatedOpacity1 = useAnimatedStyle(() => ({
		opacity: opacityAnim.value,
	}));

	const animatedOpacity2 = useAnimatedStyle(() => ({
		opacity: 1 - opacityAnim.value,
	}));

	const runAnimationChangeValue = (value: number) => {
		topAmin.value = withTiming(-(value + 1) * height, { duration: 100 * (value + 1) });
	};

	const animatedTop = useAnimatedStyle(() => ({
		top: topAmin.value,
	}));

	return (
		<Row flex={0}>
			{focus ? (
				<>
					<Animated.Text style={[styles.text, animatedOpacity1]}>_</Animated.Text>
					<Animated.Text style={[styles.text, { fontSize: 25, position: "absolute" }, animatedOpacity2]}>
						*
					</Animated.Text>
				</>
			) : (
				<Col style={{ width, height, overflow: "hidden" }}>
					<Animated.View style={[{ flexDirection: "column" }, animatedTop]}>
						<Text style={[styles.text, { fontSize: 25 }]}>*</Text>
						<Text style={[styles.text]}>0</Text>
						<Text style={[styles.text]}>1</Text>
						<Text style={[styles.text]}>2</Text>
						<Text style={[styles.text]}>3</Text>
						<Text style={[styles.text]}>4</Text>
						<Text style={[styles.text]}>5</Text>
						<Text style={[styles.text]}>6</Text>
						<Text style={[styles.text]}>7</Text>
						<Text style={[styles.text]}>8</Text>
						<Text style={[styles.text]}>9</Text>
					</Animated.View>
				</Col>
			)}
		</Row>
	);
}

const styles = StyleSheet.create({
	text: { ...textStyle["22_semibold"], color: white.getColor(), width, height },
});

export default Cell;
