import type { SVGProps } from "react";
import React from "react";
import Svg, { Circle, Ellipse, G, Path, SvgProps } from "react-native-svg";

export function SolarUsersGroupTwoRoundedLinear(props: SvgProps) {
  return (
    <Svg width="24" height="24" color={"black"} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={1.5}>
        <Circle cx={12} cy={6} r={4}></Circle>
        <Path
          strokeLinecap="round"
          d="M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4"
        ></Path>
        <Ellipse cx={12} cy={17} rx={6} ry={4}></Ellipse>
        <Path
          strokeLinecap="round"
          d="M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5"
        ></Path>
      </G>
    </Svg>
  );
}
