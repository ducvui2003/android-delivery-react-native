/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import { SafeAreaView, Text } from "react-native";
import LoginScreen from "./mainSubScreens/LoginScreen";
import TestThemeScreen from "./mainSubScreens/TestThemeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreenStackParamList } from "../navigations/stack.type";
import { primary } from "../configs/colors/color-template.config";
import SignUpScreen from "./mainSubScreens/SignUpScreen";
import HomeScreen from "./home/HomeScreen";
import { VerificationScreen } from "./mainSubScreens/VerificationScreen";

const MainScreenTab = createBottomTabNavigator<MainScreenStackParamList>();

function MainScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<MainScreenTab.Navigator
				initialRouteName={"VerificationScreen"}
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: primary.getColor("200"),
					},
				}}
			>
				<MainScreenTab.Screen
					name="LoginScreen"
					options={{
						title: "Login",
						tabBarIcon: () => <Text>Icon Login</Text>,
					}}
					component={LoginScreen}
				/>
				<MainScreenTab.Screen
					name="SignUpScreen"
					options={{
						title: "sign up",
						tabBarIcon: () => <Text>Sign up Screen</Text>,
					}}
					component={SignUpScreen}
				/>
				<MainScreenTab.Screen
					name="HomeScreen"
					options={{
						title: "Home",
						tabBarIcon: () => <Text>Icon Home</Text>,
					}}
					component={HomeScreen}
				/>
				<MainScreenTab.Screen
					name="VerificationScreen"
					options={{
						title: "VerificationScreen",
						tabBarIcon: () => <Text>Icon VerificationScreen</Text>,
					}}
					component={VerificationScreen}
					initialParams={{ dialCode: "+84", phoneNumber: "855***919", codeVerify: "acds" }}
				/>
				<MainScreenTab.Screen
					name="TestThemeScreen"
					options={{
						title: "Login",
						tabBarIcon: () => <Text>Icon Test Theme</Text>,
					}}
					component={TestThemeScreen}
				/>
			</MainScreenTab.Navigator>
		</SafeAreaView>
	);
}

export default MainScreen;
