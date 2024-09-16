import {StyleSheet, Text, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../navigations/stack.type";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {ThemeType} from "../types/theme.type";
import {Header} from "../components/header/Header";
import * as React from "react";
import SolarMenuDotsLinear from "../../assets/images/icons/SolarMenuDotLinear";
import Col from "../components/custom/Col";
import StatusLabel from "../components/orders/StatusLabel";
import OrderDetailType from "../types/orderDetail.type";
import {SafeAreaView} from "react-native-safe-area-context";
import Row from "../components/custom/Row";
import Space from "../components/custom/Space";
import {secondary} from "../configs/colors/color-template.config";

type OrderDetailScreenProps = {
	route: RouteProp<RootStackParamList, "OrderDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};
export default function OrderDetailScreen({
											  route: {
												  params: {id},
											  },
											  navigation,
										  }: OrderDetailScreenProps) {

	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	const [orderDetail, setOrderDetail] = React.useState<OrderDetailType>()

	return (
		<SafeAreaView style={styles.container}>
			<Header
				title={id}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				iconRight={<View style={styles.styleBackgroundIconRight}><SolarMenuDotsLinear/></View>}
			/>
			<Col>
				<Row>
					<Text>Order Summary</Text>
					<StatusLabel status={orderDetail?.status}/>
				</Row>
			</Col>

		</SafeAreaView>
	)
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		styleBackgroundIconRight: {
			backgroundColor: theme.background.getColor(),
			padding: 8,
			borderRadius: 50,
			shadowColor: "#0D0A2C",
			shadowOffset: {width: -50, height: 5},
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 2,
		}

	})