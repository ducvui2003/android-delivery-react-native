/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:47 PM - 18/09/2024
 * User: lam-nguyen
 **/
import { StyleProp, ViewStyle } from "react-native";
import React from "react";

type StepProcessProps = {
	style?: StyleProp<ViewStyle>;
	stylesIcon?: StyleProp<ViewStyle>;
	iconStep: React.JSX.Element[];
	currentStep?: number;
	lineColorActive?: string;
	lineHeight?: number;
	lineColorNotActive?: string;
	colorIconActive?: string;
	colorIconNotActive?: string;
	iconSize?: number;
};

export default StepProcessProps;
