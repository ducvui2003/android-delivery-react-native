/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 1:44 PM - 10/09/2024
 * User: Binnguci
 **/

import type { SVGProps } from "react";
import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function SolarQuestionCircleBold(props: SvgProps) {
  return (
    <Svg width={30} height={30} color={"#BABDC1"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
        opacity={0.5}
      ></Path>
      <Path
        fill="currentColor"
        d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      ></Path>
    </Svg>
  );
}


