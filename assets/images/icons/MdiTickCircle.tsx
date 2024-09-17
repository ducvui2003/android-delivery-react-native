import type { SVGProps } from "react";
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function MdiTickCircle(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
      ></Path>
    </Svg>
  );
}
