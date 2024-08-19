/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:47 AM - 13/08/2024
 *  User: lam-nguyen
 **/

import * as React from "react";
import { googleLogout, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axiosInstance, { ApiResponse } from "../../../configs/axios/axios.config";
import { AxiosError } from "axios";
import { Authentication } from "../../../types/authentication.type";
import ButtonAuthProps from "../type/googleAuth.type";
import icon from "../../../../assets/images/icons/google_icon.png";
import { borderOthMethodSignIn } from "../../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";

function GoogleSignInButtonWeb({ email, loginSuccess, logoutSuccess }: ButtonAuthProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	const loginServerSide = async (accessToken: string) => {
		axiosInstance
			.post<any, ApiResponse<Authentication>>("/auth/login-google-web", {
				accessToken: accessToken,
			})
			.then(result => {
				loginSuccess && loginSuccess(result.data.user.email);
			})
			.catch((error: AxiosError) => {
				console.error(error.code);
			});
	};

	const onSuccess = (credentialResponse: TokenResponse) => {
		loginServerSide(credentialResponse.access_token).then();
	};
	const onError = (errorResponse: Pick<TokenResponse, any>) => {
		console.log(errorResponse);
	};

	const login = useGoogleLogin({
		onSuccess: onSuccess,
		onError: onError,
	});

	if (email)
		return (
			<View>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 20,
					}}
				>
					Xin chào {email} !
				</Text>
				<Button
					title={"Sign out"}
					onPress={async () => {
						logoutSuccess && logoutSuccess();
					}}
				/>
			</View>
		);

	return (
		<TouchableOpacity onPress={() => login()} style={[styles.container]}>
			<Image source={icon} style={[styles.icon, { backgroundColor: theme.background.getColor() }]} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderColor: borderOthMethodSignIn.getColor(),
		borderStyle: "solid",
		borderWidth: 2,
		padding: 8,
		borderRadius: 99999,
	},
	icon: {
		borderRadius: 99999,
		width: 40,
		height: 40,
	},
});

export default GoogleSignInButtonWeb;
export const webGoogleSignOut = () => googleLogout();
