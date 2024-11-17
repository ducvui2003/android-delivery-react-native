/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 10:49 AM - 10/09/2024
 * User: Binnguci
 **/

import React, { useCallback, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../configs/redux/store.config";
import { RootStackParamList } from "../navigations/stack.type";
import NumberValue from "../configs/value/number.value";
import InputIcon from "../components/input/InputIcon";
import GradientText from "../components/gradientText/GradientText";
import textStyle from "../configs/styles/textStyle.config";
import { gradient } from "../configs/colors/color-template.config";
import Row from "../components/custom/Row";
import Space from "../components/custom/Space";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import { Header } from "../components/header/Header";
import { Promotion } from "../components/promotion/Promotion";
import PopUp from "../components/popUp/PopUp";
import InformationPromotionScreen from "./InformationPromotionScreen";
import PromotionType from "../types/promotion.type";
import { EndPointPromotion, getPromotions, promotionOffer } from "../hooks/redux/promotionOffer.slice";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";

type PromotionScreenProps = {
	route: RouteProp<RootStackParamList, "PromotionScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const PromotionScreen = ({ navigation }: PromotionScreenProps) => {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const user = useSelector((state: RootState) => state.authState.user);

	const userId = user ? user.id : 4;
	const { promotions, shipping, order } = useSelector((state: RootState) => state.promotionOffer);

	const appDispatch = useAppDispatch();

	const [indexCheckedShipping, setIndexCheckedShipping] = useState<number | null>(null);
	const [indexCheckedOrder, setIndexCheckedOrder] = useState<number | null>(null);

	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	const handleCheckShipping = useCallback((index: number) => {
		setIndexCheckedShipping(index);
	}, []);

	const handleCheckOrder = useCallback((index: number) => {
		setIndexCheckedOrder(index);
	}, []);

	const [promotion, setPromotion] = useState<PromotionType>();

	useEffect(() => {
		appDispatch(getPromotions(userId));
	}, []);

	const fetchPromotion = async (id: String): Promise<ApiResponse<PromotionType>> => {
		const promotion = await axiosInstance.get<ApiResponse<PromotionType>>(
			`${EndPointPromotion.DETAIL_PROMOTION}/${id}`
		);
		return promotion.data;
	};
	const shippingOffers = promotions !== undefined ? promotions.filter(item => item.type !== "ORDER") : [];
	const orderOffers = promotions !== undefined ? promotions.filter(item => item.type !== "SHIPPING") : [];

	
	const submit = () => {
		if ((indexCheckedOrder || indexCheckedOrder === 0) && orderOffers)
			appDispatch(promotionOffer(orderOffers[indexCheckedOrder].id));

		if (shippingOffers && (indexCheckedShipping || indexCheckedShipping === 0))
			appDispatch(promotionOffer(shippingOffers[indexCheckedShipping].id));

		handleBackPress();
	};
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title="Promotions"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				onPressBack={handleBackPress}
			/>

			<View style={styles.contentContainer}>
				<InputIcon
					placeholder="Mã giảm giá"
					iconRight={
						<GradientText textStyle={styles.title} text="Apply" gradientColors={gradient.getColor()} />
					}
					width={350}
				/>
				<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
					<View style={{ flex: 0 }}>
						<>
							<Text style={styles.offerText}>Shipping Offers</Text>
							<FlatList
								style={styles.flatList}
								data={shippingOffers}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item, index }) => (
									<TouchableOpacity onPress={() => handleCheckShipping(index)}>
										<Row style={styles.row}>
											<Promotion
												name={item.name}
												checked={indexCheckedShipping === index || shipping?.id === item.id}
												onCheck={() => {
													appDispatch(promotionOffer(item.id))
													handleCheckShipping(index);
												}}
												onInfoPress={() =>
													fetchPromotion(item.id).then(res => setPromotion(res.data))
												}
											/>
										</Row>
										<Space height={15} />
									</TouchableOpacity>
								)}
							/>
						</>
					</View>
					<View style={{ flex: 0 }}>
						<>
							<Text style={styles.offerText}>Order Offers</Text>
							<FlatList
								style={styles.flatList}
								data={orderOffers}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item, index }) => (
									<TouchableOpacity onPress={() => handleCheckOrder(index)}>
										<Row style={styles.row}>
											<Promotion
												name={item.name}
												checked={indexCheckedOrder === index || order?.id === item.id}
												onCheck={() => {
													appDispatch(promotionOffer(item.id));
													handleCheckOrder(index);
												}}
												onInfoPress={() =>
													fetchPromotion(item.id).then(res => setPromotion(res.data))
												}
											/>
										</Row>
										<Space height={15} />
									</TouchableOpacity>
								)}
							/>
						</>
					</View>
				</ScrollView>
			</View>
			<View style={styles.footer}>
				<ButtonHasStatus
					active={indexCheckedShipping != null || indexCheckedOrder != null}
					title="Apply"
					onPress={submit}
					styleButton={styles.buttonApply}
				/>
			</View>

			{promotion && (
				<PopUp
					body={<InformationPromotionScreen {...promotion} />}
					onEndHide={() => {
						setPromotion(undefined);
					}}
					showed={!!promotion}
				/>
			)}
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	offerText: {
		...textStyle["16_regular"],
		color: "black",
		paddingTop: 20,
		paddingBottom: 15,
	},

	flatList: {
		width: "100%",
		padding: 0,
		margin: 0,
	},
	row: {
		justifyContent: "center",
	},
	buttonAdd: {
		padding: 17,
		gap: 10,
		alignItems: "center",
		borderRadius: 15,
	},
	buttonAddText: {
		...textStyle["18_semibold"],
	},
	buttonApply: {
		marginVertical: 40,
		width: "100%",
	},
	footer: {
		justifyContent: "flex-end",
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		paddingVertical: 20,
	},
});

export default PromotionScreen;
