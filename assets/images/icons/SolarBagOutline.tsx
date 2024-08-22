import React from "react";
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg";
function SolarBagOutline(props: SvgProps) {
  return (
    <Svg width="1" height="1" viewBox="0 0 24 24" {...props}>
      <G fill="none">
        <Path
          stroke="currentColor"
          strokeWidth={props.strokeWidth}
          d="M3.794 14.97c.537 2.687.806 4.03 1.693 4.895q.247.24.53.434C7.04 21 8.41 21 11.15 21h1.703c2.739 0 4.108 0 5.13-.7q.285-.196.53-.435c.888-.865 1.157-2.208 1.694-4.894c.771-3.856 1.157-5.784.269-7.15a4 4 0 0 0-.56-.683C18.75 6 16.785 6 12.853 6H11.15c-3.934 0-5.9 0-7.066 1.138a4 4 0 0 0-.559.683c-.888 1.366-.502 3.294.27 7.15Z"
        ></Path>
        <Circle cx={15} cy={10} r={1} fill="currentColor"></Circle>
        <Circle cx={9} cy={10} r={1} fill="currentColor"></Circle>
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={props.strokeWidth}
          d="M9 6V5a3 3 0 1 1 6 0v1"
        ></Path>
      </G>
    </Svg>
  );
}
export default SolarBagOutline;
