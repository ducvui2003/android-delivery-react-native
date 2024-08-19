import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
	MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
	LoadingScreen: undefined;
	WelcomeScreen: undefined;
	IntroduceScreen: undefined;
};

export type MainScreenStackParamList = {
	LoginScreen: NavigatorScreenParams<LoginScreenStackParamList>;
	TestThemeScreen: undefined;
	SignUpScreen: undefined;
	HomeScreen: undefined;
};

export type LoginScreenStackParamList = {
	LoginFacebookFragment: undefined;
	LoginGoogleFragment: undefined;
};

export type HomeScreenStackParamList = {
	HomeScreen: undefined;
	ProductsScreen: undefined;
};
