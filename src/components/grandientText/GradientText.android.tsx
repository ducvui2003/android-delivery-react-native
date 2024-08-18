/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import GradientProps from "./type/gradient.type";
import { LinearGradient } from "expo-linear-gradient";

function GradientTextAndroid({
	style,
	text,
	gradientColors,
	textStyle,
	start = { x: 0, y: 0 },
	end = { x: 1, y: 1 },
	height = "auto",
}: GradientProps) {
	return (
		<MaskedView style={style} maskElement={<Text style={[textStyle]}>{text}</Text>}>
			<LinearGradient
				colors={gradientColors}
				start={start}
				end={end}
				style={{ height: height }}
			>
				<Text style={textStyle} />
			</LinearGradient>
		</MaskedView>
	);
}

export default GradientTextAndroid;
