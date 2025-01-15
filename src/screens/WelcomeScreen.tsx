/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:36 AM - 14/08/2024
 * User: lam-nguyen
 **/

import * as React from "react";
import { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import background from "../../assets/images/introduce/welcome.png";
import textStyle from "../configs/styles/textStyle.config";
import { white } from "../configs/colors/color-template.config";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import { useAppDispatch } from "../configs/redux/store.config";
import { isServerAlive } from "../services/health.service";
import { isShowIntroduce } from "../services/client.service";
import { AuthType, initialStateAuth } from "../hooks/redux/auth.slice";
import { removeAllToken } from "../services/auth.service";
import { showModalNotify } from "../hooks/redux/modal.slice";

export default function WelcomeScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "WelcomeScreen">>();
	const [isAlive, setIsAlive] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		isServerAlive().then(isAlive => {
			if (isAlive) {
				setIsAlive(true);
			} else {
				dispatch(showModalNotify({ title: "Server is down", body: "Please wait", width: "70%" }));
			}
		});
	}, []);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			dispatch(initialStateAuth()).then(action => {
				switch (action.type) {
					case AuthType.GET_ACCOUNT_FULFILLED:
						navigation.replace("MainScreen", { screen: "HomeScreen" });
						break;
					case AuthType.GET_ACCOUNT_REJECTED:
						removeAllToken().finally(() => {
							isShowIntroduce().then(response => {
								if (response) {
									navigation.replace("IntroduceScreen");
								} else {
									navigation.replace("MainScreen", { screen: "HomeScreen" });
								}
							});
						});
						break;
				}
			});
		}, 2000);

		return () => clearTimeout(timeOut);
	}, [dispatch, isAlive, navigation]); // Server alive is running

	return (
		<SafeAreaView style={[style.container]}>
			<ImageBackground source={background} style={style.imageBackground} resizeMode={"stretch"}>
				<View style={style.viewContextTextButton}>
					<Text style={[textStyle["22_semibold"], style.welcomeText]}>Welcome to</Text>
					<Text style={[textStyle["40_semibold"], style.appNameText]}>SPEEDY CHOW</Text>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageBackground: {
		flex: 1,
		justifyContent: "flex-end",
		width: "100%",
	},
	viewContextTextButton: {
		justifyContent: "flex-start",
		alignItems: "center",
		height: "20%",
	},
	welcomeText: {
		color: white.getColor(),
		marginBottom: 5,
		fontWeight: "bold",
	},
	appNameText: {
		fontWeight: "bold",
		color: white.getColor(),
	},
});
