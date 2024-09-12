/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:47 AM - 13/08/2024
 *  User: lam-nguyen
 **/

import * as React from "react";
import { googleLogout, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axiosInstance, { ApiResponse } from "../../../configs/axios/axios.config";
import { AxiosError } from "axios";
import { Authentication } from "../../../types/authentication.type";
import ButtonAuthProps from "../type/buttonAuth.props";
import { borderOthMethodSignIn } from "../../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import LogosGoogleIcon from "../../../../assets/images/icons/LogosGoogleIcon";

function GoogleSignInButton({ email, loginSuccess, logoutSuccess }: ButtonAuthProps) {
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

	const useLogin = () => {
		useGoogleLogin({
			onSuccess: onSuccess,
			onError: onError,
		});
	};

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
		<TouchableOpacity onPress={useLogin} style={[styles.icon, { backgroundColor: theme.background.getColor() }]}>
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

export default GoogleSignInButton;
export const webGoogleSignOut = () => googleLogout();
