/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:41 PM - 16/08/2024
 * User: lam-nguyen
 **/

import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

function Col({
	children,
	style,
	ref,
}: {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	keyCol?: string;
	ref?: React.LegacyRef<View>;
}) {
	return (
		<View
			style={[
				style,
				{
					flexDirection: "column",
				},
			]}
			ref={ref}
		>
			{children}
		</View>
	);
}

export default Col;
