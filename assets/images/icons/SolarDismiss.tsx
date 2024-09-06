/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:40 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarDismiss(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 12 12" {...props}>
      <Path
        fill="currentColor"
        d="m1.897 2.054l.073-.084a.75.75 0 0 1 .976-.073l.084.073L6 4.939l2.97-2.97a.75.75 0 1 1 1.06 1.061L7.061 6l2.97 2.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L6 7.061l-2.97 2.97A.75.75 0 1 1 1.97 8.97L4.939 6l-2.97-2.97a.75.75 0 0 1-.072-.976l.073-.084z"
      ></Path>
    </Svg>
  );
}
