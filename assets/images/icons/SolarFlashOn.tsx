/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:28 AM - 09/09/2024
 * User: lam-nguyen
 **/

import Svg, { Path, SvgProps } from "react-native-svg";
import { View } from "react-native";

export default function SolarFlashOn(props: SvgProps) {
  const width = props.width ? Number.parseInt(props.width.toString()) : 20;
  const height = props.height ? Number.parseInt(props.height.toString()) : 20;

  return (
    <View style={{ position: "relative", width, height, justifyContent: "center" }}>
      <Svg
        {...props}
        width={width * 0.375}
        height={height * 0.375}
        color={"black"}
        viewBox="0 0 24 24"
        style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
      >
        <Path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
          d="M12 4.5V3m0 18v-1.5m9-7.5h-1.5m-15 0H3m14.303-5.303l1.061-1.061M5.636 18.364l1.06-1.06m11.668 1.06l-1.06-1.06M6.696 6.696l-1.06-1.06M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0z"
        ></Path>
      </Svg>

      <Svg {...props} width={width * 0.875} height={height} color={"black"} viewBox="0 0 24 24" style={{ zIndex: 1 }}>
        <Path
          fill="currentColor"
          d="M7 3v9c0 .55.45 1 1 1h2v7.15c0 .51.67.69.93.25l5.19-8.9a.995.995 0 0 0-.86-1.5H13l2.49-6.65A.994.994 0 0 0 14.56 2H8c-.55 0-1 .45-1 1"
        ></Path>
      </Svg>
    </View>
  );
}
