import { Provider as ProviderRedux, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/navigations/stack.type";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import store from "./src/configs/redux/store.config";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./src/screens/MainScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { Platform, useColorScheme } from "react-native";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setTheme } from "./src/hooks/redux/theme.slice";
import SignUpScreen from "./src/screens/SignUpScreen";
import VerificationScreen from "./src/screens/VerificationScreen";
import SettingPinSecurityScreen from "./src/screens/SettingPinSecurityScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AddNewLocationScreen from "./src/screens/AddNewLocationScreen";
import MyLocationScreen from "./src/screens/MyLocationScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import BasketScreen from "./src/screens/BasketScreen";
import { JSX, lazy, useEffect } from "react";
import OrderRatingScreen from "./src/screens/OrderRatingScreen";
import DriverRatingScreen from "./src/screens/DriverRatingScreen";
import GiveThanksScreen from "./src/screens/GiveThanksScreen";

const IntroduceScreen = lazy(() => import("./src/screens/IntroduceScreen"));

const RootStack = createStackNavigator<RootStackParamList>()

const provider =
  <ProviderRedux store={store}>
        <Root/>
  </ProviderRedux>

const readerRoot: Record<typeof Platform.OS, JSX.Element> = {
    web: <GoogleOAuthProvider clientId={process.env.EXPO_PUBLIC_WEB_CLIENT_ID as string}>
        {provider}
    </GoogleOAuthProvider>,
    ios: provider,
    macos: provider,
    android: provider,
    windows: provider,
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                {readerRoot[Platform.OS]}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

function Root() {
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    useEffect(() => {
      if (!colorScheme) return;
      dispatch(setTheme(colorScheme));
    }, []);

    return (
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="GiveThanksScreen" screenOptions={{ headerShown: false }}>
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
            <RootStack.Screen name={"ReviewScreen"} component={ReviewScreen} initialParams={{}} />
            <RootStack.Screen name={"BasketScreen"} component={BasketScreen} />
            <RootStack.Screen name={"OrderRatingScreen"} component={OrderRatingScreen} />
            <RootStack.Screen name={"DriverRatingScreen"} component={DriverRatingScreen} />
            <RootStack.Screen name={"GiveThanksScreen"} component={GiveThanksScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
    );
}
