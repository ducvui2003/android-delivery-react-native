import {Provider} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "./src/navigations/stack.type";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import store from "./src/configs/redux/store.config";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "./src/screens/MainScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import {WelcomeScreen} from "./src/screens/WelcomeScreen";
const IntroduceScreen = React.lazy(() => import("./src/screens/IntroduceScreen"));
import {Platform} from "react-native";
import {GoogleOAuthProvider} from "@react-oauth/google";
import React from "react";

const RootStack = createStackNavigator<RootStackParamList>()

const provider =
    <Provider store={store}>
        <Root/>
    </Provider>

const readerRoot: Record<typeof Platform.OS, React.JSX.Element> = {
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
            <Provider store={store}>
                <SafeAreaView style={{flex: 1}}>
                    {readerRoot[Platform.OS]}
                </SafeAreaView>
            </Provider>
        </SafeAreaProvider>
    );
}

function Root() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="LoadingScreen" screenOptions={{
                headerShown: false,
            }}>
                <RootStack.Screen name={"MainScreen"}
                                  component={MainScreen}/>
                <RootStack.Screen name={"LoadingScreen"}
                                  component={LoadingScreen}/>
                <RootStack.Screen name={"WelcomeScreen"}
                                  component={WelcomeScreen}/>
                <RootStack.Screen name={"IntroduceScreen"}
                                  component={IntroduceScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
