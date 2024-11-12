/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:24 AM - 04/10/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarCheckReadLinear(props: SvgProps) {
  return (
    <Svg width="20" height="20" color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        d="m4 12.9l3.143 3.6L15 7.5m5 .063l-8.572 9L11 16"
      ></Path>
    </Svg>
  );
}
