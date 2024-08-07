/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {Image, LinearProgress} from "@rneui/themed";
import {white} from "../../configs/colors/color-template.config";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import textStyle from "../../configs/styles/textStyle.config";

const brand = require("../../assets/brand/brand_3.png");

const duration = 2000;

function LoadingScreen() {
    const theme = useSelector((state: RootState) => state.themeState.theme);
    const sizeLogo = 180;
    const sizeLogoAnim = useSharedValue(0);
    const offset = useSharedValue<number>(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{translateY: offset.value}],
    }));

    useEffect(() => {
        sizeLogoAnim.value = withTiming(sizeLogo, {
            duration: 2000
        });

        offset.value = withDelay(
            2000,
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
                -1
            ),
        );
    },);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme.primary.getColor("500")
        }}>
            <View style={{
                flex: 13,
            }}>
                <View style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Animated.View
                        style={[
                            {
                                width: sizeLogoAnim,
                                height: sizeLogoAnim,
                            },
                            animatedStyles
                        ]}
                    >
                        <Image source={brand} style={{
                            width: "100%",
                            height: "100%"
                        }}/>
                    </Animated.View>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: theme.neutral.getColor("600"),
                    alignItems: "center",
                }}>
                    <Text
                        style={[
                            textStyle["22_semibold"],
                            {
                                color: white.getColor()
                            }
                        ]}
                    >As fast as lightning,</Text>
                    <Text
                        style={[
                            textStyle["22_semibold"],
                            {
                                color: white.getColor()
                            }
                        ]}
                    >as delicious as thunder!</Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
