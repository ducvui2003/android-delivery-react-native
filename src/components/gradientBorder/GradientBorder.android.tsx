/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React, { useEffect } from "react";
import { View } from "react-native";
import GradientProps from "./type/gradient.props";
import GradientView from "../gradientView/GradientView";

function GradientBorder({
	gradientColors,
	children,
	start = { x: 0, y: 0 },
	end = { x: 1, y: 1 },
	borderWidth = 1,
	borderRadius = 9999,
	backgroundColorContent = "#fff",
}: GradientProps) {
	const [size, setSize] = React.useState<{ width: number; height: number }>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		if (borderWidth <= 0) throw new Error("Border width must be greater than 0");
	}, [borderWidth]);

	return (
		<View
			style={[
				{
					position: "relative",
					borderRadius,
					height: size.height + borderWidth * 2,
					width: size.width + borderWidth * 2,
					overflow: "hidden",
				},
			]}
		>
			<View
				style={[{ opacity: 0, position: "absolute" }]}
				onLayout={event => {
					const layout = event.nativeEvent.layout;
					setSize({ width: layout.width + 0.5, height: layout.height + 0.5 });
				}}
			>
				{children}
			</View>
			<GradientView
				gradientColors={gradientColors}
				start={start}
				end={end}
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					zIndex: 1,
				}}
			/>
			<View
				style={{
					position: "absolute",
					top: borderWidth,
					left: borderWidth,
					borderRadius,
					zIndex: 2,
					overflow: "hidden",
					backgroundColor: backgroundColorContent,
				}}
			>
				{children}
			</View>
		</View>
	);
}

export default GradientBorder;
