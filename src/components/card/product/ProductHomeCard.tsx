/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:02 pm
 * User: ducvui2003
 **/
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { ThemeType } from "../../../types/theme.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { ProductHomeCardProps } from "./type/productHomeCard.props";
import textStyle from "../../../configs/styles/textStyle.config";
import React from "react";
import { gradient, neutral, primary, secondary } from "../../../configs/colors/color-template.config";
import SolarStarOutline from "../../../../assets/images/icons/SolarStarOutline";
import SolarHeartOutline from "../../../../assets/images/icons/SolarHeartOutline";
import SolarHeartBold from "../../../../assets/images/icons/SolarHeartBold";
import GradientIconSvg from "../../grandientIconSvg/GradientIconSvg";
function ProductHomeCard({
	product: { name, rating, basePrice, salePrice, image, isLiked = false },
	onPress,
	onPressHeart,
}: ProductHomeCardProps) {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<View style={{ position: "relative" }}>
				<Image style={styles.thumbnail} src={image} />
				<TouchableOpacity onPress={onPressHeart} style={styles.heartContainer}>
					{!isLiked ? (
						<SolarHeartOutline width={18} height={18} color={primary.getColor("500")} />
					) : (
						<GradientIconSvg
							icon={<SolarHeartBold width={18} height={18} color={neutral.getColor("300")} />}
							gradientColors={gradient.getColor()}
						/>
					)}
				</TouchableOpacity>
			</View>
			<View style={styles.content}>
				<Text style={styles.nameProduct}>{name}</Text>
				<View style={styles.containerContent}>
					<SolarStarOutline width={14} height={14} color={secondary.getColor("500")} />
					<Text style={styles.star}>{rating}</Text>
				</View>
				<View style={styles.containerContent}>
					{salePrice ? (
						<>
							<Text style={{ ...styles.oldPrice }}>{basePrice + " VND"}</Text>
							<Text style={{ ...styles.currentPrice }}>{salePrice + " VND"}</Text>
						</>
					) : (
						<Text style={{ ...styles.currentPrice }}>{basePrice + " VND"}</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.home.product_card.background.getColor(),
			padding: 8,
			borderRadius: 12,
			elevation: 10,
		},
		thumbnail: {
			width: "100%",
			height: 100,
			borderRadius: 8,
		},
		heartContainer: {
			position: "absolute",
			top: 6,
			right: 6,
			width: 26,
			height: 26,
			backgroundColor: theme.home.product_card.background.getColor(),
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 25,
			elevation: 10,
		},
		content: {
			marginTop: 8,
			gap: 8,
			justifyContent: "flex-start",
		},
		nameProduct: {
			...textStyle["12_medium"],
			color: theme.home.product_card.text.getColor(),
		},
		containerContent: {
			flexDirection: "row",
			gap: 5,
			alignItems: "center",
		},
		star: {
			...textStyle["12_regular"],
			color: theme.home.product_card.text.getColor(),
		},
		oldPrice: {
			...textStyle["16_regular"],
			color: neutral.getColor("200"),
			textDecorationLine: "line-through",
		},
		currentPrice: {
			...textStyle["16_semibold"],
			color: primary.getColor("500"),
		},
	});

export default ProductHomeCard;
