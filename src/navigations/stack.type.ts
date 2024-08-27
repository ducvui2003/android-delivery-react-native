import { NavigatorScreenParams } from "@react-navigation/native";
import RegisterFormType from "../types/registerForm.type";

export type RootStackParamList = {
	MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
	LoadingScreen: undefined;
	WelcomeScreen: undefined;
	IntroduceScreen: undefined;
	SignUpScreen: undefined;
	LoginScreen: undefined;
	VerificationScreen: {
		dialCode: string;
		form: RegisterFormType;
	};
	SettingPinSecurityScreen: undefined;
	AddNewLocationScreen: undefined;
	MyLocationScreen: undefined;
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
