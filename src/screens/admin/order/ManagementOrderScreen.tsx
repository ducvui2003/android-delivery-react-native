"use strict";
import React, { useCallback } from "react";
import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header } from "../../../components/header/Header";
import InputSearch from "../../../components/input/InputSearch";
import Order from "../../../components/orders/Order";
import { ThemeType } from "../../../types/theme.type";
import NumberValue from "../../../configs/value/number.value";
import SolarOption from "../../../../assets/images/icons/SolarOption";
import { OrderProps } from "../../../components/orders/type/order.props";
import spacing from "../../../configs/styles/space.config";
import { FlatList } from "react-native-gesture-handler";
import { Role } from "../../../components/auth/const/authenticationConst";
import ProtectedRoute from "../../../components/auth/ProtectedRoute";
import { DATA } from "../../../../assets/data/order/order";

type ManagementOrderProps = {
	route: RouteProp<RootStackParamList, "ManagementOrderDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function ManagementOrderScreen({ navigation }: ManagementOrderProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = getStyles(theme);

	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	const handleOptionPress = useCallback(() => {}, []);
	const renderItem = ({ item }: { item: OrderProps }) => {
		return (
			<ProtectedRoute key={item.id} allowRoles={item.role ? (item.role as Role[]) : undefined}>
				<Order
					{...item}
					onPress={() => {
						navigation.navigate("ManagementOrderDetailScreen", { id: item.id });
					}}
					role={item.role}
				/>
			</ProtectedRoute>
		);
	};

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
			/>
			<View style={styles.container_main}>
				<InputSearch placeholder="Search" />
			</View>
			<FlatList
				data={DATA}
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
