import React from "react";
import { Dimensions, ScrollView, View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { primary } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function AovBarChart() {
	const data = {
		labels: ["Burger", "Drink", "Taco", "Pizza", "Noodles", "Pasta"],
		datasets: [
			{
				data: [500, 300, 450, 200, 350, 400],
			},
		],
	};
	const theme = useSelector((state: RootState) => state.themeState.theme);

	const chartConfig = {
		backgroundColor: theme.background.getColor(),
		backgroundGradientFrom: primary.getColor("500"),
		backgroundGradientTo: primary.getColor("100"),
		decimalPlaces: 0,
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		barPercentage: 0.5,
	};
	return (
		<View>
			<Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
				AOV Comparison by Category
			</Text>
			<ScrollView horizontal={true} style={{ borderRadius: 12 }}>
				<BarChart
					data={data}
					width={Dimensions.get("window").width - 50}
					height={300}
					chartConfig={chartConfig}
					yAxisLabel="$"
					yAxisSuffix=""
					style={{
						marginVertical: 8,
						borderRadius: 12,
					}}
				/>
			</ScrollView>
		</View>
	);
}

export default AovBarChart;
