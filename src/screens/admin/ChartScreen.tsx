import { Keyboard, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { ThemeType } from "../../types/theme.type";
import NumberValue from "../../configs/value/number.value";
import textStyle from "../../configs/styles/textStyle.config";
import React, { useCallback } from "react";
import AovBarChart from "../../components/chart/AOVBarChart";
import AOVLineChart from "../../components/chart/AOVLineChart";
import FunnelChart from "../../components/chart/FunnelChart";
import { InventoryPieChart } from "../../components/chart/InventoryPieChart";
import HorizontalBarProductHotChart from "../../components/chart/HorizontalBarProductHotChart";
import { Header } from "../../components/header/Header";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ChartScreenProps = {
	route: RouteProp<RootStackParamList, "ChartScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function ChartScreen({ navigation }: ChartScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	return (
		<SafeAreaView style={[styles.container, styles.layoutScreen]}>
			{/*<Row flex={0}>*/}
			{/*	<GradientIconSvg*/}
			{/*		icon={<SolarChart2Bold width={60} height={60} />}*/}
			{/*		gradientColors={[primary.getColor("500"), primary.getColor("300")]}*/}
			{/*	/>*/}
			{/*	<Text style={styles.titleHeader}>Dashboard</Text>*/}
			{/*</Row>*/}
			<Header
				title="Dashboard"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				onPressBack={handleBackPress}
			/>

			<ScrollView>
				<HorizontalBarProductHotChart />
				<InventoryPieChart />
				<FunnelChart />
				<AovBarChart />
				<AOVLineChart />
			</ScrollView>
		</SafeAreaView>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
		},
		layoutScreen: {
			paddingHorizontal: NumberValue.paddingHorizontalScreen,
		},
		titleHeader: {
			...textStyle["40_semibold"],
			fontSize: 40,
			fontWeight: "bold",
			paddingStart: 12,
			color: theme.text_1.getColor(),
		},
	});
