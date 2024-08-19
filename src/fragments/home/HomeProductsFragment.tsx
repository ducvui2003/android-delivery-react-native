/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 19/08/2024 - 16:04
 * User: ducvui2003
 **/

import React from "react";
import Col from "../../components/custom/Col";
import Row from "../../components/custom/Row";
import { StyleSheet, Text, View } from "react-native";
import Grid from "../../components/custom/Grid";
import { Product } from "../../types/product.type";
import { products } from "../../../assets/data/home/home";
import ProductHomeCard from "../../components/card/product/ProductHomeCard";
import { ThemeType } from "../../types/theme.type";
import { gradient, neutral, primary } from "../../configs/colors/color-template.config";
import textStyle from "../../configs/styles/textStyle.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import GradientText from "../../components/grandientText/GradientText";
import SolarAltArrowRightOutline from "../../../assets/images/icons/SolarArrowRightOutline";

const HomeProductsFragment = () => {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = styled(theme);
	return (
		<Col style={styles.productList}>
			<Row style={styles.productGridContainerHeading}>
				<Text style={styles.productGridContainerHeadingText}>Special Offers</Text>
				<Row style={{ alignItems: "center", gap: 10 }}>
					<GradientText
						text={"View All"}
						textStyle={styles.more}
						gradientColors={gradient.getColor()}
					/>
					<SolarAltArrowRightOutline
						width={25}
						height={25}
						color={primary.getColor("500")}
					/>
				</Row>
			</Row>
			<View style={styles.productGridContainer}>
				<Grid<Product>
					col={2}
					data={products}
					renderItem={(item, index) => {
						return <ProductHomeCard key={index} product={item} />;
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
