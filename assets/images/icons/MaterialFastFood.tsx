import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
function MaterialFastFood(props: SvgProps) {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
            <Path
                fill="currentColor"
                d="M13.325 13q-.8-1.125-2.112-1.562T8.5 11t-2.713.438T3.675 13zM1 15q0-2.725 2.275-4.362T8.5 9t5.225 1.638T16 15zm0 4v-2h15v2zm17 4v-2h1.4l1.4-14h-9.55L11 5h5V1h2v4h5l-1.65 16.55q-.075.625-.55 1.038T19.7 23zm0-2h1.4zM2 23q-.425 0-.712-.288T1 22v-1h15v1q0 .425-.288.713T15 23zm6.5-10"
            />
        </Svg>
    );
}
export default MaterialFastFood;
