/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:57 AM - 04/10/2024
 * User: lam-nguyen
 **/
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarVideocameraLinear(props: SvgProps) {
  return (
    <Svg width="20" height="20" color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        d="M2 11.5c0-3.287 0-4.931.908-6.038a4 4 0 0 1 .554-.554C4.57 4 6.212 4 9.5 4c3.287 0 4.931 0 6.038.908a4 4 0 0 1 .554.554C17 6.57 17 8.212 17 11.5v1c0 3.287 0 4.931-.908 6.038a4 4 0 0 1-.554.554C14.43 20 12.788 20 9.5 20c-3.287 0-4.931 0-6.038-.908a4 4 0 0 1-.554-.554C2 17.43 2 15.788 2 12.5zm15-2l.658-.329c1.946-.973 2.92-1.46 3.63-1.02c.712.44.712 1.528.712 3.703v.292c0 2.176 0 3.263-.711 3.703c-.712.44-1.685-.047-3.63-1.02L17 14.5z"
      ></Path>
    </Svg>
  );
}
