/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:06 AM - 28/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Row from "../components/custom/Row";
import textStyle from "../configs/styles/textStyle.config";
import Col from "../components/custom/Col";
import { gradient, neutral, secondary } from "../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { Header } from "../components/header/Header";
import SolarHeartBold from "../../assets/images/icons/SolarHeartBold";
import GradientIconSvg from "../components/grandientIconSvg/GradientIconSvg";
import Space from "../components/custom/Space";
import SolarStarBold from "../../assets/images/icons/SolarStarBold";
import Grid from "../components/custom/Grid";
import ProductDetailFooter from "../fragments/productDetail/ProductDetailFooter";
import { ProductDetailAdditionalOption } from "../fragments/productDetail/ProductDetailAdditionalOption";
import ProductDetailType, { GroupOptionType, NutritionalType, OptionType } from "../types/productDetail.type";
import SolarHeartLinear from "../../assets/images/icons/SolarHeartLinear";

type ProductDetailScreenProps = {
	route: RouteProp<RootStackParamList, "ProductDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export type GroupOptionSelected = Omit<GroupOptionType, "options"> & { option: OptionType };

export function ProductDetailScreen({
	route: {
		params: { id },
	},
	navigation,
}: ProductDetailScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [seeMore, setSeeMore] = useState<boolean>(false);
	const [product, setProduct] = useState<ProductDetailType>();
	const [amount, setAmount] = useState<number>(1);
	const [additionalOption, setAdditionalOption] = useState<(OptionType | GroupOptionSelected)[]>([]);

	const onSeeMore = () => {
		setSeeMore(true);
	};

	const onSeeLess = () => {
		setSeeMore(false);
	};

	useEffect(() => {
		getProduct().then();
	}, []);

	const getProduct = async () => {
		// Call API to get product detail by id
		// const product = await api.getProductById(id);
		setProduct(dataDemo);
	};

	const renderButtonSeeMore = () => {
		if (seeMore)
			return (
				<TouchableOpacity onPress={onSeeLess}>
					<Text style={[styles.textButtonSeeMore]}>See less</Text>
				</TouchableOpacity>
			);
		else
			return (
				<TouchableOpacity onPress={onSeeMore}>
					<Text style={[styles.textButtonSeeMore]}>See more</Text>
				</TouchableOpacity>
			);
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<ScrollView style={[styles.container]}>
				<Header
					title={""}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => navigation.pop()}
					style={{ position: "absolute", zIndex: 2 }}
				/>
				<View style={[styles.containerImage]}>
					<Image
						style={{ height: "100%", width: "100%" }}
						resizeMode={"cover"}
						source={{ uri: product?.image }}
					/>
					<TouchableOpacity style={[styles.buttonHeart, { backgroundColor: theme.background.getColor() }]}>
						<GradientIconSvg
							icon={
								product?.isLiked ? (
									<SolarHeartBold width={26} height={26} />
								) : (
									<SolarHeartLinear width={26} height={26} />
								)
							}
							gradientColors={gradient.getColor()}
						/>
					</TouchableOpacity>
				</View>
				<Col style={[{ paddingHorizontal: 25, marginTop: 20 }, styles.gap]}>
					<Text style={[{ ...textStyle["22_semibold"], color: theme.text_1.getColor() }]}>
						{product?.name}
					</Text>
					<Row style={[styles.containerRating]}>
						<Row style={{ gap: 10 }}>
							<SolarStarBold color={secondary.getColor("500")} />
							<Text style={[{ ...textStyle["16_regular"] }]}>{product?.rating}</Text>
							<Text style={[styles.textDescribe]}>(1025)</Text>
						</Row>
						<TouchableOpacity>
							<Text style={[styles.textButtonSeeMore]}>See all review</Text>
						</TouchableOpacity>
					</Row>
					<Text numberOfLines={seeMore ? undefined : 3} style={[styles.textDescribe]}>
						{product?.description}
					</Text>
					{seeMore && (
						<Grid<NutritionalType>
							col={2}
							data={product?.nutritional_information ?? []}
							renderItem={(item, index) => {
								return (
									<Row key={index}>
										<Text style={[styles.textDescribe]}>{item.name}: </Text>
										<Text style={[styles.textDescribe]}>{item.value}</Text>
									</Row>
								);
							}}
							gapRow={16}
						/>
					)}
					<Row style={[styles.containerButtonSeeMore]}>{renderButtonSeeMore()}</Row>
					<ProductDetailAdditionalOption
						data={product?.additional_option ?? []}
						onAdditionalOption={setAdditionalOption}
					/>
					<Space height={125} />
				</Col>
			</ScrollView>
			<ProductDetailFooter totalAmount={product?.quantity ?? 0} onAmount={setAmount} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerRating: {
		justifyContent: "space-between",
	},
	textDescribe: {
		...textStyle["16_light"],
		color: neutral.getColor("300"),
	},
	containerButtonSeeMore: {
		justifyContent: "flex-end",
	},
	textButtonSeeMore: {
		fontSize: 16,
		fontWeight: "500",
		textDecorationLine: "underline",
	},
	gap: {
		gap: 16,
	},
	containerImage: {
		flex: 1,
		height: 250,
		backgroundColor: neutral.getColor("100"),
		margin: 10,
		borderRadius: 10,
		position: "relative",
		overflow: "hidden",
	},
	buttonHeart: {
		position: "absolute",
		bottom: 30,
		right: 30,
		padding: 10,
		borderRadius: 999,
	},
});

const dataDemo: ProductDetailType = {
	id: "1",
	name: "Hamburger",
	image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	basePrice: 100,
	rating: 5,
	quantity: 10,
	isLiked: false,
	description:
		"A delicious chicken burger served on a toasted bun with fresh lettuce, tomato slices, and mayonnaise. Juicy grilled chicken patty seasoned to perfection for a mouthwatering taste experience.",
	nutritional_information: [
		{ name: "Calories", value: 420 },
		{ name: "Protein", value: "27g" },
		{ name: "Carbs", value: "30g" },
		{ name: "Fat", value: "18g" },
	],
	additional_option: [
		{
			_id: "1",
			name: "Cheese",
			price: 1250000,
		},
		{
			_id: "2",
			name: "Bacon",
			price: 2500000,
		},
		{
			_id: "3",
			name: "Meat",
			options: [
				{ _id: "3_1", name: "Extra Patty", price: 5000000 },
				{ _id: "3_2", name: "Double Patty", price: 8750000 },
			],
		},
	],
};
