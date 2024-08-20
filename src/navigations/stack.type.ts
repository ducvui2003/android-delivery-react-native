import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
	MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
	LoadingScreen: undefined;
	WelcomeScreen: undefined;
	IntroduceScreen: undefined;
	ButtonNavigationScreen: undefined;
};

export type MainScreenStackParamList = {
	LoginScreen: undefined;
	TestThemeScreen: undefined;
	SignUpScreen: undefined;
	HomeScreen: undefined;
};

export type HomeScreenStackParamList = {
	HomeScreen: undefined;
	ProductsScreen: undefined;
};
