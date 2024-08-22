/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:52 PM - 18/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function SolarBellLinear(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={props.strokeWidth}>
        <Path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"></Path>
        <Path strokeLinecap="round" d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"></Path>
      </G>
    </Svg>
  );
}
