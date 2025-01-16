import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { ThemeType } from "../../types/theme.type";
import { primary } from "../../configs/colors/color-template.config";
import NumberValue from "../../configs/value/number.value";
import SolarChart2Bold from "../../../assets/images/icons/SolarChart2Bold";
import Row from "../../components/custom/Row";
import GradientIconSvg from "../../components/grandientIconSvg/GradientIconSvg";
import textStyle from "../../configs/styles/textStyle.config";
import { BarChart, PieChart } from "react-native-chart-kit";

export default function ChartScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	return (
		<SafeAreaView style={[styles.container, styles.layoutScreen]}>
			<Row>
				<GradientIconSvg
					icon={<SolarChart2Bold width={60} height={60} />}
					gradientColors={[primary.getColor("500"), primary.getColor("300")]}
				/>
				<Text style={styles.titleHeader}>Dashboard</Text>
			</Row>

			<ScrollView >
				<View style={{ flex: 1}}>
					<ScrollView horizontal={true} style={{borderRadius: 12 }}>
						<BarChart
							data={{
								labels: ["Burger", "Taco", "Burrito", "Drink", "Pizza", "Donut"],
								datasets: [
									{
										data: [30, 200, 170, 250, 10, 100]
									}
								]
							}}
							width={Dimensions.get("screen").width} // Chiều rộng biểu đồ lớn hơn màn hình
							height={220}
							chartConfig={{
								backgroundColor: theme.background.getColor(),
								backgroundGradientFrom: primary.getColor("500"),
								backgroundGradientTo: primary.getColor("100"),
								decimalPlaces: 2,
								color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								style: {
									borderRadius: 16
								}
							}}
							style={{
								marginVertical: 8,
								borderRadius: 16
							}}
						/>
					</ScrollView>
				</View>

				<PieChart
					data={[
						{
							name: "Seoul",
							population: 21500000,
							color: "rgba(131, 167, 234, 1)",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Toronto",
							population: 2800000,
							color: "#F00",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Beijing",
							population: 527612,
							color: "red",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "New York",
							population: 8538000,
							color: "#ffffff",
							legendFontColor: "#7F7F7F",
							legendFontSize: 15,
						},
						{
							name: "Moscow",
							population: 11920000,
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
					absolute // Hiển thị giá trị tuyệt đối thay vì phần trăm
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

// const HorizontalBarChart = () => {
// 	const theme = useSelector((state: RootState) => state.themeState.theme);
// 	const styles = makeStyled(theme);
// 	// Dữ liệu
// 	const data = [
// 		{ product: "Sản phẩm A", value: 120 },
// 		{ product: "Sản phẩm B", value: 80 },
// 		{ product: "Sản phẩm C", value: 45 },
// 		{ product: "Sản phẩm D", value: 60 },
// 		{ product: "Sản phẩm E", value: 30 },
// 	];
//
// 	// Tách giá trị và nhãn
// 	const values = data.map(item => item.value);
// 	const labels = data.map(item => item.product);
//
// 	// Tùy chỉnh nhãn
// 	const Labels = ({ x, y, bandwidth }) =>
// 		data.map((item, index) => (
// 			<SVGText
// 				key={index}
// 				x={x(0) - 10} // Đặt nhãn bên trái
// 				y={y(index) + bandwidth / 2} // Căn giữa thanh
// 				alignmentBaseline="middle"
// 				fontSize={12}
// 				fill="black"
// 			>
// 				{item.product}
// 			</SVGText>
// 		));
//
// 	return (
// 		<View style={styles.container}>
// 			<Text style={{}}>Biểu đồ cột ngang</Text>
// 			<View style={{ height: 250 }}>
// 				<BarChart
// 					style={{ flex: 1 }}
// 					data={values}
// 					svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
// 					horizontal={true} // Hiển thị ngang
// 					contentInset={{ top: 10, bottom: 10 }}
// 					spacing={0.2}
// 					gridMin={0}
// 				>
// 					<Grid direction={Grid.D} />
// 					<Labels />
// 				</BarChart>
// 			</View>
// 		</View>
// 	);
// };

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
		},
		layoutScreen: {
			paddingHorizontal: NumberValue.paddingHorizontalScreen,
			paddingTop: NumberValue.paddingTopScreen,
		},
		titleHeader: {
			...textStyle["40_semibold"],
			fontSize: 40,
			fontWeight: "bold",
			paddingStart: 12,
			color: theme.text_1.getColor(),
		},
	});
