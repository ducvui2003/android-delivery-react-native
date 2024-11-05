/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:07 PM - 17/09/2024
 *  User: lam-nguyen
 **/

import Svg, { Path, SvgProps } from "react-native-svg";

export default function IonScan(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={44}
        d="M342 444h46a56 56 0 0 0 56-56v-46m0-172v-46a56 56 0 0 0-56-56h-46M170 444h-46a56 56 0 0 1-56-56v-46m0-172v-46a56 56 0 0 1 56-56h46"
      ></Path>
    </Svg>
  );
}
