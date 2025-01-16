/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:40 PM - 06/09/2024
 *  User: lam-nguyen
 **/

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import SolarMapPointBold from "../../../assets/images/icons/SolarMapPointBold";
import SolarTicketSaleBold from "../../../assets/images/icons/SolarTicketSaleBold";
import SolarWalletBold from "../../../assets/images/icons/SolarWalletBold";
import MenuBasketItem from "../../components/basket/MenuBasketItem";
import { neutral, secondary } from "../../configs/colors/color-template.config";
import { RootState } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import { RootStackParamList } from "../../navigations/stack.type";
import PromotionType from "../../types/promotion.type";

function BasketMenuFragment() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "BasketScreen">>();
	const { shipping, order } = useSelector((state: RootState) => state.promotionOffer);

	const navigateToPaymentScreen = () => {
		navigation.navigate("PaymentMethodScreen");
	};

	const navigateToLocationScreen = () => {
		navigation.navigate("MyLocationScreen");
	};
	return (
		<>
			<MenuBasketItem
				icon={<SolarMapPointBold />}
				title={"Deliver to"}
				footer={
					<TouchableOpacity onPress={navigateToLocationScreen}>
						<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("400") }]}>
							Select Your Location
						</Text>
					</TouchableOpacity>
				}
			/>
			<MenuBasketItem
				icon={<SolarWalletBold />}
				title={"Payment method"}
				footer={
					<TouchableOpacity onPress={navigateToPaymentScreen}>
						<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("400") }]}>
							Select Payment Method
						</Text>
					</TouchableOpacity>
				}
			/>
			<MenuBasketItem
				icon={<SolarTicketSaleBold />}
				title={"Promotions"}
				footer={
					(!shipping && !order && (
						<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("400") }]}>
							Select Your Discounts
						</Text>
					)) ||
					(shipping && order && Object.values([order, shipping]).map(item => promotionLabel(item))) ||
					(shipping && promotionLabel(shipping)) ||
					(order && promotionLabel(order))
				}
				onPress={() => navigation.navigate("PromotionScreen")}
			/>
		</>
	);
}

const promotionLabel = (pros: PromotionType) => {
	return (
		<Text
			key={pros.id}
			style={{
				...textStyle["12_medium"],
				color: "white",
				padding: 5,
				textAlign: "center",
				borderRadius: 5,
				backgroundColor: secondary.getColor("500"),
			}}
		>
			{pros.name}
		</Text>
	);
};
export default BasketMenuFragment;
