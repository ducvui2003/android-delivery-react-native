import React, {useEffect} from "react";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "./configs/redux/store.config";
import MainScreen from "./screens/rootScreens/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";
import AnotherScreeHasNotHeaderScreen from "./screens/rootScreens/AnotherScreeHasNotHeaderFooterScreen";
// import {Settings} from "react-native-fbsdk-next";
import {RootStackParamList} from "./navigations/stackParamList/root.stack";
import axios, {AxiosResponse} from "axios";


const RootTab = createBottomTabNavigator<RootStackParamList>()

export default function App() {

    const login = () => {
        axios.post<string, AxiosResponse<any>, any>('http://10.0.0.8:8081/api/v1/auth/login', {
                "email": "ducvui2003@gmail.com",
                "password": "123456Duc@."
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8082",
                },
                withCredentials: true
            },
        )
            .then(res => {
                console.log('cookie', res.data)
            });
    }

    useEffect(() => {
        // Settings.initializeSDK();
        login();
    }, []);

    return (
        <Provider store={store}>
            <Text>Hello World!</Text>
            {/*<Root/>*/}
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
