/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:47 AM - 13/08/2024
 *  User: lam-nguyen
 **/

import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import axiosInstance, { ApiResponse } from "../../../configs/axios/axios.config";
import { AxiosError } from "axios";
import { GoogleSignin, isErrorWithCode, statusCodes, User } from "@react-native-google-signin/google-signin";
import { Authentication } from "../../../types/authentication.type";
import ButtonAuthProps from "../type/googleAuth.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { borderOthMethodSignIn } from "../../../configs/colors/color-template.config";
import LogosGoogleIcon from "../../../../assets/images/icons/LogosGoogleIcon";

GoogleSignin.configure({
	scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
	webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	// hostedDomain: '', // specifies a hosted domain restriction
	// forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
	// accountName: '', // [Android] specifies an account name on the device that should be used
	// iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
	// googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
	// openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
	// profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

function GoogleSignInButtonAndroid({ loginSuccess }: ButtonAuthProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const loginServerSide = async (authCode: string) => {
		axiosInstance
			.post<any, ApiResponse<Authentication>>("/auth/login-google-mobile", {
				authCode: authCode,
			})
			.then(result => {
				loginSuccess && loginSuccess(result.data.user.email);
			})
			.catch((error: AxiosError) => {
				console.error(error.code);
			});
	};

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo: User = await GoogleSignin.signIn();
			await loginServerSide(userInfo.serverAuthCode ? userInfo.serverAuthCode : "");
		} catch (error) {
			switchCaseError(error);
		}
	};

	const switchCaseError = (error: any) => {
		if (isErrorWithCode(error)) {
			switch (error.code) {
				case statusCodes.SIGN_IN_CANCELLED:
					break;
				case statusCodes.IN_PROGRESS:
					break;
				case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
					break;
				default:
			}
			return;
		}
	};

	return (
		<TouchableOpacity onPress={signIn} style={[styles.icon, { backgroundColor: theme.background.getColor() }]}>
			<LogosGoogleIcon width={30} height={30} />
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

export default GoogleSignInButtonAndroid;
export const androidGoogleSignOut = () => GoogleSignin.signOut();
