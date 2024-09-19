import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {OrderProps} from "./type/order.props";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Col from "../custom/Col";
import {ThemeType} from "../../types/theme.type";
import Row from "../custom/Row";
import OverlappingImages from "./OverlappingImages";
import textStyle from "../../configs/styles/textStyle.config";
import IconRating from "../rating/IconRating";
import StatusLabel from "./StatusLabel";
import {neutral, primary} from "../../configs/colors/color-template.config";
import formater from "../../utils/formater";

function Order({id, price, images, starReview, status, onPress}: OrderProps) {
	const theme = useSelector((root: RootState) => root.themeState.theme);
	const styles = makeStyled(theme);

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Row style={styles.content}>
				<View style={{flex: 0.7}}>
					<OverlappingImages images={images}/>
				</View>

				<Row style={styles.content}>
					<Col style={{justifyContent: "space-between"}}>
						<Text>Order ID: <Text style={styles.oderIdText}>{id}</Text></Text>
						<Text style={styles.priceText}>{formater.formatCurrency(price)}</Text>
						<IconRating total={5} rating={starReview}/>
					</Col>
					<Col style={{justifyContent: "center"}}>
						<StatusLabel status={status}/>
					</Col>
				</Row>

			</Row>

		</TouchableOpacity>
	);

}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background.getColor(),
			borderRadius: 12,
			marginHorizontal: 25,
			marginVertical: 5,
			padding: 10,
			shadowColor: "#0D0A2C",
			shadowOffset: {width: -50, height: 5},
			shadowOpacity: 0.2,
			shadowRadius: 10,
		},
		content :{
			justifyContent: "space-between",
		},
		oderIdText: {
			...textStyle["12_medium"],
			color: neutral.getColor("900"),
			fontWeight: "bold"
		},
		priceText: {
			...textStyle["16_semibold"],
			color: primary.getColor("500")
		},

	})

export default Order;