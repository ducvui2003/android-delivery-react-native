/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:40 PM - 06/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import MenuBasketItem from "../../components/basket/MenuBasketItem";
import SolarMapPointBold from "../../../assets/images/icons/SolarMapPointBold";
import { Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { neutral } from "../../configs/colors/color-template.config";
import SolarWalletBold from "../../../assets/images/icons/SolarWalletBold";
import SolarTicketSaleBold from "../../../assets/images/icons/SolarTicketSaleBold";

function BasketMenuFragment() {
	return (
		<>
			<MenuBasketItem
				icon={<SolarMapPointBold />}
				title={"Deliver to"}
				footer={
					<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("400") }]}>
						Select Your Location
					</Text>
				}
			/>
			<MenuBasketItem
				icon={<SolarWalletBold />}
				title={"Payment method"}
				footer={
					<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("400") }]}>
						Select Payment Method
					</Text>
				}
			/>
			<MenuBasketItem
				icon={<SolarTicketSaleBold />}
				title={"Promotions"}
				footer={
					<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("400") }]}>
						Select Your Discounts
					</Text>
				}
			/>
		</>
	);
}

export default BasketMenuFragment;
