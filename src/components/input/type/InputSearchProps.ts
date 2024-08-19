import { ReactNode } from "react";
import InputProps from "./InputProps";

type InputSearchProps = InputProps & {
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
};
export default InputSearchProps;
