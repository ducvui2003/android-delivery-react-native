"use strict";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import SolarOption from "../../../../assets/images/icons/SolarOption";
import { Header } from "../../../components/header/Header";
import InputSearch from "../../../components/input/InputSearch";
import Order from "../../../components/orders/Order";
import { OrderProps } from "../../../components/orders/type/order.props";
import { RootState } from "../../../configs/redux/store.config";
import spacing from "../../../configs/styles/space.config";
import NumberValue from "../../../configs/value/number.value";
import { RootStackParamList } from "../../../navigations/stack.type";
import OrderType from "../../../types/order.type";
import { ThemeType } from "../../../types/theme.type";
import { getOrders } from "../../../services/order.service";

type ManagementOrderProps = {
	route: RouteProp<RootStackParamList, "ManagementOrderDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function ManagementOrderScreen({ navigation }: ManagementOrderProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = getStyles(theme);
	const [orders, setOrders] = React.useState<OrderProps[]>([]);

	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	const handleOptionPress = useCallback(() => {}, []);
	const renderItem = ({ item }: { item: OrderProps }) => {
		return (
			<Order
				{...item}
				onPress={() => {
					navigation.navigate("ManagementOrderDetailScreen", { id: item.id });
				}}
			/>
		);
	};

	useEffect(() => {
		getOrders(
			{
				star: null,
				status: null,
				page: 0,
				limit: 10,
			},
			true
		)
			.then((orders: OrderType[] | undefined) => {
				if (orders) {
					setOrders(orders.map(order => ({ ...order, onPress: () => {} })));
				}
			})
			.catch(error => {
				console.error("Error when get orders", error);
			});
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				title="Management Order"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				styleIconRight={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				iconRight={<SolarOption width={30} height={30} color={theme.text_1.getColor()} />}
				onPressIconRight={handleOptionPress}
				showIconBack={true}
				onPressBack={() => navigation.pop()}
			/>
			<View style={styles.container_main}>
				<InputSearch placeholder="Search" />
			</View>
			<FlatList
				data={orders}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: spacing["spaced-7"] }}
			/>
		</SafeAreaView>
	);
}

export default ManagementOrderScreen;

const getStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container_main: {
			flex: 0,
			marginVertical: 10,
			paddingHorizontal: NumberValue.paddingHorizontalScreen,
		},
	});
