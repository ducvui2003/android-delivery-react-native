/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:29 PM - 12/11/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


export function SolarOption(props: SvgProps) {
  return (<Svg color={"black"} width="24" height="24" viewBox="0 0 256 256" {...props}>
    <Path fill="currentColor"
          d="M128 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16M48 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16m160-48a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16"></Path>
  </Svg>);
}

export default SolarOption;