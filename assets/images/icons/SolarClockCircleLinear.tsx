/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:34 AM - 21/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg";

export default function SolarClockCircleLinear(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={props.strokeWidth}>
        <Circle cx={12} cy={12} r={10}></Circle>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5"></Path>
      </G>
    </Svg>
  );
}
