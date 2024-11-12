/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:51 PM - 12/11/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { gradient, primary, white } from "../../configs/colors/color-template.config";
import textStyle from "../../configs/styles/textStyle.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { SolarLogin3Broken } from "../../../assets/images/icons/SolarLogin3Broken";
import GradientView from "../../components/gradientView/GradientView";

function ProfileHasNotUser({ onPress }: { onPress: () => void }) {
	return (
		<GradientView gradientColors={gradient.getColor()} style={[styles.container]}>
			<TouchableOpacity style={[styles.button]} onPress={onPress}>
				<SolarLogin3Broken color={primary.getColor("500")} />
				<Text style={[{ color: primary.getColor("500"), ...textStyle["18_semibold"] }]}>Login / Register</Text>
			</TouchableOpacity>
		</GradientView>
	);
}

export default ProfileHasNotUser;

const styles = StyleSheet.create({
	container: {
		borderRadius: 15,
		padding: 30,
		marginBottom: 15,
	},
	button: {
		borderRadius: 9999,
		backgroundColor: white.getColor(),
		gap: 10,
		flexDirection: "row",
		padding: 20,
		justifyContent: "center",
	},
});
