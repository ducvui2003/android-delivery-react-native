/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:28 PM - 12/09/2024
 *  User: lam-nguyen
 **/

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import { FlatList, PanGestureHandler } from "react-native-gesture-handler";
import { neutral } from "../../configs/colors/color-template.config";
import PopUpProps from "./type/popUp.props";
import spacing from "../../configs/styles/space.config";

function PopUp({
	header,
	body,
	footer,
	showed = false,
	onEndHide,
	hideHeader = false,
	hideFooter = false,
	height = 0.95,
	contentStyle,
}: PopUpProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const popUpAnim = useSharedValue(0);
	const heightContendPopUp = Dimensions.get("screen").height * height;
	const [visible, setVisible] = useState(showed);

	useEffect(() => {
		if (height < 0 || height > 1) throw Error("height is between 0 to 1!");
	}, []);

	const onEndHideHandle = useCallback(() => {
		setVisible(false);
		onEndHide?.();
	}, []);

	const dropAnimHandler = (value: "down" | "up") => {
		if (value === "down") Keyboard.dismiss();
		else setVisible(true);

		popUpAnim.value = withTiming(value === "down" ? -heightContendPopUp : 0, { duration: 750 }, finished => {
			if (value === "down" && finished) runOnJS(onEndHideHandle)();
		});
	};

	const animatePopUp = useAnimatedStyle(() => ({
		bottom: popUpAnim.value,
	}));

	useEffect(() => {
		dropAnimHandler(showed ? "up" : "down");
	}, [showed]);

	return (
		<View
			style={[
				{
					display: visible ? "flex" : "none",
				},
				styles.container,
			]}
		>
			<View style={[styles.background]} />
			<Animated.View
				style={[
					styles.contentContainer,
					{
						backgroundColor: theme.add_new_location.background.getColor(),
						height: `${height * 100}%`,
					},
					animatePopUp,
					contentStyle,
				]}
			>
				<PanGestureHandler
					onGestureEvent={event => {
						const { translationY } = event.nativeEvent;
						if (translationY < -20) {
							dropAnimHandler("up");
						}
						if (translationY > 20) {
							Keyboard.dismiss();
							dropAnimHandler("down");
						}
					}}
				>
					<View
						style={[
							styles.button,
							{
								backgroundColor: theme.add_new_location.drop_button.getColor(),
							},
						]}
					/>
				</PanGestureHandler>
				{!hideHeader && header}
				<FlatList
					data={[0]}
					showsVerticalScrollIndicator={false}
					style={{ width: "100%" }}
					renderItem={() => {
						return (
							<>
								{body}
								{!hideFooter && footer}
							</>
						);
					}}
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		position: "absolute",
		height: "100%",
		width: "100%",
		zIndex: 999999,
	},
	background: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: neutral.getColor("100"),
		opacity: 0.2,
	},
	contentContainer: {
		position: "absolute",
		width: "100%",
		height: "95%",
		padding: spacing["spaced-5"],
		justifyContent: "center",
		alignItems: "center",
		left: 0,
		borderTopLeftRadius: spacing["spaced-5"],
		borderTopRightRadius: spacing["spaced-5"],
	},
	button: {
		width: "40%",
		height: 15,
		borderRadius: 999,
		marginBottom: spacing["spaced-3"],
	},
});

export default PopUp;
