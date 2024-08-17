/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import {SafeAreaView, Text} from "react-native";
import TestThemeScreen from "./mainSubScreens/TestThemeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {MainScreenStackParamList} from "../navigations/stack.type";
import Home from "./home/Home";

const MainScreenTab = createBottomTabNavigator<MainScreenStackParamList>();

function MainScreen() {
    const theme = useSelector((state: RootState) => state.themeState.theme);

    return (
        <SafeAreaView style={{flex: 1}}>
            <Home/>
            {/*<Text>Header!</Text>*/}
            {/*<MainScreenTab.Navigator*/}
            {/*    initialRouteName={"LoginScreen"}*/}
            {/*    screenOptions={{*/}
            {/*        headerShown: false,*/}
            {/*        tabBarStyle: {*/}
            {/*            backgroundColor: theme.primary.getColor("200"),*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <MainScreenTab.Screen name="LoginScreen"*/}
            {/*                          options={{*/}
            {/*                              title: "Login",*/}
            {/*                              tabBarIcon: () => (*/}
            {/*                                  <Text>Icon Login</Text>*/}
            {/*                              ),*/}
            {/*                          }}*/}
            {/*                          component={LoginScreen}/>*/}
            {/*    <MainScreenTab.Screen name="TestThemeScreen"*/}
            {/*                          options={{*/}
            {/*                              title: "Login",*/}
            {/*                              tabBarIcon: () => (*/}
            {/*                                  <Text>Icon Test Theme</Text>*/}
            {/*                              ),*/}
            {/*                          }}*/}
            {/*                          component={TestThemeScreen}/>*/}
            {/*</MainScreenTab.Navigator>*/}
        </SafeAreaView>
    );
}


export default MainScreen;
