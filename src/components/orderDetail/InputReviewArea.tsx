import InputIconProps from "../input/type/inputIcon.props";
import Col from "../custom/Col";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Row from "../custom/Row";
import SolarCameraBold from "../../../assets/images/icons/SolarCameraBold";
import {neutral, primary} from "../../configs/colors/color-template.config";
import {SolarMageImageFill} from "../../../assets/images/icons/SolarMageImageFill";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {ThemeType} from "../../types/theme.type";
import textStyle from "../../configs/styles/textStyle.config";

function InputReviewArea({placeholder, value, styleInput, onPressIconLeft, onPressIconRight}: InputIconProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	return (
		<Col style={styles.reviewArea}>
			<Col>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={theme.text_1.getColor()}
					multiline={true}
					style={styleInput}
					defaultValue={value}/>
			</Col>
			<Col >
				<Row style={styles.iconReviewArea}>
					<TouchableOpacity onPress={onPressIconLeft}>
						<SolarCameraBold width={30} height={30} style={{right: 10}} color={neutral.getColor("100")}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressIconRight}>
						<SolarMageImageFill width={30} height={30} color={neutral.getColor("100")}/>
					</TouchableOpacity>
				</Row>
			</Col>
		</Col>
	)
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		reviewArea: {
			borderRadius: 10,
			justifyContent: "space-between",
			backgroundColor: theme.background_input.getColor(),
		},
		styleInput: {
			padding: 15,
			borderBottomWidth: 0,
			...textStyle["16_regular"],
		},
		iconReviewArea: {
			padding: 10,
			justifyContent: "flex-end",
		},
		inputReview: {
			padding: 15,
			borderBottomWidth: 0,
			...textStyle["16_regular"],
		},

	})

export default InputReviewArea;