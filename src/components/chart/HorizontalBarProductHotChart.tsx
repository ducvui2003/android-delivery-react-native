import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { primary } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function HorizontalBarProductHotChart() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
				Best selling product chart
			</Text>
			<ScrollView horizontal={true} style={{ borderRadius: 12 }}>
				<BarChart
					yAxisLabel={"$"}
					yAxisSuffix=""
					data={{
						labels: ["Burger", "Taco", "Burrito", "Drink", "Pizza", "Donut"],
						datasets: [
							{
								data: [30, 200, 170, 250, 10, 100],
							},
						],
					}}
					width={Dimensions.get("screen").width}
					height={220}
					chartConfig={{
						backgroundColor: theme.background.getColor(),
						backgroundGradientFrom: primary.getColor("500"),
						backgroundGradientTo: primary.getColor("100"),
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						style: {
							borderRadius: 16,
						},
					}}
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</ScrollView>
		</View>
	);
}

export default HorizontalBarProductHotChart;