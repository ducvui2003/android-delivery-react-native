/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:58 PM - 19/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import Svg, {Path, SvgProps} from "react-native-svg";

export default function SolarBellBold(props: SvgProps) {
    return (<Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
        <Path fill="currentColor"
              d="M8.352 20.242A4.63 4.63 0 0 0 12 22a4.63 4.63 0 0 0 3.648-1.758a27.2 27.2 0 0 1-7.296 0M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"></Path>
    </Svg>);
}
