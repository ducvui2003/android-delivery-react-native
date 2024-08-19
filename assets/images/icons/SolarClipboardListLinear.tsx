/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:16 PM - 19/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import Svg, {G, Path, SvgProps} from "react-native-svg";

export default function SolarClipboardListLinear(props: SvgProps) {
    return (<Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
        <G fill="none" stroke="currentColor" strokeWidth={1.5}>
            <Path
                d="M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877"></Path>
            <Path strokeLinecap="round" d="M10.5 14H17M7 14h.5M7 10.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"></Path>
            <Path
                d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></Path>
        </G>
    </Svg>);
}
