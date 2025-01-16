import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export function SolarChartOutline(props: SvgProps) {
    return (
        <Svg width={24} height={24} color={"black"} viewBox="0 0 24 24">
            <G fill="none" stroke="currentColor" strokeWidth={1.5}>
                <Path d="M6.222 4.601a9.5 9.5 0 0 1 1.395-.771c1.372-.615 2.058-.922 2.97-.33c.913.59.913 1.56.913 3.5v1.5c0 1.886 0 2.828.586 3.414s1.528.586 3.414.586H17c1.94 0 2.91 0 3.5.912c.592.913.285 1.599-.33 2.97a9.5 9.5 0 0 1-10.523 5.435A9.5 9.5 0 0 1 6.222 4.601Z"></Path>
                <Path d="M21.446 7.069a8.03 8.03 0 0 0-4.515-4.515C15.389 1.947 14 3.344 14 5v4a1 1 0 0 0 1 1h4c1.657 0 3.053-1.39 2.446-2.931Z"></Path>
            </G>
        </Svg>
    );
}

export default SolarChartOutline;
