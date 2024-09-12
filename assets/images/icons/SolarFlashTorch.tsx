/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:28 AM - 09/09/2024
 * User: lam-nguyen
 **/

import Svg, { Path, SvgProps } from "react-native-svg";
import { View } from "react-native";

export default function SolarFlashTorch(props: SvgProps) {
  const width = props.width ? Number.parseInt(props.width.toString()) : 20;
  const height = props.height ? Number.parseInt(props.height.toString()) : 20;

  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      <Svg {...props} width={width * 0.875} height={height * 0.875} color={"black"} viewBox="0 0 24 24">
        <Path
          fill="currentColor"
          d="M7 3v9c0 .55.45 1 1 1h2v7.15c0 .51.67.69.93.25l5.19-8.9a.995.995 0 0 0-.86-1.5H13l2.49-6.65A.994.994 0 0 0 14.56 2H8c-.55 0-1 .45-1 1"
        ></Path>
      </Svg>
    </View>
  );
}
