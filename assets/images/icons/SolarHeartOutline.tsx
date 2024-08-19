/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 18/8/24 - 11:15 pm
 * User: ducvui2003
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SolarHeartOutline(props: SvgProps) {
  return (
    <Svg width="1.17" height="1" viewBox="0 0 28 24" {...props}>
      <Path
        fill="currentColor"
        d="M27.547 7.39c-.298-2.281-1.514-6.24-6.272-7.182a10.3 10.3 0 0 0-1.953-.209h-.153a7.9 7.9 0 0 0-5.378 2.145l.004-.004A7.92 7.92 0 0 0 8.403-.001h-.127q-1.05.015-2.03.221l.069-.012C.761 1.299.093 6.791.043 7.416v.021c-.286 2.997.473 10.598 13.472 16.437l.286.126l.278-.126C27.783 17.72 27.853 9.699 27.548 7.39zM13.24 3.521l.55.535l.55-.535a6.82 6.82 0 0 1 4.824-2.141h.125a10 10 0 0 1 1.781.191l-.063-.011c3.914.772 4.922 4.094 5.178 6.006a9.56 9.56 0 0 1-1.158 5.666l.025-.049c-1.849 3.607-5.638 6.736-11.262 9.309C1.861 17.042 1.145 10.252 1.396 7.569v-.028c.049-.522.598-5.082 5.172-5.986a9.6 9.6 0 0 1 1.7-.181h.141a6.82 6.82 0 0 1 4.829 2.143l.003.003z"
      ></Path>
    </Svg>
  );
}

export default SolarHeartOutline;
