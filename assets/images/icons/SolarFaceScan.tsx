/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:03 PM - 17/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Ellipse, G, Path, SvgProps } from "react-native-svg";
import { View } from "react-native";

export default function SolarFaceScan(props: SvgProps & { colorBorder?: string }) {
  const width = Number.parseInt(props.width?.toString() ?? "20");
  const height = Number.parseInt(props.height?.toString() ?? "20");

  return (
    <View style={{ position: "relative", justifyContent: "center", alignItems: "center", width, height }}>
      <Svg color={"black"} viewBox="0 0 24 24" {...props} width={width * 0.6} height={height * 0.6}>
        <G fill="none">
          <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
          ></Path>
          <Ellipse cx={15} cy={10.5} fill="currentColor" rx={1} ry={1.5}></Ellipse>
          <Ellipse cx={9} cy={10.5} fill="currentColor" rx={1} ry={1.5}></Ellipse>
          <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M2.2 10A10.01 10.01 0 0 1 10 2.2M2.2 14a10.01 10.01 0 0 0 7.8 7.8M21.8 10A10.01 10.01 0 0 0 14 2.2M21.8 14a10.01 10.01 0 0 1-7.8 7.8"
          ></Path>
        </G>
      </Svg>
      <Svg
        viewBox="0 0 512 512"
        {...props}
        width={width}
        height={height}
        style={{ position: "absolute" }}
        color={props.colorBorder ?? "black"}
      >
        <Path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={20}
          d="M342 444h46a56 56 0 0 0 56-56v-46m0-172v-46a56 56 0 0 0-56-56h-46M170 444h-46a56 56 0 0 1-56-56v-46m0-172v-46a56 56 0 0 1 56-56h46"
        ></Path>
      </Svg>
    </View>
  );
}
