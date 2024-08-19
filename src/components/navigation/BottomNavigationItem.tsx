/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:45 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {white} from "../../configs/colors/color-template.config";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import BottomNavigationItemProps from "./type/bottomNavigationItem.type";
import Col from "../custom/Col";
import GradientText from "../gradientText/GradientText";
import GradientView from "../gradientView/GradientView";

const BottomNavigationItem =
    ({
         icon,
         iconActive,
         backgroundIcon,
         backgroundIconActive,
         colorTitle,
         onPress,
         sizeIcon = 50,
         title,
         fontSize,
         transformTop = 5,
         durationAnimation = 500,
         state = useState(false),
         onActive,
         index,
         onDisabled
     }: BottomNavigationItemProps) => {
        const [status, setStatus] = state
        const transformIconAnim = useSharedValue(0)
        const iconActiveAnim = useSharedValue(0)
        const iconAmin = useSharedValue(100)
        const opacityTitleAnim = useSharedValue(0)
        const styles = createStyle(sizeIcon)
        const [transformIcon, setTransformIcon] = useState(0)
        const backgroundIconActiveArr = typeof backgroundIconActive === "string" ? [backgroundIconActive, backgroundIconActive] : backgroundIconActive
        const backgroundIconArr = typeof backgroundIcon === "string" ? [backgroundIcon, backgroundIcon] : backgroundIcon
        const colorTitleArr = typeof colorTitle === "string" ? [colorTitle, colorTitle] : colorTitle

        const animatedTransformIcon = useAnimatedStyle(() => ({
            transform: [{translateY: transformIconAnim.value}],
        }));

        const animatedIconActive = useAnimatedStyle(() => ({
            width: `${iconActiveAnim.value}%`,
            height: `${iconActiveAnim.value}%`,
        }))

        const animatedIcon = useAnimatedStyle(() => ({
            width: `${iconAmin.value}%`,
            height: `${iconAmin.value}%`,
        }))

        const animatedOpacityTitleAnim = useAnimatedStyle(() => ({
            opacity: opacityTitleAnim.value,
        }))

        const onPressDefault = () => {
            if (status) return;
            setStatus(true);
            runActive()
            onPress?.()
            onActive(index)
        }

        const runActive = () => {
            iconAmin.value = withTiming(0, {duration: durationAnimation})
            iconActiveAnim.value = withTiming(100, {duration: durationAnimation*3/5})
            opacityTitleAnim.value = withTiming(1, {duration: durationAnimation})
            transformIconAnim.value = withTiming(-transformIcon, {duration: durationAnimation})
        }

        const disabled = () => {
            if (status) return;
            setStatus(false);

            transformIconAnim.value = withTiming(0, {duration: durationAnimation*3/5})
            iconAmin.value = withTiming(100, {duration: durationAnimation})
            iconActiveAnim.value = withTiming(0, {duration: durationAnimation})
            opacityTitleAnim.value = withTiming(0, {duration: durationAnimation})
            onDisabled?.(index)
        }

        useEffect(() => {
            if (!status) return;
            runActive()
        }, [transformIcon]);

        useEffect(() => {
            if (status) return;
            disabled()
        }, [status]);

        return (
            <Col style={[styles.container]}>
                <Animated.View style={[
                    animatedTransformIcon,
                ]}>
                    <TouchableOpacity onPress={onPressDefault}>
                        <GradientView gradientColors={backgroundIconArr}
                                      style={[styles.containerIcon]}>
                            <Animated.View
                                style={[
                                    styles.containerIcon,
                                    {position: "absolute"},
                                    animatedIconActive,
                                ]}>
                                <GradientView style={[{width: "100%", height: "100%"}]}
                                              gradientColors={backgroundIconActiveArr}/>
                            </Animated.View>
                            <Animated.View
                                style={[animatedIconActive, styles.containerIcon, {position: "absolute", zIndex: 2}]}>
                                {iconActive}
                            </Animated.View>
                            <Animated.View style={[animatedIcon, styles.containerIcon, {position: "absolute"}]}>
                                {icon}
                            </Animated.View>
                        </GradientView>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.containerText, animatedOpacityTitleAnim]} onLayout={(event) => {
                    setTransformIcon(event.nativeEvent.layout.height + transformTop)
                }}>
                    <GradientText textStyle={{fontSize: fontSize, fontWeight: "bold"}}
                                  text={title}
                                  gradientColors={colorTitleArr}/>
                </Animated.View>
            </Col>
        );
    }
;


const createStyle = (size: number) => StyleSheet.create({
    container: {
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerIcon: {
        height: size,
        width: size,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    containerText: {
        position: "absolute",
    }
})

export default BottomNavigationItem;
