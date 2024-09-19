/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:03 PM - 17/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Ellipse, G, Path, SvgProps } from "react-native-svg";

export default function SolarFaceScanCircleBroken(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 24 24" {...props}>
      <G fill="none">
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
        ></Path>
        <Ellipse cx={15} cy={10.5} fill="currentColor" rx={1} ry={1.5}></Ellipse>
        <Ellipse cx={9} cy={10.5} fill="currentColor" rx={1} ry={1.5}></Ellipse>
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M2.2 10A10.01 10.01 0 0 1 10 2.2M2.2 14a10.01 10.01 0 0 0 7.8 7.8M21.8 10A10.01 10.01 0 0 0 14 2.2M21.8 14a10.01 10.01 0 0 1-7.8 7.8"
        ></Path>
      </G>
    </Svg>
  );
}
