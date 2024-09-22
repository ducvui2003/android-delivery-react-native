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

export default function OptionsProductCard({options}: { options: (OptionType | GroupOptionType)[] }) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)

	return (
		<View>
			{options.map((option, index) => {
				if (isOptionType(option)) {
					return (
						<Row style={styles.container} key={index + option.name}>
							<Text style={{...textStyle["12_regular"]}}>{option.name}</Text>
							<Text style={{
								...textStyle["12_medium"],
								color: primary.getColor("500")
							}}>{formater.formatCurrency(option.price)}</Text>
						</Row>
					)
				}
				if (isGroupOptionType(option)) {
					return (
						<Col>
							<Text style={{...textStyle["12_regular"]}}>{option.name}</Text>
							<Row style={{paddingHorizontal: 5, justifyContent: "space-between"}}>
								<SolarDot/>
								<OptionsProductCard options={option.options}/>
							</Row>

						</Col>

					)
				}
			})}
		</View>
	)

}

function isOptionType(option: OptionType | GroupOptionType): option is OptionType {
	return (option as OptionType).price !== undefined;
}

function isGroupOptionType(option: OptionType | GroupOptionType): option is GroupOptionType {
	return (option as GroupOptionType).options !== undefined;
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			justifyContent: "space-between",
			paddingVertical: 5
		},

	})
