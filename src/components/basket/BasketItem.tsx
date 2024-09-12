/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:12 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Col from "../custom/Col";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../custom/Row";
import Formater from "../../utils/formater";
import InputNumberButton from "../input/InputNumberButton";
import { neutral, primary } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import SolarPenBold from "../../../assets/images/icons/SolarPenBold";
import SolarDismiss from "../../../assets/images/icons/SolarDismiss";
import { Divider } from "@rneui/themed";
import BasketItemProps from "./type/basketItem.props";
import OptionAdd from "./OptionAdd";

function ProductItem({ id, name, discount, price, options, quantity, image }: BasketItemProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

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
						totalAmount={10}
						styleButton={{ padding: 5 }}
						sizeIcon={25}
						quantity={quantity}
					/>
				</Col>
				<Row style={{ gap: 5, justifyContent: "flex-end" }}>
					<TouchableOpacity>
						<SolarPenBold color={neutral.getColor("100")} width={25} height={25} />
					</TouchableOpacity>
					<TouchableOpacity>
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

export default ProductItem;
