/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:27 AM - 27/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Grid from "../components/custom/Grid";
import CategoryItem from "../components/category/CategoryItem";
import data from "../../assets/data/category/category";
import CategoryType from "../types/category.type";
import NumberValue from "../configs/value/number.value";

type CategoriesScreenProps = {
	route: RouteProp<RootStackParamList, "CategoriesScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function CategoriesScreen({ navigation }: CategoriesScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.getColor() }}>
			<Header
				title={"Categories"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => {
					navigation.pop();
				}}
			/>
			<View style={{ paddingHorizontal: NumberValue.paddingHorizontalScreen }}>
				<Grid<CategoryType>
					col={4}
					data={data}
					renderItem={(item, index) => {
						return (
							<CategoryItem
								key={index.toString()}
								item={item}
								onPress={() => {
									navigation.navigate("SearchScreen", {
										autoFocus: false,
										category: item,
									});
								}}
							/>
						);
					}}
					gapRow={25}
				/>
			</View>
		</SafeAreaView>
	);
}
