import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { JSX, lazy, useEffect } from "react";
import { Platform, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider as ProviderRedux, useDispatch } from "react-redux";
import store, { AppDispatch } from "./src/configs/redux/store.config";
import LoadingModal from "./src/fragments/modal/LoadingModal";
import NotifyModal from "./src/fragments/modal/NotifyModal";
import { setTheme } from "./src/hooks/redux/theme.slice";
import { RootStackParamList } from "./src/navigations/stack.type";
import AddNewLocationScreen from "./src/screens/AddNewLocationScreen";
import BasketScreen from "./src/screens/BasketScreen";
import CameraScreen from "./src/screens/CameraScreen";
import CancelOrderScreen from "./src/screens/CancelOrderScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import ChatScreen from "./src/screens/ChatScreen";
import DriverRatingScreen from "./src/screens/DriverRatingScreen";
import FaceIDScreen from "./src/screens/FaceIDScreen";
import GiveThanksScreen from "./src/screens/GiveThanksScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import MeatRatingScreen from "./src/screens/MeatRatingScreen";
import MyLocationScreen from "./src/screens/MyLocationScreen";
import OrderDetailScreen from "./src/screens/OrderDetailScreen";
import OrderRatingScreen from "./src/screens/OrderRatingScreen";
import OrderTrackingScreen from "./src/screens/OrderTrackingScreen";
import PaymentMethodScreen from "./src/screens/PaymentMethodScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import PromotionScreen from "./src/screens/PromotionScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SettingPinSecurityScreen from "./src/screens/SettingPinSecurityScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TouchIDScreen from "./src/screens/TouchIDScreen";
import VerificationScreen from "./src/screens/VerificationScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { getFromStorage } from "./src/services/secureStore.service";
import { NameTheme } from "./src/types/theme.type";
import ChartScreen from "./src/screens/admin/ChartScreen";

const IntroduceScreen = lazy(() => import("./src/screens/IntroduceScreen"));

const RootStack = createStackNavigator<RootStackParamList>();

const provider =
    <ProviderRedux store={store}>
        <Root />
    </ProviderRedux>;

const readerRoot: Record<typeof Platform.OS, JSX.Element> = {
    web: <GoogleOAuthProvider clientId={process.env.EXPO_PUBLIC_WEB_CLIENT_ID as string}>
        {provider}
    </GoogleOAuthProvider>,
    ios: provider,
    macos: provider,
    android: provider,
    windows: provider,
};

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                {readerRoot[Platform.OS]}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

function Root() {
    const dispatch: AppDispatch = useDispatch();

    const colorScheme = useColorScheme();


    useEffect(() => {
        getFromStorage("theme").then(value => {
            if (!value) {
                if (!colorScheme) return;
                dispatch(setTheme(colorScheme));
                return;
            }
            dispatch(setTheme(value as NameTheme));
        });
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name={"MainScreen"} component={MainScreen} />
                    <RootStack.Screen name={"LoadingScreen"} component={LoadingScreen} />
                    <RootStack.Screen name={"WelcomeScreen"} component={WelcomeScreen} />
                    <RootStack.Screen name={"IntroduceScreen"} component={IntroduceScreen} />
                    <RootStack.Screen name={"SignUpScreen"} component={SignUpScreen} />
                    <RootStack.Screen name={"LoginScreen"} component={LoginScreen} />
                    <RootStack.Screen name={"VerificationScreen"} component={VerificationScreen} />
                    <RootStack.Screen name={"SettingPinSecurityScreen"} component={SettingPinSecurityScreen} />
                    <RootStack.Screen name={"AddNewLocationScreen"} component={AddNewLocationScreen} />
                    <RootStack.Screen name={"MyLocationScreen"} component={MyLocationScreen} />
                    <RootStack.Screen name={"CategoriesScreen"} component={CategoriesScreen} />
                    <RootStack.Screen name={"SearchScreen"} component={SearchScreen} />
                    <RootStack.Screen name={"ProductDetailScreen"} component={ProductDetailScreen} />
                    <RootStack.Screen name={"ReviewScreen"} component={ReviewScreen} />
                    <RootStack.Screen name={"BasketScreen"} component={BasketScreen} />
                    <RootStack.Screen name={"OrderRatingScreen"} component={OrderRatingScreen}
                                      initialParams={{ idDriver: "driver_1", idOrder: "SP 0023900" }} />
                    <RootStack.Screen name={"DriverRatingScreen"} component={DriverRatingScreen} />
                    <RootStack.Screen name={"GiveThanksScreen"} component={GiveThanksScreen} />
                    <RootStack.Screen name={"MeatRatingScreen"} component={MeatRatingScreen} />
                    <RootStack.Screen name={"CameraScreen"} component={CameraScreen} />
                    <RootStack.Screen name={"PromotionScreen"} component={PromotionScreen} />
                    <RootStack.Screen name={"PaymentMethodScreen"} component={PaymentMethodScreen} />
                    <RootStack.Screen name={"OrderTrackingScreen"} component={OrderTrackingScreen} />
                    <RootStack.Screen name={"FaceIDScreen"} component={FaceIDScreen} />
                    <RootStack.Screen name={"TouchIDScreen"} component={TouchIDScreen} />
                    <RootStack.Screen name={"OrderDetailScreen"} component={OrderDetailScreen} />
                    <RootStack.Screen name={"CancelOrderScreen"} component={CancelOrderScreen} />
                    <RootStack.Screen name={"ChatScreen"} component={ChatScreen} />
                    <RootStack.Screen name={"ChartScreen"} component={ChartScreen} />
                </RootStack.Navigator>
            </NavigationContainer>

            <LoadingModal />
            <NotifyModal />
        </View>
    );
}

