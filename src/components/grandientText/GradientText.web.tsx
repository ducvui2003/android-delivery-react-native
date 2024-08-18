/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React, {CSSProperties} from 'react';
import {View} from 'react-native';
import GradientProps from "./type/gradient.type";
import GradientType from "./type/position.type";


function GradientTextWeb
({
     style,
     text,
     gradientColors,
     textStyle,
     start = {x: 0, y: 0},
     end = {x: 1, y: 1},
     height
 }: GradientProps) {
    const topLeft: GradientType = {x: 0, y: 0};
    const topRight: GradientType = {x: 1, y: 0}
    const bottomLeft: GradientType = {x: 0, y: 1}
    const bottomRight: GradientType = {x: 1, y: 1}
    const comparePosition = (a: GradientType, b: GradientType) => {
        return a.x === b.x && a.y === b.y;
    }

    const toGradientText = (start: GradientType, end: GradientType) => {
        if (comparePosition(start, topLeft) && comparePosition(end, topRight)) return "to right";
        if (comparePosition(start, topRight) && comparePosition(end, topLeft)) return "to left";
        if (comparePosition(start, topLeft) && comparePosition(end, bottomLeft)) return "to bottom";
        if (comparePosition(start, bottomLeft) && comparePosition(end, topLeft)) return "to top";
        if (comparePosition(start, topLeft) && comparePosition(end, bottomRight)) return "to right bottom";
        if (comparePosition(start, bottomLeft) && comparePosition(end, topRight)) return "to right top";
        if (comparePosition(start, topRight) && comparePosition(end, bottomLeft)) return "to left bottom";
        if (comparePosition(start, bottomRight) && comparePosition(end, topLeft)) return "to left top";
    }

    return (
        <View style={[style]}>
            <div style={{
                ...textStyle as CSSProperties,
                background: `linear-gradient(${toGradientText(start, end)}, ${gradientColors.join(",")})`,
                backgroundClip: "text",
                color: "transparent",
                flex: 1,
            }}>{text}</div>
        </View>
    );
};

export default GradientTextWeb;
