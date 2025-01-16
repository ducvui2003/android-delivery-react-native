import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { MyLocation } from "../../assets/data/location/location";
import { FluentLocation16Filled } from "../../assets/images/icons/FluentLocation16Filled";
import SolarBag5Bold from "../../assets/images/icons/SolarBag5Bold";
import SolarMenuDotsLinear from "../../assets/images/icons/SolarMenuDotLinear";
import SolarPenBold from "../../assets/images/icons/SolarPenBold";
import SolarTicketSaleBold from "../../assets/images/icons/SolarTicketSaleBold";
import SolarWalletBold from "../../assets/images/icons/SolarWalletBold";
import Col from "../components/custom/Col";
import Row from "../components/custom/Row";
import GradientView from "../components/gradientView/GradientView";
import { Header } from "../components/header/Header";
import BoxInfoNecessary from "../components/orderDetail/BoxInfoNecessary";
import InputReviewArea from "../components/orderDetail/InputReviewArea";
import ProductOrderCard from "../components/orderDetail/ProductOrderCard";
import StatusLabel from "../components/orders/StatusLabel";
import IconRating from "../components/rating/IconRating";
import { primary } from "../configs/colors/color-template.config";
import { RootState, useAppDispatch } from "../configs/redux/store.config";
import textStyle from "../configs/styles/textStyle.config";
import { RootStackParamList } from "../navigations/stack.type";
import { getOrderDetail } from "../services/order.service";
import { ORDER_STATUS_ACTIVE, ORDER_STATUS_CANCELLED, ORDER_STATUS_COMPLETED } from "../types/order.type";
import OrderDetailType from "../types/orderDetail.type";
import PaymentMethodType from "../types/paymentMethod.type";
import { ThemeType } from "../types/theme.type";
import formater from "../utils/formater";
import { addCart, CartType } from "../hooks/redux/cart.slice";
import { showModalNotify } from "../hooks/redux/modal.slice";

