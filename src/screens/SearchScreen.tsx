/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:30 AM - 27/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import {
	Image,
	Keyboard,
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
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import Col from "../components/custom/Col";
import InputSearch from "../components/input/InputSearch";
import ProductType from "../types/product.type";
import { products } from "../../assets/data/home/home";
import ProductHomeCard from "../components/card/product/ProductHomeCard";
import Grid from "../components/custom/Grid";
import Row from "../components/custom/Row";
import textStyle from "../configs/styles/textStyle.config";
import Space from "../components/custom/Space";
import NumberValue from "../configs/value/number.value";

type SearchScreenProps = {
	route: RouteProp<RootStackParamList, "SearchScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function SearchScreen({
	route: {
		params: { autoFocus, category },
	},
	navigation,
}: SearchScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	const renderTitle = () => {
		if (category) {
			return (
				<Row style={{ alignItems: "center", gap: 10, justifyContent: "center" }}>
					<Image resizeMode={"cover"} style={{ width: 30, height: 30 }} source={category.image} />
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
					<InputSearch autoFocus={autoFocus} placeholder="Vui lòng nhập tên sản phẩm" />
					<ScrollView
						style={[styles.scrollContainer]}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						{category && (
							<Grid<ProductType>
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
						)}
						<Space height={25} />
					</ScrollView>
				</Col>
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
