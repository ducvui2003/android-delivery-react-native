import React from "react";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "./configs/redux/store.config";
import MainScreen from "./screens/rootScreens/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";
import AnotherScreeHasNotHeaderScreen from "./screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";
import {RootStackParamList} from "./navigations/stackParamList/root.stack";
import {createStackNavigator} from "@react-navigation/stack";
import LoadingScreen from "./screens/rootScreens/LoadingScreen";


const RootStack = createStackNavigator<RootStackParamList>()

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
            <RootStack.Navigator
                initialRouteName="MainScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <RootStack.Screen name={"LoaddingScreen"}
                                  component={LoadingScreen}/>
                <RootStack.Screen name={"MainScreen"}
                                  component={MainScreen}/>
                <RootStack.Screen name={"AnotherScreeHasNotHeaderScreen"}
                                  component={AnotherScreeHasNotHeaderScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
