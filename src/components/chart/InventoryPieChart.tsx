import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export function InventoryPieChart() {
	return (
		<View>
			<Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
				Inventory Statistics by Product
			</Text>
			<ScrollView horizontal={true} style={{ borderRadius: 12}}>
				<PieChart
					data={[
						{
							name: "Donut",
							population: 120,
							color: "rgba(131, 167, 234, 1)",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Coca",
							population: 80,
							color: "#F00",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Taco",
							population: 45,
							color: "green",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Burrito",
							population: 95,
							color: "#ffa726",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Pizza",
							population: 60,
							color: "rgb(0, 0, 255)",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
					]}
					width={Dimensions.get("window").width - 50}
					height={220}
					chartConfig={{
						backgroundColor: "#e26a00",
						backgroundGradientFrom: "#fb8c00",
						backgroundGradientTo: "#ffa726",
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
					}}
					accessor="population"
					backgroundColor="transparent"
					paddingLeft="15"
					absolute
				/>
			</ScrollView>
		</View>
	);
}
