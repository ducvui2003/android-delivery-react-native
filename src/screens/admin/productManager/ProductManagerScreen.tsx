import { Image, NativeScrollPoint, NativeScrollSize, SafeAreaView, StyleSheet, Text } from "react-native";
import { Header } from "../../../components/header/Header";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Row from "../../../components/custom/Row";
import { burger } from "../../../../assets/images/category/category.icon";
import SolarAddCircleBold from "../../../../assets/images/icons/SolarAddCircleBold";
import GradientIconSvg from "../../../components/grandientIconSvg/GradientIconSvg";
import { neutral, primary, white } from "../../../configs/colors/color-template.config";
import { ThemeType } from "../../../types/theme.type";
import InputSearch from "../../../components/input/InputSearch";
import Col from "../../../components/custom/Col";
import textStyle from "../../../configs/styles/textStyle.config";
import { FlatList } from "react-native-gesture-handler";
import ProductManageCard from "../../../components/card/product/ProductManageCard";
import ProductType from "../../../types/product.type";
import ApiPagingType from "../../../types/apiPaging.type";
import { searchProduct } from "../../../services/product.service";
import { useDebounce } from "@uidotdev/usehooks";
import SearchProductType from "../../../types/searchProduct.type";
import { Switch } from "@rneui/base";
import Modal from "../../../components/modal/Modal";

function ProductManagerScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ProductManagerScreen">>();
	const [products, setProducts] = useState<ApiPagingType<ProductType>>();
	const [searchTerm, setSearchTerm] = useState<string>();
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchData, setSearchData] = useState<SearchProductType>({
		name: debouncedSearchTerm,
		page: 1,
		isNew: false,
		isBestSeller: false,
	});
	const [positionScroll, setPositionScroll] = useState<number>(0);

	useEffect(() => {
		if (searchData.name === undefined && loading) return; // stop run search when first enter page or loading
		setProducts(undefined);
		setLoading(true);
		searchProduct(searchData).then(value => {
			setProducts(value);
			setLoading(false);
		});
	}, [searchData]);

	const onScrollHandle = (
		layoutMeasurement: NativeScrollSize,
		contentOffset: NativeScrollPoint,
		contentSize: NativeScrollSize
	) => {
		if (
			!products ||
			positionScroll >= contentOffset.y ||
			layoutMeasurement.height + contentOffset.y < contentSize.height - 20 ||
			loading ||
			products.current >= products.totalPage
		) {
			setPositionScroll(contentOffset.y);
			return;
		}

		searchData.page = (searchData?.page ?? 0) + 1;
		setLoading(true);
		searchProduct(searchData).then(value => {
			setProducts(prevState => {
				const temp = prevState?.content ?? [];
				value.content.forEach(it => temp.push(it));
				return { ...value, content: temp };
			});
			setLoading(false);
		});

		setPositionScroll(contentOffset.y);
	};

	useEffect(() => {
		setSearchData(prevState => {
			return { ...prevState, name: debouncedSearchTerm, page: 1 };
		});
	}, [debouncedSearchTerm]);

	const renderItem = ({ item }: { item: ProductType }) => {
		return (
			<ProductManageCard
				product={{ ...item }}
				onEditPress={() => {
					navigation.replace("ModifyProductManageScreen", { id: item.id });
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header
				title={
					<Row>
						<Image source={burger} style={{ width: 28, height: 28, marginLeft: 12 }} />
						<Text style={styles.title}>Product Manager</Text>
					</Row>
				}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
					elevation: 5,
				}}
				onPressBack={() => navigation.pop()}
				iconRight={
					<GradientIconSvg
						icon={<SolarAddCircleBold />}
						gradientColors={[primary.getColor("500"), primary.getColor("300")]}
					/>
				}
				onPressIconRight={() => {
					navigation.navigate("ModifyProductManageScreen", { id: null });
				}}
			/>

			<Col style={[{ paddingHorizontal: 25 }]}>
				<InputSearch
					styleInput={styles.inputSearchCustom}
					placeholder={"Search"}
					onChange={e => setSearchTerm(e.nativeEvent.text)}
					onPressIconRight={() => {
						setShowModalFilter(true);
					}}
				/>
			</Col>

			<FlatList
				style={styles.card}
				data={products?.content ?? []}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				onScroll={({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) =>
					onScrollHandle(layoutMeasurement, contentOffset, contentSize)
				}
			/>

			<Modal
				active={showModalFilter}
				background={{
					backgroundColor: neutral.getColor("300"),
					opacity: 0.4,
				}}
				onEndHide={() => setShowModalFilter(false)}
			>
				<Text style={[{ ...textStyle["22_semibold"] }]}>Filter</Text>
				<Row flex={0} style={[{ width: "100%", justifyContent: "space-between" }]}>
					<Text style={[{ ...textStyle["16_semibold"] }]}>Sản phẩm mới: </Text>
					<Switch
						trackColor={{ false: theme.profile.switch.getColor(), true: primary.getColor("500") }}
						thumbColor={white.getColor()}
						ios_backgroundColor="#3e3e3e"
						onValueChange={value =>
							setSearchData(prevState => {
								return { ...prevState, isNew: value, page: 1, name: prevState.name ?? "" };
							})
						}
						value={searchData?.isNew}
					/>
				</Row>
				<Row flex={0} style={[{ width: "100%", justifyContent: "space-between" }]}>
					<Text style={[{ ...textStyle["16_semibold"] }]}>Sản phẩm bán chạy: </Text>
					<Switch
						trackColor={{ false: theme.profile.switch.getColor(), true: primary.getColor("500") }}
						thumbColor={white.getColor()}
						ios_backgroundColor="#3e3e3e"
						onValueChange={value =>
							setSearchData(prevState => {
								return { ...prevState, isBestSeller: value, page: 1, name: prevState.name ?? "" };
							})
						}
						value={searchData?.isBestSeller}
					/>
				</Row>
			</Modal>
		</SafeAreaView>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
		},
		title: {
			color: theme.text_1.getColor(),
			...textStyle["22_semibold"],
			marginStart: 12,
		},
		inputSearchCustom: {
			color: theme.text_1.getColor(),
			backgroundColor: theme.background_input.getColor(),
		},
		card: {
			margin: 20,
		},
	});

export default ProductManagerScreen;
