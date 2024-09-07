/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:33 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Row from "../components/custom/Row";
import GradientText from "../components/gradientText/GradientText";
import { gradient } from "../configs/colors/color-template.config";
import GradientBorder from "../components/gradientBorder/GradientBorder";
import textStyle from "../configs/styles/textStyle.config";
import BasketItem from "../components/basket/BasketItem";
import BasketItemProps from "../components/basket/type/basketItem.props";
import Space from "../components/custom/Space";
import Col from "../components/custom/Col";
import BasketMenuFragment from "../fragments/basket/BasketMenuFragment";
import BasketCalculator, { BasketCalculatorProps } from "../fragments/basket/BasketCalculator";
import { ButtonHasStatus } from "../components/custom/ButtonHasStatus";
import { formatCurrency } from "../utils/formator";
import NumberValue from "../configs/value/number.value";

type BasketScreenProps = {
	route: RouteProp<RootStackParamList, "BasketScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function BasketScreen({ navigation }: BasketScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title={"My Basket"}
				colorIconBack={theme.text_1.getColor()}
				colorTitle={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => navigation.pop()}
			/>
			<ScrollView
				style={{ paddingHorizontal: NumberValue.paddingHorizontalScreen }}
				contentContainerStyle={[{ gap: 25 }]}
			>
				<Col style={{ gap: 10 }}>
					<Row style={{ alignItems: "center", justifyContent: "space-between" }}>
						<Text style={{ ...textStyle["16_regular"], color: theme.text_1.getColor() }}>
							Order Summary
						</Text>
						<TouchableOpacity>
							<GradientBorder
								gradientColors={gradient.getColor()}
								borderWidth={1}
								backgroundColorContent={theme.background.getColor()}
							>
								<View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
									<GradientText
										text={"Add Items"}
										textStyle={{ ...textStyle["12_medium"] }}
										gradientColors={gradient.getColor()}
									/>
								</View>
							</GradientBorder>
						</TouchableOpacity>
					</Row>
					{dataDemo.map((item: BasketItemProps, index: number) => (
						<BasketItem key={index} {...item} />
					))}
				</Col>
				<BasketMenuFragment />
				<BasketCalculator {...dataDemo2} />
				<Space height={175} />
			</ScrollView>
			<Row style={[styles.footer, { backgroundColor: theme.basket.backgroundFooter.getColor() }]}>
				<Row style={{ justifyContent: "center" }}>
					<Text style={[{ ...textStyle["18_semibold"], color: theme.text_1.getColor() }]}>
						{formatCurrency(dataDemo2.subTotal - dataDemo2.discount + dataDemo2.deliveryFee)}
					</Text>
				</Row>
				<ButtonHasStatus
					title={"Place Order"}
					active={true}
					styleButton={{ marginBottom: 0, paddingHorizontal: 20 }}
				/>
			</Row>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	footer: {
		position: "absolute",
		bottom: 20,
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 10,
		padding: 12,
		marginHorizontal: 10,
		elevation: 10,
	},
});

export default BasketScreen;

const dataDemo: BasketItemProps[] = [
	{
		id: "1",
		name: "Chicken Burger",
		price: 20000,
		discount: 60,
		quantity: 1,
		image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		options: [
			{
				name: "Cheese",
				price: 1000,
			},
			{
				name: "Meat (Extra Patty)",
				price: 5000,
			},
		],
	},
	{
		id: "2",
		name: "Ramen Noodles",
		price: 25000,
		discount: 70,
		quantity: 1,
		image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: "3",
		name: "Cherry Tomato Salad",
		price: 10000,
		quantity: 1,
		image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

const dataDemo2: BasketCalculatorProps = {
	subTotal: dataDemo.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0),
	deliveryFee: 0,
	discount: dataDemo.reduce(
		(previousValue, currentValue) =>
			previousValue + (currentValue.price * (100 - (currentValue.discount ?? 100))) / 100,
		0
	),
};
