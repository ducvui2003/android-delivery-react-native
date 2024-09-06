/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:34 AM - 06/09/2024
 *  User: lam-nguyen
 **/
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import SolarStarBold from "../../../assets/images/icons/SolarStarBold";
import GradientView from "../gradientView/GradientView";
import { gradient, white } from "../../configs/colors/color-template.config";
import SolarCheckBold from "../../../assets/images/icons/SolarCheckBold";
import * as React from "react";
import ButtonReviewProps from "./type/buttonReview.props";

function ButtonReview({ title, isSelected, hiddenIconLeft, hiddenIconRight, onPress }: ButtonReviewProps) {
	const theme = useSelector((root: RootState) => root.themeState.theme);

	if (!isSelected)
		return (
			<TouchableOpacity onPress={onPress}>
				<View
					style={[
						{
							backgroundColor: theme.review.backgroundButtonReview.getColor(),
						},
						styles.container,
					]}
				>
					<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>{title}</Text>
					{!hiddenIconRight && <SolarStarBold width={16} height={16} color={theme.text_1.getColor()} />}
				</View>
			</TouchableOpacity>
		);

	return (
		<TouchableOpacity>
			<GradientView gradientColors={gradient.getColor()} style={[styles.container]}>
				{!hiddenIconLeft && <SolarCheckBold width={16} height={16} color={white.getColor()} />}
				<Text style={[{ color: white.getColor(), ...textStyle["16_regular"] }]}>{title}</Text>
				{!hiddenIconRight && <SolarStarBold width={16} height={16} color={white.getColor()} />}
			</GradientView>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: "center",
		gap: 6,
	},
});

export default ButtonReview;
