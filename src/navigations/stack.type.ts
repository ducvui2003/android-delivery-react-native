import { NavigatorScreenParams } from "@react-navigation/native";
import RegisterFormType from "../types/registerForm.type";
import CategoryType from "../types/category.type";

export type RootStackParamList = {
	MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
	LoadingScreen: undefined;
	WelcomeScreen: undefined;
	IntroduceScreen: undefined;
	SignUpScreen: undefined;
	LoginScreen:
		| {
				back: boolean;
		  }
		| undefined;
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
	BasketScreen: undefined;
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
		id: number;
	};
	CancelOrderScreen: undefined;
	ChatScreen: undefined;

	// admin - manage product
	ProductManagerScreen: undefined;
	ModifyProductManageScreen: { id: string | undefined | null };
	ManagementOrderScreen: undefined;
	ManagementOrderDetailScreen: {
		id: number;
	};
	ChartScreen: undefined;
};

export type MainScreenStackParamList = {
	HomeScreen: undefined;
	OrderScreen: undefined;
	LikedScreen: undefined;
	NotificationScreen: undefined;
	ProfileScreen: undefined;
};
