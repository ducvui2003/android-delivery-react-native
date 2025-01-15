/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 4:42 PM - 10/09/2024
 * User: Binnguci
 **/
import { StyleSheet, Text, View } from "react-native";
import SolarTicketSaleBold from "../../assets/images/icons/SolarTicketSaleBold";
import Col from "../components/custom/Col";
import textStyle from "../configs/styles/textStyle.config";
import React from "react";
import PromotionType from "../types/promotion.type";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";

function InformationPromotionFragment(promotion: PromotionType) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	const durationMatched = () => {
		return (
			(promotion?.discountPromotionInfo.startDate ?? "") +
			" - " +
			(promotion?.discountPromotionInfo.expired ?? "")
		);
	};

	return (
		<Col flex={0} style={styles.format_position}>
			<Text style={[styles.title, { color: theme.text_1.getColor() }]}>Promotion Information</Text>
			<SolarTicketSaleBold width={100} height={100} />
			<Text style={[styles.nameText, { color: theme.text_1.getColor() }]}>{promotion?.name}</Text>
			<Col style={{ justifyContent: "flex-start", width: "100%" }}>
				<View style={styles.styleView}>
					<Text style={[styles.informationTitle, { color: theme.text_1.getColor() }]}>Description :</Text>
					<Text style={{ color: theme.text_1.getColor() }}>{promotion?.description}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={[styles.informationTitle, { color: theme.text_1.getColor() }]}>Duration :</Text>
					<Text style={{ color: theme.text_1.getColor() }}>{durationMatched()}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={[styles.informationTitle, { color: theme.text_1.getColor() }]}>Promo code :</Text>
					<Text style={{ color: theme.text_1.getColor() }}>{promotion?.promotionCode}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={[styles.informationTitle, { color: theme.text_1.getColor() }]}>
						Application Scope :
					</Text>
					<Text style={{ color: theme.text_1.getColor() }}>{promotion?.applicableScope}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={[styles.informationTitle, { color: theme.text_1.getColor() }]}>
						Discount Amount :{" "}
					</Text>
					<Text style={{ color: theme.text_1.getColor() }}>
						{promotion?.discountPromotionInfo.discount !== undefined &&
						promotion?.discountPromotionInfo.discount !== 0
							? promotion?.discountPromotionInfo.discount * 100 + "%"
							: "Free shipping"}
					</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={[styles.informationTitle, { color: theme.text_1.getColor() }]}>
						Terms and Conditions :
					</Text>
					<Text style={{ color: theme.text_1.getColor() }}>{promotion?.termsAndConditions}</Text>
				</View>
			</Col>
		</Col>
	);
}

export default InformationPromotionFragment;
const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	nameText: {
		...textStyle["18_semibold"],
		marginBottom: 20,
		marginTop: 20,
	},
	format_position: {
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	styleView: {
		alignItems: "flex-start",
		marginBottom: 10,
		width: "100%",
	},
	informationTitle: {
		...textStyle["16_semibold"],
	},
});
