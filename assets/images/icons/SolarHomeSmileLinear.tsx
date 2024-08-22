/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:20 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function SolarHomeSmileLinear(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={props.strokeWidth}>
        <Path d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z"></Path>
        <Path strokeLinecap="round" d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"></Path>
      </G>
    </Svg>
  );
}
