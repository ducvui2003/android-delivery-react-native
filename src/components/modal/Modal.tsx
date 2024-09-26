/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:04 PM - 10/09/2024
 *  User: lam-nguyen
 **/

import React, { useCallback, useEffect } from "react";
import ModalProps from "./type/modal.props";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { neutral, white } from "../../configs/colors/color-template.config";
import borderConfig from "../../configs/styles/border.config";
import spacing from "../../configs/styles/space.config";
import SolarDismiss from "../../../assets/images/icons/SolarDismiss";

const screen = Dimensions.get("window");

function Modal({
	children,
	contentStyle,
	active,
	containerStyle,
	width = "80%",
	durationAnimation = 250,
	background,
	onEndHide,
}: ModalProps) {
	const opacityAmin = useSharedValue(100);
	const [visible, setVisible] = React.useState(active);

	const onEndHideHandle = useCallback(() => {
		setVisible(false);
		onEndHide?.();
	}, []);

	useEffect(() => {
		runAnimation(active);
	}, [active]);

	const runAnimation = useCallback((showed: boolean) => {
		if (showed) setVisible(showed);
		opacityAmin.value = withTiming(showed ? 100 : 0, { duration: durationAnimation }, finished => {
			if (!showed && finished) runOnJS(onEndHideHandle)();
		});
	}, []);

	const animatedOpacity = useAnimatedStyle(() => ({
		opacity: opacityAmin.value / 100,
	}));

	return (
		<Animated.View
			style={[
				styles.container,
				containerStyle,
				animatedOpacity,
				{ display: visible ? "flex" : "none", zIndex: 99999999 },
			]}
		>
			<View style={[styles.background, background && { ...background }]} />
			<View style={[styles.content, contentStyle, { width }]}>
				<TouchableOpacity style={[styles.buttonDismiss]} onPress={() => runAnimation(false)}>
					<SolarDismiss color={neutral.getColor("100")} width={25} height={25} />
				</TouchableOpacity>
				{children}
			</View>
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
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		width: screen.width,
		height: screen.height,
		backgroundColor: neutral.getColor("900"),
		opacity: 0.2,
	},
	content: {
		borderRadius: borderConfig.radius["rounded-2"],
		padding: spacing["spaced-5"],
		gap: spacing["spaced-5"],
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: white.getColor(),
	},
	buttonDismiss: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});

export default Modal;
