import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { primary } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

const AOVLineChart = () => {
	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Các tháng
		datasets: [
			{
				data: [450, 470, 430, 480, 500, 520, 510, 530, 500, 490, 470, 460],
				color: (opacity = 1) => `rgba(97, 156, 223, ${opacity})`,
				strokeWidth: 2,
			},
		],
		legend: ["AOV by Month"],
	};

	const theme = useSelector((state: RootState) => state.themeState.theme);
	const chartConfig = {
		backgroundColor: theme.background.getColor(),
		backgroundGradientFrom: primary.getColor("500"),
		backgroundGradientTo: primary.getColor("100"),
		decimalPlaces: 0,
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		propsForDots: {
			r: "4",
			strokeWidth: "2",
			stroke: "#61A0FF",
		},
	};

	return (
		<View>
			<Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
				AOV Trend Over Time
			</Text>
			<ScrollView horizontal={true} style={{ borderRadius: 12}}>
				<LineChart
					data={data}
					width={Dimensions.get("window").width * 1.5}
					height={300}
					chartConfig={chartConfig}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 12,
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default AOVLineChart;
