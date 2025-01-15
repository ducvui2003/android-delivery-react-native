/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:02 pm
 * User: ducvui2003
 **/
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeType } from "../../../types/theme.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import textStyle from "../../../configs/styles/textStyle.config";
import React, { useEffect } from "react";
import { neutral, primary, secondary, white } from "../../../configs/colors/color-template.config";
import SolarStarOutline from "../../../../assets/images/icons/SolarStarOutline";
import Formater from "../../../utils/formater";
import { firebaseStorage } from "../../../configs/firebase/firebase.config";
import { ProductManageCardProps } from "./type/productManageCard.props";
import Row from "../../custom/Row";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import Col from "../../custom/Col";

function ProductManageCard({
							   product: { id, name, avgRating, price, discountInfo, image },
							   onEditPress,
						   }: ProductManageCardProps) {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [url, setUrl] = React.useState<string>("");

	useEffect(() => {
		try {
			firebaseStorage.ref(image).getDownloadURL().then(setUrl);
		} catch (e) {
		}
	}, [image]);

	return (
		<View style={styles.container} key={id}>
			<Row>
				{url ? (
					<Image source={{ uri: url }} style={styles.thumbnail} />
				) : (
					<View style={[styles.thumbnail, { backgroundColor: "gray" }]} />
				)}
				<TouchableOpacity onPress={onEditPress} style={styles.buttonEdit}>
					<View>
						<SolarPenBold width={26} height={26} color={white.getColor()} />
					</View>
				</TouchableOpacity>
				<View style={styles.content}>
					<Text style={styles.nameProduct} numberOfLines={1}>{name}</Text>
					<View style={styles.containerContent}>
						<SolarStarOutline width={14} height={14} color={secondary.getColor("500")} />
						<Text style={styles.star}>{avgRating}</Text>
					</View>
					<View style={[styles.containerContent, { overflow: "hidden" }]}>
						{discountInfo ?
							(<Col>
								<Text style={{ ...styles.currentPrice }}>
								{Formater.formatCurrency((price * (100 - discountInfo.discount)) / 100)}
							</Text>
								<Text style={{ ...styles.oldPrice }}>{Formater.formatCurrency(price)}</Text>
							</Col>)
							:
							(<Col>
								<Text style={{ ...styles.currentPrice }}>{Formater.formatCurrency(price)}</Text>
								<Text></Text>
							</Col>)
						}

					</View>
				</View>
			</Row>
		</View>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.home.product_card.background.getColor(),
			padding: 8,
			borderRadius: 12,
			elevation: 2,
			margin: 4,
			marginVertical: 8,
			position: "relative",
		},
		thumbnail: {
			width: "50%",
			height: "100%",
			borderRadius: 8,
		},
		editButton: {
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
			maxWidth: 150,
			paddingHorizontal: 8,
		},
		nameProduct: {
			...textStyle["12_medium"],
			color: theme.home.product_card.text.getColor(),
			fontWeight: "bold",
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
		buttonEdit: {
			width: 36,
			backgroundColor: primary.getColor("500"),
			height: 36,
			borderRadius: 25,
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: 0,
			right: 0,
		},
	});

export default ProductManageCard;