type OrderDetailScreenProps = {
	route: RouteProp<RootStackParamList, "OrderDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
	onPressCamera?: () => void;
	onPressInsertPicture?: () => void;
	onPressCancelOrder?: () => void;
	onPressTrackOrder?: () => void;
};
export default function OrderDetailScreen({
	route: {
		params: { id },
	},
	navigation,
	onPressCamera,
	onPressInsertPicture,
	onPressTrackOrder,
}: OrderDetailScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [orderDetail, setOrderDetail] = React.useState<OrderDetailType | null>(null);
	const appDispatch = useAppDispatch();

	React.useEffect(() => {
		getOrderDetail(id)
			.then((response: OrderDetailType | undefined) => {
				if (response) {
					setOrderDetail(response);
				}
			})
			.catch();
	}, []);

	const handlePreOrderItem = (productId: string, optionIds?: string[]) => {
		console.log("productId", productId);
		console.log("optionIds", optionIds);

		if (!productId || !optionIds) return;
		appDispatch(
			addCart({
				productId,
				quantity: 1,
				optionIds,
			})
		).then(action => {
			if (action.type === CartType.ADD_FULFILLED) {
				appDispatch(
					showModalNotify({
						title: "Success",
						body: "Please check your order",
						width: "70%",
						showCancelButton: true,
					})
				);
			} else {
				appDispatch(
					showModalNotify({
						title: "Error",
						body: "Add cart failed",
						width: "70%",
						showCancelButton: true,
					})
				);
			}
		});
	};

	return (
		<View style={styles.container}>
			<Header
				title={"# " + id}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
					elevation: 5,
				}}
				onPressBack={() => navigation.pop()}
				iconRight={
					<View style={styles.styleBackgroundIconRight}>
						<SolarMenuDotsLinear />
					</View>
				}
			/>
			<ScrollView>
				<View style={{ paddingHorizontal: 25 }}>
					<Row style={styles.orderSummary}>
						<Text style={{ color: theme.text_1.getColor() }}>Order Summary</Text>
						<StatusLabel status={orderDetail?.status ? orderDetail?.status : ORDER_STATUS_ACTIVE} />
					</Row>

					{orderDetail?.items.map(product => {
						return (
							<ProductOrderCard
								key={product.productId}
								{...product}
								status={orderDetail?.status}
								reorderOnPress={() => {
									handlePreOrderItem(
										product.productId,
										product.options?.map(option => option.id)
									);
								}}
							/>
						);
					})}

					<BoxInfoNecessary
						iconTopRight={<FluentLocation16Filled />}
						titleInfo={"Deliver to"}
						styleDescriptionInfo={styles.styleDescriptionInfo}
						descriptionInfo={
							{
								name: "Home",
								address: orderDetail?.address ? orderDetail.address : "",
							} as MyLocation
						}
					/>

					<BoxInfoNecessary
						iconTopRight={<SolarWalletBold />}
						titleInfo={"Payment Method"}
						styleDescriptionInfo={styles.styleDescriptionInfo}
						descriptionInfo={
							{
								type: orderDetail?.paymentMethod ? orderDetail?.paymentMethod : "",
							} as PaymentMethodType
						}
					/>

					<BoxInfoNecessary
						iconTopRight={<SolarTicketSaleBold />}
						styleDescriptionInfo={styles.styleDescriptionInfo}
						titleInfo={"Promotions"}
						descriptionInfo={orderDetail?.promotions ? orderDetail?.promotions : []}
					/>

					<Col>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Subtotal</Text>
							<Text style={styles.summaryNumberArea}>
								{formater.formatCurrency(orderDetail?.subTotal ? orderDetail.subTotal : 0)}
							</Text>
						</Row>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Delivery Fee</Text>
							<Text style={styles.summaryNumberArea}>
								{orderDetail?.deliveryFee !== 0 ? orderDetail?.deliveryFee : "FREE"}
							</Text>
						</Row>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Discount</Text>
							<Text style={styles.summaryNumberArea}>
								{formater.formatCurrency(orderDetail?.discount ? orderDetail?.discount : 0)}
							</Text>
						</Row>
						<View
							style={{ borderWidth: 1, borderColor: theme.text_1.getColor(), backgroundColor: "black" }}
						/>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Total</Text>
							<Text style={styles.summaryNumberArea}>
								{formater.formatCurrency(orderDetail?.subTotal ? orderDetail.subTotal : 0)}
							</Text>
						</Row>
					</Col>

					{orderDetail?.status === ORDER_STATUS_COMPLETED && (
						<Col style={{ paddingBottom: 24 }}>
							<IconRating iconSize={60} total={5} rating={orderDetail.starReview} />
						</Col>
					)}
					{orderDetail?.status === ORDER_STATUS_COMPLETED && (
						<InputReviewArea
							placeholder={"Type your review ..."}
							value={orderDetail.description}
							styleInput={styles.inputReview}
							onPressIconLeft={onPressCamera}
							onPressIconRight={onPressInsertPicture}
						/>
					)}

					{orderDetail?.status === ORDER_STATUS_CANCELLED && (
						<Row style={{ justifyContent: "space-between", paddingVertical: 20 }}>
							<Col>
								<Text style={{ ...textStyle["16_regular"] }}>Reason for cancellation</Text>
								<Text style={{ ...textStyle["16_semibold"] }}>{orderDetail.reasonForCancellation}</Text>
							</Col>
							<TouchableOpacity style={{ borderRadius: 50 }}>
								<GradientView
									gradientColors={[primary.getColor("500"), primary.getColor("300")]}
									style={{ padding: 10, borderRadius: 50 }}
								>
									<SolarPenBold width={26} height={26} color={"white"} />
								</GradientView>
							</TouchableOpacity>
						</Row>
					)}

					<Col style={styles.bottomNavigate}>
						{orderDetail?.status === ORDER_STATUS_ACTIVE ? (
							<Row style={{ justifyContent: "center" }}>
								<TouchableOpacity
									style={{
										paddingHorizontal: 26,
										paddingVertical: 16,
										borderRadius: 30,
										backgroundColor: theme.navigation.getColor(),
									}}
									onPress={() => {
										navigation.navigate("CancelOrderScreen");
									}}
								>
									<Text style={styles.buttonNotFocusNavigate}>Cancel Order</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										paddingHorizontal: 26,
										paddingVertical: 16,
										borderRadius: 30,
										backgroundColor: primary.getColor("500"),
									}}
									onPress={onPressTrackOrder}
								>
									<Text style={styles.buttonFocusNavigate}>Track Order</Text>
								</TouchableOpacity>
							</Row>
						) : (
							<TouchableOpacity
								style={{ padding: 16, borderRadius: 30, backgroundColor: primary.getColor("500") }}
							>
								<Row style={{ justifyContent: "center" }}>
									<SolarBag5Bold height={24} width={24} style={{ marginEnd: 10 }} color={"white"} />
									<Text style={styles.buttonFocusNavigate}>Reorder</Text>
								</Row>
							</TouchableOpacity>
						)}
					</Col>
				</View>
			</ScrollView>
		</View>
	);
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			...textStyle["16_regular"],
			backgroundColor: theme.background.getColor(),
			color: theme.text_1.getColor(),
		},
		styleBackgroundIconRight: {
			backgroundColor: theme.header.backgroundIconBack.getColor(),
			padding: 8,
			borderRadius: 50,
			elevation: 5,
		},
		orderSummary: {
			justifyContent: "space-between",
			color: theme.text_1.getColor(),
		},
		summaryArea: {
			paddingVertical: 10,
			justifyContent: "space-between",
		},
		summaryNumberArea: {
			...textStyle["16_semibold"],
			color: theme.text_1.getColor(),
		},
		summaryTitleArea: {
			...textStyle["16_regular"],
			color: theme.text_1.getColor(),
		},
		inputReview: {
			padding: 15,
			paddingBottom: 30,
			borderBottomWidth: 0,
			...textStyle["16_regular"],
		},
		bottomNavigate: {
			borderRadius: 20,
			padding: 10,
			marginVertical: 24,
			backgroundColor: theme.navigation.getColor(),
			shadowColor: "#0D0A2C",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.5,
			shadowRadius: 10,
			elevation: 10,
		},
		buttonFocusNavigate: {
			...textStyle["18_semibold"],
			color: "white",
		},
		buttonNotFocusNavigate: {
			backgroundColor: theme.navigation.getColor(),
			color: theme.text_1.getColor(),
			...textStyle["18_regular"],
			opacity: 0.4,
		},
		styleDescriptionInfo: {
			color: theme.text_1.getColor(),
		},
	});
