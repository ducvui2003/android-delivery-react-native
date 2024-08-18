/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import {SafeAreaView, Text} from "react-native";
import LoginScreen from "./mainSubScreens/LoginScreen";
import TestThemeScreen from "./mainSubScreens/TestThemeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MainScreenStackParamList} from "../navigations/stack.type";
import {primary} from "../configs/colors/color-template.config";
import SignUpScreen from "./mainSubScreens/SignUpScreen";

const MainScreenTab = createBottomTabNavigator<MainScreenStackParamList>();

function MainScreen() {

    return (
        <SafeAreaView style={{flex: 1}}>
            <MainScreenTab.Navigator
                initialRouteName={"LoginScreen"}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: primary.getColor("200"),
                    },
                }}
            >
                <MainScreenTab.Screen name="LoginScreen"
                                      options={{
                                          title: "Login",
                                          tabBarIcon: () => (
                                              <Text>Icon Login</Text>
                                          ),
                                      }}
                                      component={LoginScreen}/>
                <MainScreenTab.Screen name="TestThemeScreen"
                                      options={{
                                          title: "Login",
                                          tabBarIcon: () => (
                                              <Text>Icon Test Theme</Text>
                                          ),
                                      }}
                                      component={TestThemeScreen}/>
                <MainScreenTab.Screen name="SignUpScreen"
                                      options={{
                                          title: "sign up",
                                          tabBarIcon: () => (
                                              <Text>Sign up Screen</Text>
                                          ),
                                      }}
                                      component={SignUpScreen}/>
            </MainScreenTab.Navigator>
        </SafeAreaView>
    );
}


export default MainScreen;
