/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:08 AM - 04/10/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarPlain3Bold(props: SvgProps) {
  return (
    <Svg width="20" height="20" color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="m20.352 10.52l-1.716 5.15c-1.21 3.63-1.816 5.446-2.703 5.962c-.844.49-1.887.49-2.73 0c-.888-.516-1.493-2.331-2.703-5.962c-.195-.583-.292-.874-.455-1.118a2.2 2.2 0 0 0-.597-.597c-.244-.163-.535-.26-1.118-.454c-3.63-1.21-5.446-1.816-5.962-2.703a2.72 2.72 0 0 1 0-2.731C2.884 7.18 4.7 6.575 8.33 5.364l5.15-1.716c4.498-1.5 6.747-2.25 7.934-1.062s.438 3.436-1.062 7.935m-7.306.382a.75.75 0 0 1 .006-1.06l4.21-4.165a.75.75 0 1 1 1.055 1.067l-4.21 4.164a.75.75 0 0 1-1.061-.006"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
