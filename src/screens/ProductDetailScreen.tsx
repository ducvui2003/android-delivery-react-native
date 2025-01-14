/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:06 AM - 28/08/2024
 *  User: lam-nguyen
 **/

// @flow
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import SolarHeartBold from "../../assets/images/icons/SolarHeartBold";
import SolarHeartLinear from "../../assets/images/icons/SolarHeartLinear";
import SolarStarBold from "../../assets/images/icons/SolarStarBold";
import Col from "../components/custom/Col";
import Grid from "../components/custom/Grid";
import Row from "../components/custom/Row";
import Space from "../components/custom/Space";
import GradientIconSvg from "../components/grandientIconSvg/GradientIconSvg";
import { Header } from "../components/header/Header";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { gradient, neutral, secondary } from "../configs/colors/color-template.config";
import { firebaseStorage } from "../configs/firebase/firebase.config";
import { RootState, useAppDispatch } from "../configs/redux/store.config";
import textStyle from "../configs/styles/textStyle.config";
import NumberValue from "../configs/value/number.value";
import { ProductDetailAdditionalOption } from "../fragments/productDetail/ProductDetailAdditionalOption";
import ProductDetailFooter from "../fragments/productDetail/ProductDetailFooter";
import { RootStackParamList } from "../navigations/stack.type";
import ProductDetailType, { GroupOptionType, NutritionalType, OptionType } from "../types/productDetail.type";
import { addCart } from "../hooks/redux/cart.slice";

type ProductDetailScreenProps = {
	route: RouteProp<RootStackParamList, "ProductDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export type GroupOptionSelected = Omit<GroupOptionType, "options"> & { option: OptionType };

export default function ProductDetailScreen({
	route: {
		params: { id },
	},
	navigation,
}: ProductDetailScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [seeMore, setSeeMore] = useState<boolean>(false);
	const [product, setProduct] = useState<ProductDetailType>();
	const [additionalOption, setAdditionalOption] = useState<(OptionType | GroupOptionSelected)[]>([]);
	const [url, setUrl] = useState<string>("");
	const appDispatch = useAppDispatch();

	const onSeeMore = () => {
		setSeeMore(true);
	};

	const onSeeLess = () => {
		setSeeMore(false);
	};

	useEffect(() => {
		axiosInstance.get<ApiResponse<ProductDetailType>>(`/product/${id}`).then(res => {
			setProduct(res.data.data);
		});
	}, []);

	useEffect(() => {
		if (!product) return;
		firebaseStorage.ref(product.image).getDownloadURL().then(setUrl);
	}, [product]);

	const getOptionIds = (option: (OptionType | GroupOptionSelected)[]): string[] => {
		return option.map((item: OptionType | GroupOptionSelected) => {
			if ("option" in item) return item.option.id;
			return item.id;
		});
	};
	const handleSubmit = (quantity: number) => {
		const optionIds = getOptionIds(additionalOption);
		console.log("ProductDetailScreen", {
			productId: product?.id ?? "",
			quantity: quantity,
			optionIds: optionIds,
		});

		appDispatch(
			addCart({
				productId: product?.id ?? "",
				quantity: quantity,
				optionIds: optionIds,
			})
		);
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
					{url && (
						<Image style={{ height: "100%", width: "100%" }} resizeMode={"cover"} source={{ uri: url }} />
					)}
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
				<Col style={[styles.containerContent, styles.gap]}>
					<Text style={[{ ...textStyle["22_semibold"], color: theme.text_1.getColor() }]}>
						{product?.name}
					</Text>
					<Row style={[styles.containerRating]}>
						<Row style={{ gap: 10 }}>
							<SolarStarBold color={secondary.getColor("500")} />
							<Text style={[{ ...textStyle["16_regular"] }]}>{product?.rating.averageRating}</Text>
							<Text style={[styles.textDescribe]}>({product?.rating.totalReview})</Text>
						</Row>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("ReviewScreen", {
									id: product?.id ?? "",
									name: product?.name ?? "",
								});
							}}
						>
							<Text style={[styles.textButtonSeeMore]}>See all review</Text>
						</TouchableOpacity>
					</Row>
					<Text numberOfLines={seeMore ? undefined : 3} style={[styles.textDescribe]}>
						{product?.description}
					</Text>
					{seeMore && (
						<Grid<NutritionalType>
							col={2}
							data={product?.nutritional ?? []}
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
						data={product?.options ?? []}
						onAdditionalOption={setAdditionalOption}
					/>
					<Space height={125} />
				</Col>
			</ScrollView>
			<ProductDetailFooter totalAmount={product?.quantity ?? 999} onSubmit={handleSubmit} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerContent: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		marginTop: 20,
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
