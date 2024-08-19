/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import GradientProps from "./type/gradient.type";
import { LinearGradient } from "expo-linear-gradient";

function GradientIconSvgAndroid({
	style,
	icon,
	gradientColors,
	start = { x: 0, y: 0 },
	end = { x: 1, y: 1 },
	height = "auto",
	width = "auto",
}: GradientProps) {
	return (
		<MaskedView style={style} maskElement={icon}>
			<LinearGradient
				colors={gradientColors}
				start={start}
				end={end}
				style={{ height: height, width: width }}
			/>
		</MaskedView>
	);
}

export default GradientIconSvgAndroid;
