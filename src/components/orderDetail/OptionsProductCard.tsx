import {GroupOptionType, OptionType} from "../../types/productDetail.type";
import {StyleSheet, Text, View} from "react-native";
import Row from "../custom/Row";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {ThemeType} from "../../types/theme.type";
import textStyle from "../../configs/styles/textStyle.config";
import {primary} from "../../configs/colors/color-template.config";
import formater from "../../utils/formater";
import Col from "../custom/Col";
import SolarDot from "../../../assets/images/icons/SolarDot";
import {useState} from "react";

export default function OptionsProductCard({options}: { options: (OptionType | GroupOptionType)[] }) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)

	return (
		<View>
			{options.map((option, index) => {
					if (isOptionType(option)) {
						return (
								<Row style={styles.container} key={index + option.name}>
									<Text style={{...textStyle["12_regular"], color: theme.text_1.getColor(),}}>{option.name}</Text>
									<Text style={{
										...textStyle["12_medium"],
										color: primary.getColor("500")
									}}>{formater.formatCurrency(option.price)}</Text>
								</Row>
						)
					}
					if (isGroupOptionType(option)) {
						return (
							<Row style={styles.container} key={index + option.name}>
								<Text style={{...textStyle["12_regular"], color: theme.text_1.getColor(),}}>{infoGroupOption(option).name}</Text>
								<Text style={{
									...textStyle["12_medium"],
									color: primary.getColor("500")
								}}>{formater.formatCurrency(infoGroupOption(option).price)}</Text>
							</Row>

						)
					}
				}
			)}
		</View>
	)

}

function isOptionType(option: OptionType | GroupOptionType): option is OptionType {
	return (option as OptionType).price !== undefined;
}

function isGroupOptionType(option: OptionType | GroupOptionType): option is GroupOptionType {
	return (option as GroupOptionType).options !== undefined;
}

const infoGroupOption = (option: GroupOptionType) => {
	let name = option.name + " ("
	let price = 0
	option.options.forEach((option) => {
		if(isOptionType(option)){
			name += option.name + ", "
			price += option.price
		}
		if(isGroupOptionType(option)){
			name += infoGroupOption(option)
		}
	})
	return {
		name: name.substring(0, name.length - 2) + ")",
		price: price
	}
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			justifyContent: "space-between",
			paddingVertical: 5,
		},

	})
