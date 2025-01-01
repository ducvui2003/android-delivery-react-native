/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:55 PM - 26/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg";

export default function SolarMapPointLinear(props: SvgProps) {
  return (
    <Svg width={24} height={24} color={"black"} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={1.5}>
        <Path d="M4 10.143C4 5.646 7.582 2 12 2s8 3.646 8 8.143c0 4.462-2.553 9.67-6.537 11.531a3.45 3.45 0 0 1-2.926 0C6.553 19.812 4 14.606 4 10.144Z"></Path>
        <Circle cx={12} cy={10} r={3}></Circle>
      </G>
    </Svg>
  );
}
