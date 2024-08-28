/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:41 PM - 16/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import { View } from "react-native";
import ColProps from "./type/col.props";

function Col({ children, style, ref }: ColProps) {
	return (
		<View
			style={[
				style,
				{
					flexDirection: "column",
					flex: 1,
				},
			]}
			ref={ref}
		>
			{children}
		</View>
	);
}

export default Col;
