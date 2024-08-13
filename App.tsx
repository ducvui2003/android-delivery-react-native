import React from "react";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "./src/configs/redux/store.config";
import {RootStackParamList} from "./src/navigations/stack.type";
import MainScreen from "./src/screens/rootScreens/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Platform, Text} from "react-native";
import AnotherScreeHasNotHeaderScreen from "./src/screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";
import {GoogleOAuthProvider} from "@react-oauth/google";


const RootTab = createBottomTabNavigator<RootStackParamList>()

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
    return readerRoot[Platform.OS];
}

function Root() {
    const theme = useSelector((state: RootState) => state.themeState.theme);

    return (
        <NavigationContainer>
            <RootTab.Navigator
                initialRouteName="MainScreen"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: theme.primary.getColor("500"),
                    },
                }}
            >
                <RootTab.Screen name={"MainScreen"}
                                options={{
                                    title: "Main",
                                    tabBarIcon: ({focused, color, size}) => (
                                        <Text>Icon Main</Text>
                                    ),
                                }}
                                component={MainScreen}/>
                <RootTab.Screen name={"AnotherScreeHasNotHeaderScreen"}
                                options={{
                                    title: "Another has not header",
                                    tabBarIcon: ({focused, color, size}) => (
                                        <Text>Icon Another</Text>
                                    ),
                                }}
                                component={AnotherScreeHasNotHeaderScreen}/>
            </RootTab.Navigator>
        </NavigationContainer>
    );
}
