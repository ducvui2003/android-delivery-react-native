/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from 'react';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import GradientProps from "./type/gradient.type";
import {LinearGradient} from "react-native-linear-gradient";

function GradientTextAndroid
({
     style,
     text,
     gradientColors,
     textStyle,
     start = {x: 0, y: 0},
     end = {x: 1, y: 1},
 }: GradientProps) {
    const [size, setSize] = React.useState<{ width: number, height: number }>({width: 0, height: 0});

    return (
        <View style={[style]}>
            <Text style={[textStyle, {opacity: 0, position: "absolute"}]} onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setSize({width: layout.width, height: layout.height})
            }}>{text}</Text>
            <MaskedView
                        maskElement={<Text style={[textStyle]}>{text}</Text>}>
                <LinearGradient
                    colors={gradientColors}
                    start={start}
                    end={end}
                    style={[style, {width: size.width, height: size.height}]}
                />
            </MaskedView>
        </View>
    );
}

export default GradientTextAndroid;
