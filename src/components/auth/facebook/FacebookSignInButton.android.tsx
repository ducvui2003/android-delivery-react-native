/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import { StyleSheet, TouchableOpacity } from "react-native";
import { borderOthMethodSignIn } from "../../../configs/colors/color-template.config";
import { RootState } from "../../../configs/redux/store.config";
import { useSelector } from "react-redux";
import ButtonAuthProps from "../type/googleAuth.type";
import { Avatar } from "@rneui/themed";
import icon from "../../../../assets/images/icons/facebook_icon.png";
import * as React from "react";
import { useEffect } from "react";
import { AccessToken, LoginManager, Settings } from "react-native-fbsdk-next";

Settings.initializeSDK();

function FacebookSignInButtonAndroid({ loginSuccess, loginFail }: ButtonAuthProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const signIn = async () => {
		LoginManager.logInWithPermissions(["public_profile", "email"])
			.then(result => {
				if (result.isCancelled) {
					loginFail && loginFail();
					return;
				}
			})
			.catch(() => {
				loginFail && loginFail();
			});
	};

	const getAccessToken = () => {
		AccessToken.getCurrentAccessToken().then(accessToken => {
			loginSuccess && loginSuccess("");
		});
	};

	useEffect(() => {
		getAccessToken();
	}, []);

	return (
		<TouchableOpacity onPress={signIn}>
			<Avatar
				size={50}
				rounded
				source={icon}
				containerStyle={[styles.icon, { backgroundColor: theme.background.getColor() }]}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	icon: {
		borderColor: borderOthMethodSignIn.getColor(),
		borderStyle: "solid",
		borderWidth: 2,
		padding: 8,
	},
});

export default FacebookSignInButtonAndroid;
export const androidFacebookSignOut = () => LoginManager.logOut();
