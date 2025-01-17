import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import Col from "../../../components/custom/Col";
import Row from "../../../components/custom/Row";
import { Header } from "../../../components/header/Header";
import InputIcon from "../../../components/input/InputIcon";
import Selector from "../../../components/selector/Selector";
import { neutral, primary, white } from "../../../configs/colors/color-template.config";
import { RootState } from "../../../configs/redux/store.config";
import textStyle from "../../../configs/styles/textStyle.config";
import NumberValue from "../../../configs/value/number.value";
import { RootStackParamList } from "../../../navigations/stack.type";
import { getOrderDetail, updateOrderStatus } from "../../../services/order.service";
import OrderDetailType from "../../../types/orderDetail.type";
import PromotionType from "../../../types/promotion.type";
import { ThemeType } from "../../../types/theme.type";
import formater from "../../../utils/formater";
import OrderPopUp from "./OrderPopup";
import { showModalNotify } from "../../../hooks/redux/modal.slice";
import { StatusOrderType } from "../../../types/order.type";
import { FlatList } from "react-native-gesture-handler";

type ManagementOrderDetailProps = {
	route: RouteProp<RootStackParamList, "ManagementOrderDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const promotions: PromotionType[] = [
	{
		id: "promo1",
		name: "Giảm giá vận chuyển",
		type: "SHIPPING",
		discountPromotionInfo: {
			discount: 10,
			startDate: new Date("2025-01-01"),
			expired: new Date("2025-12-31"),
		},
		promotionCode: "SHIP10",
		description: "Giảm 10% phí vận chuyển cho đơn hàng trên 500k",
	},
	{
		id: "promo2",
		name: "Giảm giá đơn hàng",
		type: "ORDER",
		discountPromotionInfo: {
			discount: 20,
			startDate: new Date("2025-02-01"),
			expired: new Date("2025-06-30"),
		},
		promotionCode: "ORDER20",
		description: "Giảm 20% cho tất cả các đơn hàng",
	},
	{
		id: "promo3",
		name: "Giảm giá đặc biệt",
		type: "ORDER",
		discountPromotionInfo: {
			discount: 15,
			startDate: new Date("2025-03-01"),
			expired: new Date("2025-09-30"),
		},
		promotionCode: "SPECIAL15",
		description: "Giảm giá đặc biệt 15% cho khách hàng VIP",
	},
	{
		id: "promo4",
		name: "Khuyến mãi mùa hè",
		type: "SHIPPING",
		discountPromotionInfo: {
			discount: 5,
			startDate: new Date("2025-06-01"),
			expired: new Date("2025-08-31"),
		},
		promotionCode: "SUMMER5",
		description: "Giảm 5% phí vận chuyển cho tất cả đơn hàng mùa hè",
	},
];

