/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:08 PM - 06/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import GradientText from "../gradientText/GradientText";
import { gradient } from "../../configs/colors/color-template.config";
import Formater from "../../utils/formater";
import Row from "../custom/Row";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import OptionAddProps from "./type/optionAdd.props";

function OptionAdd({ price, name }: OptionAddProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Row style={{ justifyContent: "space-between" }}>
			<Text style={[{ ...textStyle["12_regular"], color: theme.text_1.getColor() }]}>Add {name}</Text>
			<GradientText
				gradientColors={gradient.getColor()}
				text={Formater.formatCurrency(price)}
				textStyle={[{ ...textStyle["12_regular"] }]}
			/>
		</Row>
	);
}

export default OptionAdd;
