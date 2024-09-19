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
import {FluentLocation16Filled} from "../../../assets/images/icons/FluentLocation16Filled";

function BoxInfoNecessary({styleDescriptionInfo, descriptionInfo, titleInfo}: BoxInfoNecessaryProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	return (
		<Col style={styles.container}>
			<Row style={{justifyContent: "space-around"}}>
				<GradientIconSvg icon={<FluentLocation16Filled/>}
								 gradientColors={[primary.getColor("500"), primary.getColor("50")]}/>
				<Text>{titleInfo}</Text>
				<SolarArrowRightOutline/>
				<Text>Home</Text>
			</Row>

			<Row>
				{descriptionInfo instanceof Array ? descriptionInfo.map((description, index) => (
					<Text key={index} style={[textStyle["16_semibold"], styleDescriptionInfo]}>{description}</Text>
				)) : <Text style={[textStyle["16_semibold"], styleDescriptionInfo]}>{descriptionInfo}</Text>
				}
			</Row>
		</Col>
	)
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			...textStyle["16_regular"],
			backgroundColor: theme.background.getColor(),
			padding: 10,
			marginVertical: 10,
			borderRadius: 10,
			borderColor: theme.border.getColor(),
			borderWidth: 1,

		},

	})
export default BoxInfoNecessary;