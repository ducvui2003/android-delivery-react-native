import React, {useEffect} from "react";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "./src/configs/redux/store.config";
import {RootStackParamList} from "./src/navigations/stack.type";
import MainScreen from "./src/screens/rootScreens/MainScreen";
import store, {RootState} from "./configs/redux/store.config";
import MainScreen from "./screens/rootScreens/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";
import AnotherScreeHasNotHeaderScreen from "./src/screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";
import AnotherScreeHasNotHeaderScreen from "./screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";
// import {Settings} from "react-native-fbsdk-next";
import {RootStackParamList} from "./navigations/stackParamList/root.stack";


const RootTab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
    return (
        <Provider store={store}>
            <Root/>
        </Provider>
    );
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
                                    tabBarIcon: () => (
                                        <Text>Icon Main</Text>
                                    ),
                                }}
                                component={MainScreen}/>
                <RootTab.Screen name={"AnotherScreeHasNotHeaderScreen"}
                                options={{
                                    title: "Another has not header",
                                    tabBarIcon: () => (
                                        <Text>Icon Another</Text>
                                    ),
                                }}
                                component={AnotherScreeHasNotHeaderScreen}/>
            </RootTab.Navigator>
        </NavigationContainer>
    );
}
