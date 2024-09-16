import React from 'react';
import Svg, {Circle, G, SvgProps} from "react-native-svg";

export default function SolarMenuDotsLinear(props: SvgProps) {
    return (<Svg  width={26} height={26} color={"black"} viewBox="0 0 24 24" {...props}>
        <G fill="none" stroke="currentColor" strokeWidth={1.5}>
            <Circle cx={5} cy={12} r={2}></Circle>
            <Circle cx={12} cy={12} r={2}>
            </Circle>
            <Circle cx={19} cy={12} r={2}></Circle>
        </G></Svg>);
}