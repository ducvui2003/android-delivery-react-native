import type { SVGProps } from "react";
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function MdiDot(props: SvgProps) {
  return (
    <Svg width={70} height={70} color={"#FF6347"} viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2"></Path>
    </Svg>
  );
}
