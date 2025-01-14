/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:12 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import { Divider } from "@rneui/themed";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import SolarDismiss from "../../../assets/images/icons/SolarDismiss";
import SolarPenBold from "../../../assets/images/icons/SolarPenBold";
import { neutral, primary } from "../../configs/colors/color-template.config";
import { RootState, useAppDispatch } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import { decreaseCart, deleteCart, increaseCart } from "../../hooks/redux/cart.slice";
import Formater from "../../utils/formater";
import Col from "../custom/Col";
import Row from "../custom/Row";
import InputNumberButton from "../input/InputNumberButton";
import OptionAdd from "./OptionAdd";
import BasketItemProps from "./type/basketItem.props";

function BasketItem({ id, name, discount, price, options, quantity, quantityMax, image }: BasketItemProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const appDispatch = useAppDispatch();
	console.log("BasketItem", JSON.stringify(options, null, 2));

	const handleDelete = () => {
		appDispatch(deleteCart(id));
	};
	const handleIncrease = (): Promise<void> => {
		return appDispatch(increaseCart(id))
			.then(() => {})
			.catch(() => {
				throw new Error("Error");
			});
	};
	const handleDecrease = () => {
		return appDispatch(decreaseCart(id))
			.then(() => {})
			.catch(() => {
				throw new Error("Error");
			});
	};

	return (
		<Col
			style={[
				{
					backgroundColor: theme.basket.background.getColor(),
					borderColor: theme.border.getColor(),
				},
				styles.container,
			]}
		>
			<Row style={{ gap: 10 }}>
				<Image
					source={{
						uri: image,
					}}
					style={{ width: 95, height: 95, borderRadius: 10 }}
				/>
				<Col style={{ gap: 10 }}>
					<Text style={[{ ...textStyle["12_medium"], color: theme.text_1.getColor() }]}>{name}</Text>
					{discount ? (
						<Row style={{ gap: 10 }}>
							<Text style={{ ...styles.oldPrice }}>{Formater.formatCurrency(price)}</Text>
							<Text style={{ ...styles.currentPrice }}>
								{Formater.formatCurrency((price * (100 - discount)) / 100)}
							</Text>
						</Row>
					) : (
						<Text style={{ ...styles.currentPrice }}>{Formater.formatCurrency(price)}</Text>
					)}
					<InputNumberButton
						styleButton={{ padding: 5 }}
						sizeIcon={25}
						current={quantity}
						max={quantityMax}
						onPlusActionController={handleIncrease}
						onMinusActionController={handleDecrease}
					/>
				</Col>
				<Row style={{ gap: 5, justifyContent: "flex-end" }}>
					<TouchableOpacity onPress={() => {}}>
						<SolarPenBold color={neutral.getColor("100")} width={25} height={25} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleDelete}>
						<SolarDismiss color={neutral.getColor("100")} width={25} height={25} />
					</TouchableOpacity>
				</Row>
			</Row>
			{options && (
				<Col style={{ gap: 10 }}>
					<Divider style={{ width: "100%", borderRadius: 999 }} width={1} color={neutral.getColor("50")} />
					{options.map((option, index) => (
						<OptionAdd key={index} {...option} />
					))}
				</Col>
			)}
		</Col>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
		padding: 10,
		borderRadius: 15,
		borderWidth: 1,
		borderStyle: "solid",
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

export default BasketItem;
