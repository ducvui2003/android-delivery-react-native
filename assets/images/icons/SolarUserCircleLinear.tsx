/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:54 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg";

export default function SolarUserCircleLinear(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={1.5}>
        <Circle cx={12} cy={9} r={3}></Circle>
        <Circle cx={12} cy={12} r={10}></Circle>
        <Path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"></Path>
      </G>
    </Svg>
  );
}
