import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { OrderProps } from "./type/order.props";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Col from "../custom/Col";
import { ThemeType } from "../../types/theme.type";
import Row from "../custom/Row";
import OverlappingImages from "./OverlappingImages";
import textStyle from "../../configs/styles/textStyle.config";
import IconRating from "../rating/IconRating";
import StatusLabel from "./StatusLabel";
import { neutral, primary, white } from "../../configs/colors/color-template.config";
import formater from "../../utils/formater";
import SolarPenBold from "../../../assets/images/icons/SolarPenBold";
import React from "react";
import { Role } from "../auth/const/authenticationConst";
import ProtectedRoute from "../auth/ProtectedRoute";

function Order({ id, price, images, starReview, status, onPress, role}: OrderProps) {
	const theme = useSelector((root: RootState) => root.themeState.theme);
	const styles = makeStyled(theme);

	return (
		<TouchableOpacity
			style={[styles.container, { backgroundColor: theme.basket.background.getColor() }]}
			onPress={onPress}
		>
			<Row style={styles.content}>
				<View style={{ flex: 0.7 }}>
					<OverlappingImages images={images} />
				</View>

				<Row style={styles.content}>
					<Col style={{ justifyContent: "space-between" }}>
						<Text style={{ color: theme.text_1.getColor() }}>
							Order ID: <Text style={[styles.oderIdText, { color: theme.text_1.getColor() }]}>{id}</Text>
						</Text>
						<Text style={styles.priceText}>{formater.formatCurrency(price)}</Text>
						<IconRating total={5} rating={starReview} />
					</Col>
					<Col style={{ justifyContent: "center", alignItems: "center", gap: 5}}>
						<StatusLabel status={status} />
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
			shadowOffset: { width: -50, height: 5 },
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 5,
		},
		content: {
			justifyContent: "space-between",
		},
		oderIdText: {
			...textStyle["12_medium"],
			color: neutral.getColor("900"),
			fontWeight: "bold",
		},
		priceText: {
			...textStyle["16_semibold"],
			color: primary.getColor("500"),
		},
		buttonEdit: {
			width: 42,
			backgroundColor: primary.getColor("500"),
			height: 42,
			borderRadius: 21,
			justifyContent: "center",
			alignItems: "center",
		},
	});

export default Order;
