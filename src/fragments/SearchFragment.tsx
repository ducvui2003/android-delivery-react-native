/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:30 AM - 27/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import {
	Image,
	Keyboard,
	NativeScrollPoint,
	NativeScrollSize,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import Col from "../components/custom/Col";
import InputSearch from "../components/input/InputSearch";
import ProductType from "../types/product.type";
import ProductHomeCard from "../components/card/product/ProductHomeCard";
import Grid from "../components/custom/Grid";
import Row from "../components/custom/Row";
import textStyle from "../configs/styles/textStyle.config";
import Space from "../components/custom/Space";
import NumberValue from "../configs/value/number.value";
import CategoryType from "../types/category.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import spacing from "../configs/styles/space.config";
import { getProductByCategoryId, searchProduct } from "../services/product.service";
import { useDebounce } from "@uidotdev/usehooks";
import Modal from "../components/modal/Modal";
import { neutral, primary, white } from "../configs/colors/color-template.config";
import { Dialog, Switch } from "@rneui/base";
import SearchProductType from "../types/searchProduct.type";
import ApiPagingType from "../types/apiPaging.type";

type SearchScreenProps = { autoFocus: boolean; category?: CategoryType; navigation: NativeStackNavigationProp<any> };

export default function SearchFragment({ autoFocus, category, navigation }: SearchScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [products, setProducts] = useState<ApiPagingType<ProductType>>();
	const [searchTerm, setSearchTerm] = useState<string>();
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchData, setSearchData] = useState<SearchProductType>({
		name: debouncedSearchTerm,
		category: category?.id,
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
	}, [category?.id, searchData]);

	useEffect(() => {
		setSearchData(prevState => {
			return { ...prevState, name: debouncedSearchTerm, page: 1 };
		});
	}, [debouncedSearchTerm]);

	/* function get date by category
	 * when page show product by category, this function will call api to get data and run only 1 times*/
	useEffect(() => {
		if (!category) return;
		setLoading(true);
		getProductByCategoryId(category.id).then(value => {
			setProducts(value);
			setLoading(false);
		});
	}, [category]);

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

	const renderTitle = () => {
		if (category) {
			return (
				<Row style={{ alignItems: "center", gap: 10, justifyContent: "center" }}>
					<Image
						resizeMode={"cover"}
						style={{ width: 30, height: 30 }}
						source={{ uri: category?.urlImage }}
					/>
					<Text style={{ ...textStyle["22_semibold"], color: theme.text_1.getColor() }}>{category.name}</Text>
				</Row>
			);
		}

		return "Search";
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (Platform.OS === "web") return;
				Keyboard.dismiss();
			}}
		>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
				<Header
					title={renderTitle()}
					colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => {
						Keyboard.dismiss();
						navigation.pop();
					}}
				/>
				<Col style={[styles.contentContainer]} flex={1}>
					<InputSearch
						autoFocus={autoFocus}
						placeholder="Vui lòng nhập tên sản phẩm"
						onChange={e => setSearchTerm(e.nativeEvent.text)}
						onPressIconRight={() => setShowModalFilter(true)}
					/>
					<ScrollView
						style={[styles.scrollContainer]}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						onScroll={({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) =>
							onScrollHandle(layoutMeasurement, contentOffset, contentSize)
						}
					>
						<Grid<ProductType>
							col={2}
							data={products?.content ?? []}
							renderItem={(item, index) => {
								return (
									<ProductHomeCard
										key={index}
										product={item}
										onPress={() => {
											console.log(item);
										}}
									/>
								);
							}}
							gapRow={24}
						/>
						{loading ? <Dialog.Loading /> : <Space height={spacing["spaced-7"]} />}
					</ScrollView>
				</Col>
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
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
	},
	scrollContainer: {
		flex: 1,
		marginTop: 25,
	},
});
