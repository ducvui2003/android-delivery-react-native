/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 2:15 pm
 * User: ducvui2003
 **/
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import TypographyGradientType from "./type/typographyGradient.type";

function TypographyGradient({ text, textStyle, linearGradientProps }: TypographyGradientType) {
	if (!linearGradientProps)
		linearGradientProps = {
			colors: ["#FF6CC9", "#736EFE"],
			start: { x: 0, y: 0 },
			end: { x: 1, y: 1 },
		};
	return (
		<MaskedView
			style={styles.maskedView}
			maskElement={
				<View style={styles.maskContainer}>
					<Text style={textStyle ? textStyle : styles.maskedText}>{text}</Text>
				</View>
			}
		>
			<LinearGradient {...linearGradientProps} style={styles.gradient} />
		</MaskedView>
	);
}

const styles = StyleSheet.create({
	maskedView: {
		alignSelf: "flex-start",
	},
	maskContainer: {
		alignItems: "center",
	},
	maskedText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "black", // This color is actually ignored by MaskedView, it's for layout purposes
	},
	gradient: {
		height: "100%",
		width: "100%",
	},
});

export default TypographyGradient;
