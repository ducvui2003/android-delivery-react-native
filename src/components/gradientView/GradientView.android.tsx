/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import GradientProps from "./type/gradient.type";
import { LinearGradient } from "expo-linear-gradient";

function GradientViewAndroid({
	style,
	gradientColors,
	start = { x: 0, y: 0 },
	end = { x: 1, y: 1 },
	children,
}: GradientProps) {
	return (
		<LinearGradient colors={gradientColors} start={start} end={end} style={style}>
			{children}
		</LinearGradient>
	);
}

export default GradientViewAndroid;
