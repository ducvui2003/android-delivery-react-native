/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 10:49 AM - 10/09/2024
 * User: Binnguci
 **/

import React, { useCallback, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { RootState } from "../configs/redux/store.config";
import { RootStackParamList } from "../navigations/stack.type";
import NumberValue from "../configs/value/number.value";
import InputIcon from "../components/input/InputIcon";
import GradientText from "../components/gradientText/GradientText";
import textStyle from "../configs/styles/textStyle.config";
import { gradient } from "../configs/colors/color-template.config";
import { dataOrderOffer, dataShippingOffer } from "../../assets/data/promotion/promotion";
import Row from "../components/custom/Row";
import Space from "../components/custom/Space";
import SolarAddLinear from "../../assets/images/icons/SolarAddLinear";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import { Header } from "../components/header/Header";
import { Promotion } from "../components/promotion/Promotion";
import InformationPromotionFragment from "../fragments/promotion/InformationPromotionFragment";

type PromotionScreenProps = {
	route: RouteProp<RootStackParamList, "PromotionScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const PromotionScreen = ({ navigation }: PromotionScreenProps) => {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [indexCheckedShipping, setIndexCheckedShipping] = useState<number | null>(null);
	const [indexCheckedOrder, setIndexCheckedOrder] = useState<number | null>(null);
	const [selectedPromotionId, setSelectedPromotionId] = useState<string | null>(null);

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

	const handleLongPress = (id: string) => {
		setSelectedPromotionId(id);
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

				<View style={{ flex: 0 }}>
					{dataShippingOffer.length > 0 && (
						<>
							<Text style={styles.offerText}>Shipping Offers</Text>
							<FlatList
								style={styles.flatList}
								data={dataShippingOffer}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										onPress={() => handleCheckShipping(index)}
										onLongPress={() => handleLongPress(item.id)}
									>
										<Row style={styles.row}>
											<Promotion
												name={item.name}
												checked={indexCheckedShipping === index}
												onCheck={() => handleCheckShipping(index)}
											/>
										</Row>
										<Space height={15} />
									</TouchableOpacity>
								)}
							/>
						</>
					)}
				</View>
				<View style={{ flex: 0 }}>
					{dataOrderOffer.length > 0 && (
						<>
							<Text style={styles.offerText}>Order Offers</Text>
							<FlatList
								style={styles.flatList}
								data={dataOrderOffer}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								renderItem={({ item: { name }, index }) => (
									<TouchableOpacity onPress={() => handleCheckOrder(index)}>
										<Row style={styles.row}>
											<Promotion
												name={name}
												checked={indexCheckedOrder === index}
												onCheck={() => handleCheckOrder(index)}
											/>
										</Row>
										<Space height={15} />
									</TouchableOpacity>
								)}
							/>
						</>
					)}
				</View>

				<Row
					flex={0}
					style={[
						styles.buttonAdd,
						{ backgroundColor: theme.my_location.background_button_add.getColor() },

					]}
				>
					<SolarAddLinear width={25} height={25} color={theme.my_location.color_button_add.getColor()} />
					<Text style={[styles.buttonAddText, { color: theme.my_location.color_button_add.getColor() }]}>
						Get More Promotions
					</Text>
				</Row>
			</View>
			<View style={styles.footer}>
				<ButtonHasStatus
					active={indexCheckedShipping != null || indexCheckedOrder != null}
					title="Apply"
					onPress={() => {}}
					styleButton={styles.buttonApply}
				/>
			</View>

			{selectedPromotionId && (
				<View>
					<InformationPromotionFragment
						id={selectedPromotionId}
						onFocus={() => console.log("Fragment in focus")}
					/>
				</View>
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
