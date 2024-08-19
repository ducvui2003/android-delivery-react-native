/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 12:51 pm
 * User: ducvui2003
 **/

import React, { useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import { banners, categories } from "../../../assets/data/home/home";
import SolarMagniferOutline from "../../../assets/images/icons/MagniferOutline";
import RivetIconsFilter from "../../../assets/images/icons/SolarFilterOutline";
import Carousel from "../../components/carousel/Carousel";
import CategoryItem from "../../components/category/CategoryItem";
import InputSearch from "../../components/input/InputSearch";
import Grid from "../../components/custom/Grid";
import { neutral } from "../../configs/colors/color-template.config";
import { RootState } from "../../configs/redux/store.config";
import HomeHeaderFragment from "../../fragments/home/HomeHeaderFragment";
import { Category } from "../../types/category.type";
import { ThemeType } from "../../types/theme.type";
import HomeProductsFragment from "../../fragments/home/HomeProductsFragment";
function HomeScreen() {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [, setCurrentPageViewPager] = useState(0);
	const viewPagerRef = useRef<PagerView>();

	return (
		<ScrollView style={styles.container}>
			<HomeHeaderFragment />

			<View style={styles.bannerContainer}>
				<Carousel<object>
					data={banners}
					viewPagerRef={viewPagerRef}
					renderItem={(item, index) => {
						return (
							<View style={{ borderRadius: 12, overflow: "hidden" }}>
								<Image key={index} style={styles.banner} source={item} />
							</View>
						);
					}}
					positionListDot={{
						position: "left",
						side: "bottom",
					}}
					onCurrentPage={currentPage => setCurrentPageViewPager(currentPage)}
				/>
			</View>

			<InputSearch
				iconLeft={
					<SolarMagniferOutline width={25} height={25} color={neutral.getColor("100")} />
				}
				iconRight={
					<RivetIconsFilter
						width={25}
						height={25}
						color={theme.home.search.icon.getColor()}
					/>
				}
				placeholder="Vui lòng nhập tên sản phẩm"
			/>

			<View style={styles.categoryGridContainer}>
				<Grid<Category>
					col={4}
					data={categories}
					gapRow={24}
					renderItem={(item, index) => <CategoryItem key={index} item={item} />}
				/>
			</View>
			<HomeProductsFragment />
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
			marginTop: 24,
			marginBottom: 8,
			height: 220,
		},
		banner: {
			width: Dimensions.get("window").width + 10,
			marginHorizontal: -10,
		},
		categoryGridContainer: {
			marginTop: 24,
		},
	});

export default HomeScreen;
