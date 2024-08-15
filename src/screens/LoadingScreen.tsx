/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {Image, LinearProgress} from "@rneui/themed";
import Animated, {
    Easing,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {white} from "../configs/colors/color-template.config";
import brand from "../../assets/images/brand/brand_3.png";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigations/stack.type";

const duration = 2000;

function LoadingScreen() {
    const theme = useSelector((state: RootState) => state.themeState.theme);
    const sizeLogo = 180;
    const sizeTextNameApp = 40;
    const sizeTextVersion = 18;
    const sizeTextFooter = 22;
    const sizeTextNameAppAnim = useSharedValue(0);
    const sizeTextVersionAnim = useSharedValue(0);
    const sizeLogoAnim = useSharedValue(0);
    const sizeTextFooterAnim = useSharedValue(0);
    const transformAnim = useSharedValue(0);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "LoadingScreen">>()

    const animatedTransform = useAnimatedStyle(() => ({
        transform: [{translateY: transformAnim.value}],
    }));

    const animatedSizeLogo = useAnimatedStyle(() => ({
        width: sizeLogoAnim.value,
        height: sizeLogoAnim.value,
    }));

    const transformFontSize = (anim: SharedValue<number>) => {
        return useAnimatedStyle(() => ({
            fontSize: anim.value,
        }));
    }

    useEffect(() => {
        sizeLogoAnim.value = withTiming(sizeLogo, {
            duration
        });

        sizeTextNameAppAnim.value = withDelay(
            duration,
            withTiming(sizeTextNameApp, {
                duration
            })
        );

        sizeTextVersionAnim.value = withDelay(
            duration,
            withTiming(sizeTextVersion, {
                duration
            })
        );

        sizeTextFooterAnim.value = withDelay(
            duration,
            withTiming(sizeTextFooter, {
                duration
            })
        );

        transformAnim.value = withDelay(
            duration * 2,
            withRepeat(
                withSequence(
                    withTiming(
                        -100,
                        {
                            easing: Easing.ease,
                        }
                    ),
                    withSpring(0, {
                        damping: 5,
                    })
                ),
                3,
                false,
            ),
        );

        setTimeout(() => {
            navigation.navigate("WelcomeScreen");
        }, duration * 5);
    },);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme.primary.getColor("500"),
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{
                flex: 11,
            }}>
                <View style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Animated.Image source={brand} style={[
                        animatedSizeLogo,
                        animatedTransform
                    ]}/>
                    <Animated.Text style={[
                        transformFontSize(sizeTextNameAppAnim),
                        {
                            color: white.getColor(),
                            width: "100%",
                            height: "auto",
                            textAlign: "center",
                            fontWeight: "bold"
                        }
                    ]}>
                        SPEEDY CHOW
                    </Animated.Text>
                    <Animated.Text style={[
                        transformFontSize(sizeTextVersionAnim),
                        {
                            color: white.getColor(),
                            width: "100%",
                            height: "auto",
                            textAlign: "center",
                            fontWeight: "semibold",
                        }
                    ]}>
                        Version 2.1.0
                    </Animated.Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                    <Animated.Text
                        style={[
                            transformFontSize(sizeTextFooterAnim),
                            styles.textAppName
                        ]}
                    >As fast as lightning,</Animated.Text>
                    <Animated.Text
                        style={[
                            transformFontSize(sizeTextFooterAnim),
                            {
                                color: white.getColor(),
                                fontWeight: "semibold",
                                height: "auto",
                                width: "100%",
                                textAlign: "center"
                            }
                        ]}
                    >as delicious as thunder!</Animated.Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%"
            }}>
                <LinearProgress
                    style={{
                        marginVertical: 10,
                        backgroundColor: theme.primary.getColor("600")
                    }}
                    color={white.getColor(0.9)}
                />
            </View>
        </SafeAreaView>
    );
}

export default LoadingScreen;


const styles = StyleSheet.create({
    textAppName: {
        color: white.getColor(),
        width: "100%",
        height: "auto",
        textAlign: "center",
        fontWeight: "semibold",
    }
});
