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
import { RootState, useAppDispatch } from "../configs/redux/store.config";
import { Header } from "../components/header/Header";
import SolarHeartBold from "../../assets/images/icons/SolarHeartBold";
import SolarHeartLinear from "../../assets/images/icons/SolarHeartLinear";
import SolarStarBold from "../../assets/images/icons/SolarStarBold";
import Col from "../components/custom/Col";
import Grid from "../components/custom/Grid";
import Row from "../components/custom/Row";
import Space from "../components/custom/Space";
import GradientIconSvg from "../components/grandientIconSvg/GradientIconSvg";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { gradient, neutral, secondary } from "../configs/colors/color-template.config";
import textStyle from "../configs/styles/textStyle.config";
import NumberValue from "../configs/value/number.value";
import { likeProduct, unlikeProduct } from "../services/product.service";
import axios, { AxiosError } from "axios";
import { showModalNotify } from "../hooks/redux/modal.slice";
import { ProductDetailAdditionalOption } from "../fragments/productDetail/ProductDetailAdditionalOption";
import ProductDetailFooter from "../fragments/productDetail/ProductDetailFooter";
import { RootStackParamList } from "../navigations/stack.type";
import ProductDetailType, { GroupOptionType, NutritionalType, OptionType } from "../types/productDetail.type";
import { addCart, CartType } from "../hooks/redux/cart.slice";

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
	const dispatch = useAppDispatch();
	const [like, setLike] = useState<boolean>(product?.isLiked ?? false);
	const isLogin = useSelector((state: RootState) => state.authState.user) != null;
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

	const onHeartPress = () => {
		if (!like)
			likeProduct(id)
				.then(() => {
					setLike(true);
				})
				.catch(error => {
					if (axios.isAxiosError(error)) {
						const response = error as AxiosError<ApiResponse<void>>;
						dispatch(
							showModalNotify({
								onConfirm: () => {
									return true;
								},
								body: "hello",
								title: "hello",
							})
						);
					}
				});
		else {
			unlikeProduct(id)
				.then(() => {
					setLike(false);
				})
				.catch();
		}
	};

	const getOptionIds = (option: (OptionType | GroupOptionSelected)[]): string[] => {
		return option.map((item: OptionType | GroupOptionSelected) => {
			if ("option" in item) return item.option.id;
			return item.id;
		});
	};
	const onNavigate = () => {
		navigation.navigate("LoginScreen");
		return true;
	};

	const handleSubmit = (quantity: number) => {
		const optionIds = getOptionIds(additionalOption);
		// console.log("ProductDetailScreen", {
		// 	productId: product?.id ?? "",
		// 	quantity: quantity,
		// 	optionIds: optionIds,
		// });

		if (isLogin)
			appDispatch(
				addCart({
					productId: product?.id ?? "",
					quantity: quantity,
					optionIds: optionIds,
				})
			).then(action => {
				if (action.type === CartType.ADD_FULFILLED) {
					console.log("run");
					dispatch(
						showModalNotify({
							title: "Success",
							body: "Please check your order",
							width: "70%",
							showCancelButton: true,
						})
					);

					return;
				}
			});
		else
			dispatch(
				showModalNotify({
					title: "Please login to can buy",
					body: "Please login to can buy",
					width: "70%",
					onConfirm: onNavigate,
					showCancelButton: true,
					showConfirmButton: true,
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
					{product?.image && (
						<Image
							style={{ height: "100%", width: "100%" }}
							resizeMode={"cover"}
							source={{ uri: product?.image }}
						/>
					)}
					<TouchableOpacity
						style={[styles.buttonHeart, { backgroundColor: theme.background.getColor() }]}
						onPress={onHeartPress}
					>
						<GradientIconSvg
							icon={
								like ? (
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
