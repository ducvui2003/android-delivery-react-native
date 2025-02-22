import type { SVGProps } from "react";
import React from "react";
import Svg, { Defs, G, Mask, Path, SvgProps } from "react-native-svg";

export function SolarCardBold(props: SvgProps & { color?: string }) {
  const { color = "black" } = props;

  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Defs>
        <Mask id="solarCardBold0">
          <G fill="none">
            <Path
              fill="#fff"
              d="M14 4h-4C6.229 4 4.343 4 3.172 5.172c-.844.843-1.08 2.057-1.146 4.078h19.948c-.066-2.021-.302-3.235-1.146-4.078C19.657 4 17.771 4 14 4m-4 16h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12q0-.662-.002-1.25H2.002Q1.999 11.338 2 12c0 3.771 0 5.657 1.172 6.828S6.229 20 10 20"
            ></Path>
            <Path
              fill={color} // Thay đổi fill thành giá trị từ props
              fillRule="evenodd"
              d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75m6.5 0a.75.75 0 0 1 .75-.75H14a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75"
              clipRule="evenodd"
            ></Path>
          </G>
        </Mask>
      </Defs>
      <Path fill={color} d="M0 0h24v24H0z" mask="url(#solarCardBold0)"></Path>
    </Svg>
  );
}
