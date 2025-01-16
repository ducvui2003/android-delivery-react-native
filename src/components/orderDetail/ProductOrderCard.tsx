import ProductOrderCardProps from "./type/productOrderCard.props";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { ThemeType } from "../../types/theme.type";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../custom/Row";
import Col from "../custom/Col";
import SolarBag5Bold from "../../../assets/images/icons/SolarBag5Bold";
import { ORDER_STATUS_ACTIVE, ORDER_STATUS_COMPLETED } from "../../types/order.type";
import { neutral, primary } from "../../configs/colors/color-template.config";
import IconRating from "../rating/IconRating";
import { DiscountInfo } from "../../types/product.type";
import formater from "../../utils/formater";
import OptionsProductCard from "./OptionsProductCard";
import InputReviewArea from "./InputReviewArea";

function ProductOrderCard({
	name,
	price,
	image,
	rating,
	discountInfo,
	description,
	options,
	status,
	reorderOnPress,
	cameraOnPress,
	insertPictureOnPress,
}: ProductOrderCardProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const priceHasDiscount =
		Date.now() - (discountInfo as DiscountInfo)?.expired.getDate() < 0
			? price * (1 - (discountInfo as DiscountInfo).discount)
			: price;
	return (
		<View style={styles.container}>
			<Row style={styles.headerCard}>
				<View>
					<Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
				</View>

				<Row style={styles.headerCard}>
					<Col style={{ justifyContent: "flex-start", left: 10 }}>
						<Text style={{ ...textStyle["12_medium"], fontWeight: "bold", color: theme.text_1.getColor() }}>
							{name}
						</Text>
						<Row style={{ top: 5 }}>
							<Text
								style={{
									...textStyle["16_regular"],
									color: theme.text_1.getColor(),
									textDecorationLine: "line-through",
								}}
							>
								{formater.formatCurrency(price)}
							</Text>
							<Text
								style={{
									...textStyle["16_semibold"],
									color: primary.getColor("500"),
									left: 10,
								}}
							>
								{formater.formatCurrency(priceHasDiscount)}
							</Text>
						</Row>
					</Col>
					{!(status === ORDER_STATUS_ACTIVE) && (
						<Col style={{ justifyContent: "flex-end" }}>
							<TouchableOpacity onPress={reorderOnPress}>
								<Row style={styles.reorderButton}>
									<SolarBag5Bold color={"white"} />
									<Text style={{ color: "white", paddingHorizontal: 5 }}>Reorder</Text>
								</Row>
							</TouchableOpacity>
						</Col>
					)}
				</Row>
			</Row>
			{options !== undefined && (
				<View style={{ paddingVertical: 10 }}>
					<View style={{ borderWidth: 1, borderColor: neutral.getColor("50"), flexDirection: "row" }} />
				</View>
			)}
			{options !== undefined && <OptionsProductCard options={options} />}
			{status === ORDER_STATUS_COMPLETED && (
				<Col style={styles.contentCard}>
					<IconRating total={5} rating={rating.averageRating} />
				</Col>
			)}
			{status === ORDER_STATUS_COMPLETED && (
				<InputReviewArea
					placeholder={"Type your review ..."}
					value={description}
					styleInput={styles.styleInput}
					onPressIconLeft={cameraOnPress}
					onPressIconRight={insertPictureOnPress}
				/>
			)}
		</View>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			padding: 10,
			...textStyle["12_regular"],
			backgroundColor: theme.orderDetail.backgroundItem.getColor(),
			color: theme.text_1.getColor(),
			borderRadius: 10,
			marginVertical: 10,
			justifyContent: "space-between",
			shadowColor: "#0D0A2C",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.5,
			shadowRadius: 10,
			elevation: 5,
		},
		headerCard: {
			justifyContent: "space-between",
		},
		contentCard: {
			alignItems: "flex-start",
			paddingVertical: 10,
		},
		topping: {
			justifyContent: "space-between",
			paddingVertical: 5,
		},
		reorderButton: {
			padding: 8,
			borderRadius: 20,
			backgroundColor: primary.getColor("500"),
		},
		reviewArea: {
			borderRadius: 10,
			justifyContent: "space-between",
			backgroundColor: theme.background_input.getColor(),
		},
		styleInput: {
			padding: 15,
			borderBottomWidth: 0,
			...textStyle["16_regular"],
			color: theme.text_1.getColor(),
		},
		iconReviewArea: {
			padding: 10,
			justifyContent: "flex-end",
		},
	});

export default ProductOrderCard;
