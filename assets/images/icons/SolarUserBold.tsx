/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:10 PM - 17/08/2024
 *  User: lam-nguyen
 **/

import React from 'react';
import Svg, {Circle, Path, SvgProps} from "react-native-svg";

function SolarUserBold(props: SvgProps) {
    return (<Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
        <Circle cx={12} cy={6} r={4} fill="currentColor"></Circle>
        <Path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"></Path>
    </Svg>);
}

export default SolarUserBold;
