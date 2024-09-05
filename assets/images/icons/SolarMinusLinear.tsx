/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:27 AM - 28/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarMinusLinear(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 448 512" {...props}>
      <Path
        fill="currentColor"
        d="M432 256c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32h352c17.7 0 32 14.3 32 32"
      ></Path>
    </Svg>
  );
}
