import {StyleProp, TextStyle} from "react-native";
import React from "react";

type BoxInfoNecessaryProps = {
	iconTopRight: React.ReactNode,
	titleInfo: string,
	descriptionInfo: string | string[],
	styleDescriptionInfo?: StyleProp<TextStyle>
}

export default BoxInfoNecessaryProps;