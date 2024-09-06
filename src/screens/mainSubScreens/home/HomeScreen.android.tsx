/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 12:51 pm
 * User: ducvui2003
 **/

import React, { useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { banners, categories } from "../../../../assets/data/home/home";
import Carousel from "../../../components/carousel/Carousel";
import CategoryItem from "../../../components/category/CategoryItem";
import InputSearch from "../../../components/input/InputSearch";
import Grid from "../../../components/custom/Grid";
import { neutral } from "../../../configs/colors/color-template.config";
import { RootState } from "../../../configs/redux/store.config";
import HomeHeaderFragment from "../../../fragments/home/HomeHeaderFragment";
import CategoryType from "../../../types/category.type";
import { ThemeType } from "../../../types/theme.type";
import HomeProductsFragment from "../../../fragments/home/HomeProductsFragment";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigations/stack.type";

function HomeScreen() {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [, setCurrentPageViewPager] = useState(0);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [refreshing, setRefreshing] = React.useState(false);
	const [refresh, setRefresh] = useState(0);

	const onRefresh = React.useCallback(() => {
		setRefresh(prevState => prevState + 1);
		setRefreshing(true);
	}, []);

	return (
		<ScrollView
			style={styles.container}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<HomeHeaderFragment />

			<View style={styles.bannerContainer}>
				<Carousel<object>
					data={banners}
					renderItem={(item, index) => {
						return (
							<View key={index} style={{ borderRadius: 12, overflow: "hidden" }}>
								<Image resizeMode="cover" style={styles.banner} source={item} />
							</View>
						);
					}}
					positionListDot={{
						position: "left",
						side: "bottom",
					}}
					marginListDot={10}
					onCurrentPage={currentPage => setCurrentPageViewPager(currentPage)}
				/>
			</View>

			<View style={{ position: "relative" }}>
				<InputSearch placeholder="Vui lòng nhập tên sản phẩm" />
				<TouchableWithoutFeedback
					onPress={() =>
						navigation.navigate("SearchScreen", {
							autoFocus: true,
						})
					}
				>
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 1,
						}}
					/>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.categoryGridContainer}>
				<Grid<CategoryType>
					col={4}
					data={categories}
					gapRow={24}
					renderItem={(item, index) => (
						<CategoryItem
							key={index}
							item={item}
							onPress={() => {
								if (item.name === "More") navigation.navigate("CategoriesScreen");
								else {
									navigation.navigate("SearchScreen", {
										autoFocus: false,
										category: item,
									});
								}
							}}
						/>
					)}
				/>
			</View>
			<HomeProductsFragment refresh={refresh} onRefresh={setRefreshing} />
		</ScrollView>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 24,
			paddingTop: 54,
			flex: 1,
			backgroundColor: theme.background.getColor(),
		},

		inputContainer: {
			flexDirection: "row",
			alignItems: "center",
			gap: 12,
			borderColor: neutral.getColor("100"),
			backgroundColor: neutral.getColor("50"),
			paddingHorizontal: 16,
			paddingVertical: 20,
		},
		bannerContainer: {
			marginVertical: 24,
			width: "100%",
			height: 220,
		},
		banner: {
			width: "100%",
			height: "100%",
		},
		categoryGridContainer: {
			marginTop: 24,
		},
	});

export default HomeScreen;
