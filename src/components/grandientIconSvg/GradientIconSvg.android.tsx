/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import GradientProps from "./type/gradient.props";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

function GradientIconSvg({ style, icon, gradientColors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 } }: GradientProps) {
	const [sizeIcon, setSizeIcon] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 });

	return (
		<View>
			<View
				style={[{ opacity: 0, position: "absolute" }]}
				onLayout={event => {
					setSizeIcon({
						width: event.nativeEvent.layout.width,
						height: event.nativeEvent.layout.height,
					});
				}}
			>
				{icon}
			</View>
			<MaskedView style={style} maskElement={icon}>
				<LinearGradient colors={gradientColors} start={start} end={end} style={sizeIcon} />
			</MaskedView>
		</View>
	);
}

export default GradientIconSvg;
