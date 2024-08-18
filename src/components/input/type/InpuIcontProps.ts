/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:58 PM - 17/08/2024
 *  User: lam-nguyen
 **/
import InputProps from "./InputProps";
import {ReactNode} from "react";

type InputIconProps = InputProps & {
    icon?: ReactNode;
    side?: "left" | "right";
}

export default InputIconProps;
