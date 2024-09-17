/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:27 AM - 09/09/2024
 *  User: lam-nguyen
 **/

import Svg, { Path, SvgProps } from "react-native-svg";
import { View } from "react-native";

export default function SolarFlashAuto(props: SvgProps) {
  const width = props.width ? Number.parseInt(props.width.toString()) : 20;
  const height = props.height ? Number.parseInt(props.height.toString()) : 20;

  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      <Svg {...props} width={width * 0.875} height={height * 0.875} color={"black"} viewBox="0 0 24 24">
        <Path
          fill="currentColor"
          d="M3 3v10c0 .55.45 1 1 1h2v7.15c0 .51.67.69.93.25l5.19-8.9a.995.995 0 0 0-.86-1.5H9l3.38-7.59c.29-.67-.2-1.41-.92-1.41H4c-.55 0-1 .45-1 1m15-1c-.6 0-1.13.38-1.34.94L14.22 9.8c-.2.59.23 1.2.85 1.2c.38 0 .72-.24.84-.6L16.4 9h3.2l.49 1.4c.13.36.46.6.84.6c.62 0 1.05-.61.84-1.19l-2.44-6.86C19.13 2.38 18.6 2 18 2m-1.15 5.65L18 4l1.15 3.65z"
        ></Path>
      </Svg>
    </View>
  );
}
