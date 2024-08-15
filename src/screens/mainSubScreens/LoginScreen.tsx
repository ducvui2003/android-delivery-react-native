/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginFacebookFragment from "../../fragments/LoginFacebookFragment";
import LoginGoogleFragment from "../../fragments/LoginGoogleFragment";
import {LoginScreenStackParamList} from "../../navigations/stack.type";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import countries from "../../../assets/data/dialCodes/countries";
import Selector from "../../components/selector/Selector";
import CountryPhoneNumberType from "../../types/countryPhoneNumber.type";

const LoginScreenStack =
    createNativeStackNavigator<LoginScreenStackParamList>();

function LoginScreen() {
    const theme = useSelector((state: RootState) => state.themeState.theme);

    return (
        <SafeAreaView
            style={[styles.container, {backgroundColor: theme.background.getColor()}]}
        >
            <Text>Chào mừng bạn đến với chức năng đăng nhập!</Text>
            <View style={{padding: 20, flex: 1}}>
                <Selector<CountryPhoneNumberType> data={countries} renderItem={
                    (item, index) => {
                        return (
                            <Text style={styles.iconFlag}>{item.name}</Text>
                        );
                    }
                }/>
            </View>
            <LoginScreenStack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName={"LoginGoogleFragment"}
            >
                <LoginScreenStack.Screen
                    name={"LoginFacebookFragment"}
                    component={LoginFacebookFragment}
                />
                <LoginScreenStack.Screen
                    name={"LoginGoogleFragment"}
                    component={LoginGoogleFragment}
                />
            </LoginScreenStack.Navigator>
            <View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconFlag: {
        fontSize: 20,
    }
})

export default LoginScreen;
