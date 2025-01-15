import Svg, { Path, SvgProps } from "react-native-svg";
import React from "react";

export default function SolarAddCircleBold(props: SvgProps) {
  return (
    <Svg  width={48} height={48} color={"black"} viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" fillRule="evenodd"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.75-13a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
            clipRule="evenodd"></Path>
    </Svg>
  );
}