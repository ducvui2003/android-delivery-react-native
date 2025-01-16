import React, { useCallback, useState } from "react";
import { Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header } from "../../../components/header/Header";
import InputIcon from "../../../components/input/InputIcon";
import { neutral, primary, white } from "../../../configs/colors/color-template.config";
import NumberValue from "../../../configs/value/number.value";
import Row from "../../../components/custom/Row";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import Col from "../../../components/custom/Col";
import OrderPopUp from "./OrderPopup";
import Selector from "../../../components/selector/Selector";
import PromotionType from "../../../types/promotion.type";
import { ThemeType } from "../../../types/theme.type";
import formater from "../../../utils/formater";
import IconRating from "../../../components/rating/IconRating";
import StatusLabel from "../../../components/orders/StatusLabel";
import textStyle from "../../../configs/styles/textStyle.config";
import { burger } from "../../../../assets/images/category/category.icon";
import { orders } from "../../../../assets/data/order/order";

type StatusOrderType = "Active" | "Completed" | "Cancelled";

type ManagmentOrderDetailProps = {
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
}: ManagmentOrderDetailProps) => {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [status, setStatus] = useState<StatusOrderType>("Active");
	const [showPopUp, setShowPopUp] = useState(false);
	const styles = markStyles(theme);
	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	const handleSelected = (selected: PromotionType) => {
		console.log("Selected promotion: ", selected);
	};

	const handleSave = (data: any) => {
		console.log("Data saved:", data);
		setShowPopUp(false);
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

			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1 }}>
					<Col style={styles.sub_container}>
						<InputIcon styleInput={styles.stylesInput} value={"Đơn hàng SP1"} />
						<Row flex={0} style={[{ justifyContent: "space-between", width: "100%", gap: 5 }]}>
							<View style={{ flex: 1 }}>
								<InputIcon
									styleInput={[styles.stylesInput, { flex: 0 }]}
									value={"thanhbinh2757@gmail.com"}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<InputIcon styleInput={[styles.stylesInput, { flex: 0 }]} value={"0901323070"} />
							</View>
						</Row>
						<InputIcon
							value={"Active"}
							iconRight={
								<TouchableOpacity onPress={handleShowPopup}>
									<View style={styles.buttonEdit}>
										<SolarPenBold width={26} height={26} color={white.getColor()} />
									</View>
								</TouchableOpacity>
							}
						/>
						<InputIcon styleInput={styles.stylesInput} value={"Promotion 01"} />
						<Selector
							data={promotions}
							renderItem={renderItem}
							renderItemSelected={renderItemSelected}
							onSelected={handleSelected}
						/>
						<InputIcon styleInput={styles.stylesInput} value={"7"} />
						<InputIcon
							styleInput={styles.stylesInput}
							value={"Địa chỉ: 123, Nguyễn Văn Linh, Quận 7, TP.HCM"}
						/>
						<View style={{ flex: 1 }}>
							{orders.map(order => (
								<TouchableOpacity
									key={order.id}
									style={[styles.container_sp, { backgroundColor: theme.basket.background.getColor(), marginBottom: 20}]}
								>
									<Row style={styles.content}>
										<View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
											<Image source={burger} style={{ width: 50, height: 50 }} />
										</View>
										<Row style={styles.content}>
											<Col style={{ justifyContent: "space-between" }}>
												<Text style={{ color: theme.text_1.getColor() }}>
													Món :{" "}
													<Text
														style={[styles.oderIdText, { color: theme.text_1.getColor() }]}
													>
														{order.products[0].name}
													</Text>
												</Text>
												<Text style={styles.priceText}>
													{formater.formatCurrency(order.products[0].price)}{" "}
												</Text>
												<Text>Số lượng: 1</Text>
												<Text></Text>
											</Col>
											<Col style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
												<Text style={styles.status}>Nhiều bơ</Text>
												<Text style={styles.status}>Thêm bò</Text>
											</Col>
											<Col style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
												<Text>+5k</Text>
												<Text>+20k</Text>
											</Col>
										</Row>
									</Row>
								</TouchableOpacity>
							))}
						</View>
					</Col>
				</View>
			</ScrollView>
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
			color: "#fff",
			borderRadius: 20,
			paddingVertical: 4,
			paddingHorizontal: 16,
			fontWeight: "bold",
			fontSize: 14,
		},
		content: {
			justifyContent: "space-between",
		},
		oderIdText: {
			...textStyle["12_medium"],
			color: neutral.getColor("900"),
			fontWeight: "bold",
		},
		priceText: {
			...textStyle["16_semibold"],
			color: primary.getColor("500"),
		},
	});

export default ManagementOrderDetailScreen;
