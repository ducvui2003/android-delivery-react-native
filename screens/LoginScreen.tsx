/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import {SafeAreaView, Text} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreenStackParamList} from "../navigations/stack.type";
import LoginFacebookFragment from "../fragments/LoginFacebookFragment";
import LoginGoogleFragment from "../fragments/LoginGoogleFragment";

const LoginScreenStack = createNativeStackNavigator<LoginScreenStackParamList>()

function LoginScreen() {
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <Text>Chào mừng bạn đến với chức năng đăng nhập!</Text>
            <LoginScreenStack.Navigator screenOptions={{headerShown: false}} initialRouteName={"LoginGoogleFragment"}>
                <LoginScreenStack.Screen name={"LoginFacebookFragment"} component={LoginFacebookFragment}/>
                <LoginScreenStack.Screen name={"LoginGoogleFragment"} component={LoginGoogleFragment}/>
            </LoginScreenStack.Navigator>
        </SafeAreaView>
    );
}


export default LoginScreen;
