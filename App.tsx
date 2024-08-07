import React from "react";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "./configs/redux/store.config";
import {RootStackParamList} from "./navigations/stack.type";
import {createStackNavigator} from "@react-navigation/stack";
import TestThemeScreen from "./screens/TestThemeScreen";
import MainScreen from "./screens/rootScreens/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";
import AnotherScreeHasNotHeaderScreen from "./screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";


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
