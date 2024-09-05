/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:25 AM - 28/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SolarBag5Bold(props: SvgProps) {
  return (
    <Svg width={20} height={20} color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.25 7.002V6a3.75 3.75 0 1 1 7.5 0v1.002c2.684.012 4.11.12 4.91 1.096c.9 1.098.569 2.758-.095 6.079l-.6 3c-.462 2.309-.693 3.463-1.523 4.143c-.829.68-2.006.68-4.36.68H9.918c-2.355 0-3.532 0-4.362-.68c-.829-.68-1.06-1.834-1.522-4.143l-.6-3c-.664-3.32-.996-4.98-.096-6.079c.8-.976 2.227-1.084 4.911-1.096M9.75 6a2.25 2.25 0 0 1 4.5 0v1h-4.5zM15 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
