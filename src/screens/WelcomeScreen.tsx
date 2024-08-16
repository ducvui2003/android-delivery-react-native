/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:36 AM - 14/08/2024
 * User: lam-nguyen
 **/

import * as React from 'react';
import {ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import background from "../../assets/images/introduce/welcome.png"
import textStyle from "../configs/styles/textStyle.config";
import {white} from "../configs/colors/color-template.config";
import {CommonActions, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigations/stack.type";
import {useEffect} from "react";

export function WelcomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "WelcomeScreen">>()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (Platform.OS === "web") {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{
                            name: 'MainScreen',
                            params: {
                                screen: 'LoginScreen',
                                params: {
                                    screen: 'LoginGoogleFragment',
                                },
                            }
                        }],
                    })
                );

                return;
            }

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'IntroduceScreen'}],
                })
            );
        }, 2000);

        return () => clearTimeout(timeOut);
    }, []);

    return (
        <SafeAreaView style={[style.container]}>
            <ImageBackground source={background} style={style.imageBackground} resizeMode={"stretch"}>
                <View style={style.viewContextTextButton}>
                    <Text style={[
                        textStyle["22_semibold"],
                        style.welcomeText
                    ]}>Welcome to</Text>
                    <Text style={[
                        textStyle["40_semibold"],
                        style.appNameText
                    ]}>
                        SPEEDY CHOW
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
    },
    viewContextTextButton: {
        justifyContent: "flex-start",
        alignItems: "center",
        height: "20%",
    },
    welcomeText: {
        color: white.getColor(),
        marginBottom: 5,
        fontWeight: "bold"
    },
    appNameText: {
        fontWeight: "bold",
        color: white.getColor()
    },
})


