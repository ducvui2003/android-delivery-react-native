/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:04 PM - 10/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect } from "react";
import ModalProps from "./type/modal.props";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const screen = Dimensions.get("window");

function Modal({ children, contentStyle, active, containerStyle, width = "80%", durationAnimation = 250 }: ModalProps) {
	const opacityAmin = useSharedValue(100);
	const [visible, setVisible] = React.useState(active);

	useEffect(() => {
		if (active) setVisible(active);
		else {
			setTimeout(() => {
				setVisible(active);
			}, durationAnimation);
		}
		opacityAmin.value = withTiming(active ? 100 : 0, { duration: durationAnimation });
	}, [active]);

	const animatedOpacity = useAnimatedStyle(() => ({
		opacity: opacityAmin.value / 100,
	}));

	return (
		<Animated.View style={[styles.container, animatedOpacity, { display: visible ? "flex" : "none" }]}>
			<View style={[styles.container, containerStyle, { zIndex: 99998 }]} />
			<View style={[contentStyle, { zIndex: 99999, width }]}>{children}</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		width: screen.width,
		height: screen.height,
		zIndex: 99997,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Modal;
