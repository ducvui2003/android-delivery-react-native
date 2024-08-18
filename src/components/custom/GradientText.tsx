/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:19 AM - 18/08/2024
 * User: lam-nguyen
 **/


import React from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText =
    ({
         style,
         text,
         gradientColors,
         textStyle,
         start = {x: 0, y: 0},
         end = {x: 1, y: 1},
     }: {
        text: string,
        gradientColors: string[],
        textStyle?: StyleProp<TextStyle>
        style?: StyleProp<ViewStyle>
        start?: { x: number, y: number },
        end?: { x: number, y: number },
    }) => {
        return (
            <MaskedView style={style} maskElement={<Text style={[textStyle]}>{text}</Text>}>
                <LinearGradient
                    colors={gradientColors}
                    start={start}
                    end={end}
                    style={{height: "auto"}}
                >
                    <Text style={textStyle}/>
                </LinearGradient>
            </MaskedView>
        );
    };


export default GradientText;
