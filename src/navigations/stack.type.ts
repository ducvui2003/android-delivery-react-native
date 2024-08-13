import {NavigatorScreenParams} from "@react-navigation/native";

export type RootStackParamList = {
    MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
    AnotherScreeHasNotHeaderScreen: undefined;
    LoadingScreen: undefined;
};

export type MainScreenStackParamList = {
    LoginScreen: NavigatorScreenParams<LoginScreenStackParamList>;
    TestThemeScreen: undefined;
};

export type LoginScreenStackParamList = {
    LoginFacebookFragment: undefined;
    LoginGoogleFragment: undefined;
};

