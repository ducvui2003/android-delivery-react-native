import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
function SolarArrowAlt(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m12.37 8.165l6.43 6.63c.401.414.158 1.205-.37 1.205H5.57c-.528 0-.771-.79-.37-1.205l6.43-6.63a.5.5 0 0 1 .74 0"
      ></Path>
    </Svg>
  );
}
export default SolarArrowAlt;
