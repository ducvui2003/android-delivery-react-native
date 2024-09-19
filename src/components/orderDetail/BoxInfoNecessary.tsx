import BoxInfoNecessaryProps from "./type/boxInfoNecessary.props";
import Col from "../custom/Col";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {ThemeType} from "../../types/theme.type";
import {StyleSheet, Text} from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../custom/Row";
import SolarArrowRightOutline from "../../../assets/images/icons/SolarArrowRightOutline";
import GradientIconSvg from "../grandientIconSvg/GradientIconSvg";
import {primary} from "../../configs/colors/color-template.config";
import PromotionType from "../../types/promotion.type";
import PaymentMethodType from "../../types/paymentMethod.type";
import {MyLocation} from "../../../assets/data/location/location";

function BoxInfoNecessary({styleDescriptionInfo, descriptionInfo, titleInfo, iconTopRight}: BoxInfoNecessaryProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	return (
		<Col style={styles.container}>
			<Row>
				<GradientIconSvg icon={iconTopRight}
								 gradientColors={[primary.getColor("500"), primary.getColor("300")]}/>
				<Text style={{left: 10, marginBottom: 8}}>{titleInfo}</Text>
				{checkDescriptionInfo(descriptionInfo) === 2 &&
					<Row style={{left: 10}}><SolarArrowRightOutline/><Text
						style={[textStyle["16_semibold"], styleDescriptionInfo]}>{(descriptionInfo as MyLocation).name}</Text></Row>

				}
			</Row>

			<Row>
				{checkDescriptionInfo(descriptionInfo) === 0 && (descriptionInfo as Pick<PromotionType, "name">[]).map((description, index) => (
					<Text key={index} style={[textStyle["16_semibold"], styleDescriptionInfo]}>{description.name}</Text>
				))}

				{checkDescriptionInfo(descriptionInfo) === 2 ?
					<Text
						style={[textStyle["16_semibold"], styleDescriptionInfo]}>{(descriptionInfo as MyLocation).address}</Text>
					:
					<Text
						style={[textStyle["16_semibold"], styleDescriptionInfo]}>{(descriptionInfo as Pick<PaymentMethodType, "type">).type}</Text>
				}
			</Row>
		</Col>
	)
}

/*
	return 0 if descriptionInfo is array of string (Pick<PromotionType, "name">[])
	return 1 if descriptionInfo is PaymentMethodType
	return 2 if descriptionInfo is MyLocation
 */
function checkDescriptionInfo(descriptionInfo: Pick<PromotionType, "name">[] | Pick<PaymentMethodType, "type"> | MyLocation ): number {
	if(descriptionInfo instanceof Array) {
		return 0
	}
	if ('type' in descriptionInfo) {
		return 1
	}
	if ('address' in descriptionInfo) {
		return 2
	}
	return 0
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			...textStyle["16_regular"],
			backgroundColor: theme.background.getColor(),
			padding: 16,
			marginVertical: 10,
			borderRadius: 10,
			borderColor: theme.border.getColor(),
			borderWidth: 1,
		},

	})
export default BoxInfoNecessary;