/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import { StyleSheet, TouchableOpacity } from "react-native";
import { borderOthMethodSignIn } from "../../../configs/colors/color-template.config";
import ButtonAuthProps from "../type/buttonAuth.props";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import LogosFacebookIcon from "../../../../assets/images/icons/LogosFacebookIcon";

function FacebookSignInButton(_: ButtonAuthProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<TouchableOpacity style={[styles.icon, { backgroundColor: theme.background.getColor() }]}>
			<LogosFacebookIcon width={30} height={30} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	icon: {
		borderColor: borderOthMethodSignIn.getColor(),
		borderRadius: 9999,
		borderStyle: "solid",
		borderWidth: 2,
		padding: 8,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default FacebookSignInButton;
