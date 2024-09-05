/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:18 PM - 28/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarDot(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2"></Path>
    </Svg>
  );
}
