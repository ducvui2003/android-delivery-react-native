/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:35 PM - 18/09/2024
 *  User: lam-nguyen
 **/

import React, { useCallback, useEffect } from "react";
import Row from "../custom/Row";
import { StyleSheet, View } from "react-native";
import { neutral, primary } from "../../configs/colors/color-template.config";
import spacing from "../../configs/styles/space.config";
import StepProcessProps from "./type/stepProcess.props";

function StepProcess({
	style,
	stylesIcon,
	iconStep,
	currentStep = 1,
	lineColorActive = primary.getColor("500"),
	lineColorNotActive = neutral.getColor("100"),
	lineHeight = 2,
	colorIconActive = primary.getColor("500"),
	colorIconNotActive = neutral.getColor("100"),
	iconSize = 20,
}: StepProcessProps) {
	useEffect(() => {
		if (iconStep.length === 0) throw new Error("StepProcess: iconStep is empty");
		if (iconStep.length === 1) throw new Error("StepProcess: iconStep must have at least 2 icons");
		if (currentStep <= 0) throw new Error("StepProcess: currentStep must be greater than 0");
		if (currentStep > iconStep.length)
			throw new Error("StepProcess: currentStep must be less than or equal to iconStep.length");
	}, [currentStep, iconStep.length]);

	const renderIcon = useCallback(
		(icon: React.JSX.Element, index: number) => (
			<View key={`step_${index}`} style={[styles.containerIconProcess, stylesIcon]}>
				{React.cloneElement(icon, {
					color: currentStep >= index + 1 ? colorIconActive : colorIconNotActive,
					textSize: iconSize,
					width: iconSize,
					height: iconSize,
					style: {
						color: currentStep >= index + 1 ? colorIconActive : colorIconNotActive,
						textSize: iconSize,
						width: iconSize,
						height: iconSize,
					},
				})}
			</View>
		),
		[stylesIcon, currentStep, colorIconActive, colorIconNotActive, iconSize]
	);

	return (
		<Row flex={0} style={[styles.container, style]}>
			{iconStep.map((icon, index) => {
				if (index === iconStep.length - 1) return renderIcon(icon, index);
				else
					return (
						<Row key={`step_${index}`} style={{ alignItems: "center" }}>
							{renderIcon(icon, index)}
							<View
								style={[
									styles.lineProcess,
									{
										height: lineHeight,
										backgroundColor:
											currentStep - 2 >= index ? lineColorActive : lineColorNotActive,
									},
								]}
							/>
						</Row>
					);
			})}
		</Row>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	containerIconProcess: {
		padding: spacing["spaced-2"],
		borderRadius: 9999,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: neutral.getColor("100"),
	},
	lineProcess: {
		flex: 1,
		backgroundColor: primary.getColor("500"),
	},
});

export default StepProcess;
