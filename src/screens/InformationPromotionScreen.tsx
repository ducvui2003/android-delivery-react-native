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
import { SafeAreaView } from "react-native-safe-area-context";
import Space from "../components/custom/Space";
import React from "react";
import NumberValue from "../configs/value/number.value";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";

type InformationPromotionScreenProps = {
	route: RouteProp<RootStackParamList, "InformationPromotionScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function InformationPromotionScreen({
	route: {
		params: { promotion },
	},
	navigation,
}: InformationPromotionScreenProps) {
	return (
		<SafeAreaView style={styles.container}>
			<Col style={styles.format_position}>
				<Text style={styles.title}>Promotion Information</Text>
				<SolarTicketSaleBold width={100} height={100} />
				<Text style={styles.nameText}>FREE SHIP</Text>
				<View style={styles.styleView}>
					<Text style={styles.informationTitle}>Descrription :</Text>
					<Text>{promotion.description}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={styles.informationTitle}>Duration :</Text>
					<Text>{promotion.duration}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={styles.informationTitle}>Promo code :</Text>
					<Text>{promotion.promotionCode}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={styles.informationTitle}>Application Scope :</Text>
					<Text>{promotion.applicableScope}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={styles.informationTitle}>Discount Amount : </Text>
					<Text>{promotion.discountAmount}</Text>
				</View>
				<View style={styles.styleView}>
					<Text style={styles.informationTitle}>Terms and Conditions : </Text>
					<Text>{promotion.termsAndConditions}</Text>
				</View>
				<Space height={400} />
			</Col>
		</SafeAreaView>
	);
}

export default InformationPromotionScreen;
const styles = StyleSheet.create({
	container: {
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
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
		flex: 1,
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		alignItems: "center",
		justifyContent: "center",
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
