import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
	MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
	LoadingScreen: undefined;
	WelcomeScreen: undefined;
	IntroduceScreen: undefined;
	SignUpScreen: undefined;
	LoginScreen: undefined;
	VerificationScreen: {
		dialCode: string;
		phoneNumber: string;
		codeVerify: string;
	};
	SettingPinSecurityScreen: undefined;
};

export type MainScreenStackParamList = {
	TestThemeScreen: undefined;
	HomeScreen: undefined;
	OrderScreen: undefined;
	LikedScreen: undefined;
	NotificationScreen: undefined;
	ProfileScreen: undefined;
};

export type HomeScreenStackParamList = {
	HomeScreen: undefined;
	ProductsScreen: undefined;
};