const ManagementOrderDetailScreen = ({
	route: {
		params: { id },
	},
	navigation,
}: ManagementOrderDetailProps) => {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [status, setStatus] = useState<StatusOrderType>("ACTIVE");
	const [showPopUp, setShowPopUp] = useState(false);
	const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);
	const styles = markStyles(theme);
	const appDispatch = useDispatch();
	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.replace("ManagementOrderScreen");
	}, [navigation]);

	const handleSelected = (selected: PromotionType) => {
		console.log("Selected promotion: ", selected);
	};

	useEffect(() => {
		getOrderDetail(id).then(data => {
			if (data) {
				setOrderDetail(data);
				setStatus(data.status);
			}
		});
	}, []);

	const handleSave = (data: StatusOrderType) => {
		updateOrderStatus(id, data)
			.then(() => {
				appDispatch(
					showModalNotify({
						onConfirm: () => {
							return true;
						},
						title: "Success",
						body: "Please check your order",
						width: "70%",
						showCancelButton: true,
					})
				);
				setStatus(data);
			})
			.catch(error => {
				appDispatch(
					showModalNotify({
						onConfirm: () => {
							return true;
						},
						title: "Error",
						body: "Update status failed, please try again",
						width: "70%",
						showCancelButton: true,
					})
				);
			})
			.finally(() => {
				setShowPopUp(false);
			});
	};

	const handleShowPopup = () => {
		setShowPopUp(true);
	};

	const renderItem = (item: PromotionType) => {
		return (
			<View style={[{ padding: 10 }, styles.itemSelected, styles.itemSelects]}>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
				<Text>Giảm: {item.discountPromotionInfo.discount}%</Text>
			</View>
		);
	};

	const renderItemSelected = (item: PromotionType) => {
		return (
			<View style={[{ padding: 10 }, styles.itemSelected]}>
				<Text style={{ fontWeight: "bold" }}>{item.name}</Text>
				<Text>{item.promotionCode}</Text>
			</View>
		);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				title={`Đơn hàng ${id}`}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				onPressBack={handleBackPress}
			/>

			<FlatList contentContainerStyle={{ flexGrow: 1 }} data={[1]} renderItem={() => {
				return 	<View key={"management-order-detail"}  style={{ flex: 1 }}>
					<Col style={styles.sub_container}>
						<Row flex={0} style={[{ justifyContent: "space-between", width: "100%", gap: 5 }]}>
							<View style={{ flex: 0.3 }}>
								<InputIcon
									styleInput={styles.stylesInput}
									value={"# " + orderDetail?.id || ""}
									editable={false}
								/>
							</View>

							<View style={{ flex: 1 }}>
								<InputIcon
									editable={false}
									styleInput={[styles.stylesInput, { flex: 0 }]}
									value={"Phone: " + orderDetail?.phone || ""}
								/>
							</View>
						</Row>

						<InputIcon
							editable={false}
							styleInput={[styles.stylesInput, { flex: 0 }]}
							value={"Email: " + orderDetail?.email || ""}
						/>
						<InputIcon
							editable={false}
							value={"Status: " + status}
							iconRight={
								<TouchableOpacity onPress={handleShowPopup}>
									<View style={styles.buttonEdit}>
										<SolarPenBold width={26} height={26} color={white.getColor()} />
									</View>
								</TouchableOpacity>
							}
						/>
						<InputIcon styleInput={styles.stylesInput} editable={false} value={"Promotion 01"} />
						<Selector
							data={promotions}
							renderItem={renderItem}
							renderItemSelected={renderItemSelected}
							onSelected={handleSelected}
						/>
						<InputIcon
							editable={false}
							styleInput={styles.stylesInput}
							value={"Address: " + orderDetail?.address || ""}
						/>
						<View style={{ flex: 1 }}>
							{orderDetail?.items.map(item => (
								<View
									key={item.id}
									style={[
										styles.container_sp,
										{ backgroundColor: theme.basket.background.getColor(), marginBottom: 20 },
									]}
								>
									<Row style={styles.content}>
										<View style={{ flex: 0.7 }}>
											<Image
												source={{ uri: item.image }}
												style={{
													width: "100%",
													height: "100%",
													borderRadius: 8,
													objectFit: "cover",
												}}
											/>
										</View>
										<Row style={styles.content}>
											<Col style={{ justifyContent: "space-between" }}>
												<Text style={[styles.orderIdText, { color: theme.text_1.getColor() }]}>
													{item.name}
												</Text>
												<Text style={styles.priceText}>
													{formater.formatCurrency(item.price)}
												</Text>
												<Text>Quantity: {item.quantity}</Text>
												<ScrollView
													horizontal={true}
													showsHorizontalScrollIndicator={false}
													contentContainerStyle={[{ gap: 10, marginTop: 8 }]}
												>
													{item?.options?.map(option => (
														<View key={option.id} style={styles.status}>
															<Text key={option.id} style={styles.statusText}>
																{option.name}:{" "}
																{formater.formatCurrency(option?.price || 0)}
															</Text>
														</View>
													))}
												</ScrollView>
											</Col>
										</Row>
									</Row>
								</View>
							))}
						</View>
					</Col>
				</View>
			}} />

			<OrderPopUp showed={showPopUp} onSave={handleSave} onShowed={value => setShowPopUp(value)} />
		</SafeAreaView>
	);
};

const markStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			gap: 20,
		},
		contentContainer: {
			padding: NumberValue.paddingHorizontalScreen,
		},
		sub_container: {
			padding: 16,
			gap: 20,
			borderRadius: 8,
		},
		row: {
			justifyContent: "space-between",
		},
		buttonEdit: {
			width: 42,
			backgroundColor: primary.getColor("500"),
			height: 42,
			borderRadius: 21,
			justifyContent: "center",
			alignItems: "center",
		},
		container_sp: {
			backgroundColor: theme.background.getColor(),
			borderRadius: 12,
			padding: 10,
			shadowColor: "#0D0A2C",
			shadowOffset: { width: -50, height: 5 },
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 5,
		},
		stylesInput: {
			height: 40,
		},
		textItemSelect: {
			paddingLeft: 8,
			fontWeight: "bold",
		},
		itemSelected: {
			alignItems: "center",
		},
		itemSelects: {
			padding: 8,
			backgroundColor: theme.background_input.getColor(),
			borderBottomWidth: 1,
			borderBottomColor: theme.border.getColor(),
			borderStyle: "solid",
		},
		status: {
			backgroundColor: "#FF5733",
			borderRadius: 20,
			paddingVertical: 4,
			paddingHorizontal: 16,
		},
		statusText: {
			fontWeight: "bold",
			fontSize: 14,
			color: "#fff",
		},
		content: {
			gap: 20,
		},
		orderIdText: {
			...textStyle["16_regular"],
			color: neutral.getColor("900"),
			fontWeight: "bold",
		},
		priceText: {
			...textStyle["16_semibold"],
			color: primary.getColor("500"),
		},
	});

export default ManagementOrderDetailScreen;
