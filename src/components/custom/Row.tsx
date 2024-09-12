/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:41 PM - 16/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import { View } from "react-native";
import RowProps from "./type/row.props";

function Row({ children, style, ref, flex = 1 }: RowProps) {
	return (
		<View
			style={[
				style,
				{
					flexDirection: "row",
					flex,
				},
			]}
			ref={ref}
		>
			{children}
		</View>
	);
}

export default Row;
