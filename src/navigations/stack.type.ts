import { NavigatorScreenParams } from "@react-navigation/native";
import RegisterFormType from "../types/registerForm.type";
import CategoryType from "../types/category.type";

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
	CategoriesScreen: undefined;
	SearchScreen: {
		autoFocus: boolean;
		category?: CategoryType;
	};
	ProductDetailScreen: {
		id: string;
	};
	ReviewScreen: {
		id: string;
		name: string;
	};
	BasketScreen: {
		id: string;
	};
	OrderRatingScreen: { idOrder: string; idDriver: string };
	DriverRatingScreen: { uri?: string };
	GiveThanksScreen: undefined;
	MeatRatingScreen: { data?: any; uri?: string };
	CameraScreen: { data?: any; prevScreen: keyof RootStackParamList };
	PromotionScreen: undefined;
	PaymentMethodScreen: undefined;
	FaceIDScreen: undefined;
	TouchIDScreen: undefined;
	OrderTrackingScreen: undefined;
	// order detail
	OrderDetailScreen: {
		id: string
	}
};

export type MainScreenStackParamList = {
	TestThemeScreen: undefined;
	HomeScreen: undefined;
	OrderScreen: undefined;
	LikedScreen: undefined;
	NotificationScreen: undefined;
	ProfileScreen: undefined;
};
