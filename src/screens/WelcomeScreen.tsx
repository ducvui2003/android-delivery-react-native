/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:36 AM - 14/08/2024
 * User: lam-nguyen
 **/

import * as React from "react";
import { useEffect } from "react";
import { ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import background from "../../assets/images/introduce/welcome.png";
import textStyle from "../configs/styles/textStyle.config";
import { white } from "../configs/colors/color-template.config";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";

export function WelcomeScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "WelcomeScreen">>();

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (Platform.OS === "web") {
				navigation.replace("MainScreen", {
					screen: "HomeScreen",
				});

				return;
			}

			navigation.replace("IntroduceScreen");
		}, 2000);

		return () => clearTimeout(timeOut);
	}, []);

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
