/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:55 PM - 28/08/2024
 * User: lam-nguyen
 **/
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type RowProps = {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	ref?: React.LegacyRef<View>;
	flex?: number;
};

export default RowProps;
