/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 19/08/2024 - 16:04
 * User: ducvui2003
 **/

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useSelector } from "react-redux";
import { products } from "../../../assets/data/home/home";
import SolarAltArrowRightOutline from "../../../assets/images/icons/SolarArrowRightOutline";
import ProductHomeCard from "../../components/card/product/ProductHomeCard";
import Col from "../../components/custom/Col";
import Grid from "../../components/custom/Grid";
import Row from "../../components/custom/Row";
import GradientText from "../../components/gradientText/GradientText";
import { gradient, primary } from "../../configs/colors/color-template.config";
import { RootState } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import { HomeScreenStackParamList } from "../../navigations/stack.type";
import { Product } from "../../types/product.type";
import { ThemeType } from "../../types/theme.type";

const HomeProductsFragment = () => {
	const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList, "ProductsScreen">>();

	const onClickViewAll = () => {
		navigation.navigate("ProductsScreen");
	};

	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = styled(theme);
	return (
		<Col style={styles.productList}>
			<Row style={styles.productGridContainerHeading}>
				<Text style={styles.productGridContainerHeadingText}>Special Offers</Text>
				<TouchableOpacity
					style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
					onPress={() => onClickViewAll()}
				>
					<GradientText text={"View All"} textStyle={styles.more} gradientColors={gradient.getColor()} />
					<SolarAltArrowRightOutline width={25} height={25} color={primary.getColor("500")} />
				</TouchableOpacity>
			</Row>
			<View style={styles.productGridContainer}>
				<Grid<Product>
					col={2}
					data={products}
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
			</View>
		</Col>
	);
};

const styled = (theme: ThemeType) =>
	StyleSheet.create({
		productList: {
			marginTop: 32,
			marginBottom: 100,
		},
		productGridContainer: {
			marginTop: 24,
		},
		productGridContainerHeading: {
			justifyContent: "space-between",
			alignItems: "center",
		},
		productGridContainerHeadingText: {
			...textStyle["16_semibold"],
			color: theme.home.heading.getColor(),
		},
		more: {
			...textStyle["16_semibold"],
			width: 60,
		},
	});

export default HomeProductsFragment;
