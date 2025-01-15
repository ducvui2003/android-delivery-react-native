import React from "react";
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg";

function SolarUserOutline(props: SvgProps) {
  return (
    <Svg width={24} height={24} color={"black"} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={1.5}>
        <Circle cx={12} cy={6} r={4}></Circle>
        <Path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"></Path>
      </G>
    </Svg>
  );
}

export default SolarUserOutline;