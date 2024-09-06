/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:52 PM - 18/08/2024
 * User: lam-nguyen
 **/
import GradientType from "./position.props";
import { ReactNode } from "react";

type GradientProps = {
	children: ReactNode;
	gradientColors: string[];
	start?: GradientType;
	end?: GradientType;
	borderWidth?: number;
	borderRadius?: number;
	backgroundColorContent?: string;
};

export default GradientProps;
