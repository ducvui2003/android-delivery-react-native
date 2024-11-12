/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:11 PM - 04/10/2024
 *  User: lam-nguyen
 **/
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarMicrophone2Bold(props: SvgProps) {
  return (
    <Svg width="20" height="20" color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M9.75 7.75A.75.75 0 0 0 9 7H6.298a5.751 5.751 0 0 1 11.404 0H13.5a.75.75 0 0 0 0 1.5h4.25V10H13.5a.75.75 0 0 0 0 1.5h4.201a5.751 5.751 0 0 1-11.403 0H9A.75.75 0 0 0 9 10H6.25V8.5H9a.75.75 0 0 0 .75-.75"
      ></Path>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 9a.75.75 0 0 1 .75.75v1a7.25 7.25 0 1 0 14.5 0v-1a.75.75 0 0 1 1.5 0v1a8.75 8.75 0 0 1-8 8.718v2.282a.75.75 0 0 1-1.5 0v-2.282a8.75 8.75 0 0 1-8-8.718v-1A.75.75 0 0 1 4 9"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
