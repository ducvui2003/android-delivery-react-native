/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:45 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React from 'react';
import Svg, {Path, SvgProps} from "react-native-svg";


export default function SolarHeartBold(props: SvgProps) {
    return (<Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
        <Path fill="currentColor"
              d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"></Path>
    </Svg>);
}
