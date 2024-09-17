/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:22 PM - 13/09/2024
 * User: lam-nguyen
 **/

import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function SolarCalendar(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 24 24" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth={1.5}>
        <Path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"></Path>
        <Path strokeLinecap="round" d="M7 4V2.5M17 4V2.5"></Path>
        <Path strokeLinecap="round" d="M2.5 9h19"></Path>
      </G>
    </Svg>
  );
}
