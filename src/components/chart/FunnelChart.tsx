import React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { primary } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

const FunnelChart = () => {
	const data = {
		labels: ["Viewers", "Added to Cart", "Checkout", "Purchased"],
		datasets: [
			{
				data: [1000, 750, 500, 300],
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
		propsForBackgroundLines: {
			strokeWidth: 1,
			stroke: "#ccc",
		},
	};

	return (
		<View>
			<Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
				Conversion Funnel: Viewers to Purchasers
			</Text>
			<ScrollView horizontal={true} style={{ borderRadius: 12}}>
				<BarChart
					data={data}
					width={Dimensions.get("window").width - 50}
					height={300}
					yAxisLabel=""
					yAxisSuffix="%"
					chartConfig={chartConfig}
					verticalLabelRotation={30}
					style={{
						marginVertical: 8,
						borderRadius: 12,
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default FunnelChart;
