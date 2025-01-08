import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/configs/redux/store.config";
function SolarAltArrowRightOutline(props: SvgProps) {
  const theme = useSelector((state: RootState) => state.themeState.theme)
  return (
    <Svg width={20} height={20} color={theme.text_1.getColor()} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12L8.431 5.488a.75.75 0 0 1 .08-1.057"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export default SolarAltArrowRightOutline;
