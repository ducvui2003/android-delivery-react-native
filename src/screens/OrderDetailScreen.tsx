import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../navigations/stack.type";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {ThemeType} from "../types/theme.type";
import {Header} from "../components/header/Header";
import * as React from "react";
import SolarMenuDotsLinear from "../../assets/images/icons/SolarMenuDotLinear";
import StatusLabel from "../components/orders/StatusLabel";
import OrderDetailType from "../types/orderDetail.type";
import {SafeAreaView} from "react-native-safe-area-context";
import Row from "../components/custom/Row";
import {ORDER_STATUS_ACTIVE, ORDER_STATUS_CANCELLED, ORDER_STATUS_COMPLETED} from "../types/order.type";
import textStyle from "../configs/styles/textStyle.config";
import ProductOrderCard from "../components/orderDetail/ProductOrderCard";
import {banh_mi, burger, burrito, donut_1, lemonade, pasta} from "../../assets/images/category/category.icon";
import BoxInfoNecessary from "../components/orderDetail/BoxInfoNecessary";
import {FluentLocation16Filled} from "../../assets/images/icons/FluentLocation16Filled";
import SolarTicketSaleBold from "../../assets/images/icons/SolarTicketSaleBold";
import {neutral, primary, secondary, white} from "../configs/colors/color-template.config";
import Col from "../components/custom/Col";
import SolarWalletBold from "../../assets/images/icons/SolarWalletBold";
import formater from "../utils/formater";
import IconRating from "../components/rating/IconRating";
import InputReviewArea from "../components/orderDetail/InputReviewArea";
import SolarPenBold from "../../assets/images/icons/SolarPenBold";
import GradientView from "../components/gradientView/GradientView";
import SolarBag5Bold from "../../assets/images/icons/SolarBag5Bold";
import numberValue from "../configs/value/number.value";

type OrderDetailScreenProps = {
	route: RouteProp<RootStackParamList, "OrderDetailScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
	onPressCamera?: () => void;
	onPressInsertPicture?: () => void;
	onPressCancelOrder?: () => void;
	onPressReorder?: () => void;
	onPressTrackOrder?: () => void;
};
export default function OrderDetailScreen({
											  route: {
												  params: {id},
											  },
											  navigation,
											  onPressCamera,
											  onPressInsertPicture,
											  onPressCancelOrder,
											  onPressReorder,
											  onPressTrackOrder,
										  }: OrderDetailScreenProps) {

	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	const [orderDetail, setOrderDetail] = React.useState<OrderDetailType | null>(null)

	React.useEffect(() => {
		const order = orders.find((order) => order.id === id)
		if (order) setOrderDetail(order)

	}, [])
	return (
		<View style={styles.container}>
			<Header
				title={id}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				iconRight={<View style={styles.styleBackgroundIconRight}><SolarMenuDotsLinear/></View>}
			/>
			<ScrollView>
				<View style={{paddingHorizontal: 25}}>
					<Row style={styles.orderSummary}>
						<Text>Order Summary</Text>
						<StatusLabel status={orderDetail?.status ? orderDetail?.status : ORDER_STATUS_ACTIVE}/>
					</Row>

					{orderDetail?.products.map((product) => {
						return (
							<ProductOrderCard status={orderDetail?.status} {...product} key={product.id}/>
						)
					})}


					<BoxInfoNecessary iconTopRight={<FluentLocation16Filled/>} titleInfo={"Deliver to"}
									  descriptionInfo={orderDetail?.address ? orderDetail?.address : {
										  name: "",
										  address: ""
									  }}/>

					<BoxInfoNecessary iconTopRight={<SolarWalletBold/>} titleInfo={"Payment Method"}
									  descriptionInfo={orderDetail?.paymentMethod ? orderDetail?.paymentMethod : {type: ""}}/>

					<BoxInfoNecessary iconTopRight={<SolarTicketSaleBold/>} styleDescriptionInfo={styles.promotionStyle}
									  titleInfo={"Promotions"}
									  descriptionInfo={orderDetail?.promotions ? orderDetail?.promotions : [{name: ""}]}/>

					<Col>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Subtotal</Text>
							<Text
								style={styles.summaryNumberArea}>{formater.formatCurrency(orderDetail?.subTotal ? orderDetail.subTotal : 0)}</Text>
						</Row>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Delivery Fee</Text>
							<Text style={styles.summaryNumberArea}>{orderDetail?.deliveryFee}</Text>
						</Row>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Discount</Text>
							<Text
								style={styles.summaryNumberArea}>{formater.formatCurrency(orderDetail?.discount ? orderDetail?.discount : 0)}</Text>
						</Row>
						<View style={{borderWidth: 1, borderColor: theme.text_1.getColor()}}/>
						<Row style={styles.summaryArea}>
							<Text style={styles.summaryTitleArea}>Total</Text>
							<Text
								style={styles.summaryNumberArea}>{formater.formatCurrency(orderDetail?.price ? orderDetail?.price : 0)}</Text>
						</Row>
					</Col>

					{orderDetail?.status === ORDER_STATUS_COMPLETED &&
						<Col style={{paddingBottom: 24}}><IconRating iconSize={60} total={5}
																	 rating={orderDetail.starReview}/></Col>
					}
					{orderDetail?.status === ORDER_STATUS_COMPLETED &&
						<InputReviewArea
							placeholder={"Type your review ..."}
							value={orderDetail.description}
							styleInput={styles.inputReview}
							onPressIconLeft={onPressCamera}
							onPressIconRight={onPressInsertPicture}

						/>
					}

					{orderDetail?.status === ORDER_STATUS_CANCELLED &&
						<Row style={{justifyContent: "space-between", paddingVertical: 20}}>
							<Text>{orderDetail.description}</Text>
							<TouchableOpacity style={{borderRadius: 50}}>
								<GradientView  gradientColors={[primary.getColor("500"), primary.getColor("300")]}
											   style={{padding: 10, borderRadius: 50}}>
									<SolarPenBold width={26} height={26} color={"white"}/>
								</GradientView>
							</TouchableOpacity>

						</Row>
					}

					<Col style={styles.bottomNavigate}>
						{orderDetail?.status === ORDER_STATUS_ACTIVE ?
							<Row style={{justifyContent: "center"}}>
								<TouchableOpacity style={{
									paddingHorizontal: 26,
									paddingVertical: 16,
									borderRadius: 30,
									backgroundColor: theme.background.getColor()
								}} onPress={onPressCancelOrder}>
									<Text style={styles.buttonNotFocusNavigate}>Cancel Order</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{
									paddingHorizontal: 26,
									paddingVertical: 16,
									borderRadius: 30,
									backgroundColor: primary.getColor("500"),
								}} onPress={onPressTrackOrder}>
									<Text style={styles.buttonFocusNavigate}>Track Order</Text>
								</TouchableOpacity>
							</Row>
							:
							<TouchableOpacity
								style={{padding: 16, borderRadius: 30, backgroundColor: primary.getColor("500")}}
								onPress={onPressReorder}>
								<Row style={{justifyContent: "center"}}>
									<SolarBag5Bold height={24} width={24} style={{marginEnd: 10}} color={"white"}/>
									<Text style={styles.buttonFocusNavigate}>Reorder</Text>
								</Row>

							</TouchableOpacity>
						}
					</Col>

				</View>
			</ScrollView>
		</View>
	)
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			...textStyle["16_regular"],
			backgroundColor: theme.background.getColor(),
		},
		styleBackgroundIconRight: {
			backgroundColor: theme.background_1.getColor(),
			padding: 8,
			borderRadius: 50,
			shadowColor: "#0D0A2C",
			shadowOffset: {width: -50, height: 5},
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 3,
		},
		orderSummary: {
			justifyContent: "space-between"
		},
		promotionStyle: {
			paddingHorizontal: 4,
			paddingVertical: 2.5,
			borderRadius: 5,
			backgroundColor: secondary.getColor("500"),
			color: "white",
			textTransform: "uppercase",
			marginEnd: 10
		},
		summaryArea: {
			paddingVertical: 10,
			justifyContent: "space-between",
		},
		summaryNumberArea: {
			...textStyle["16_semibold"],
		},
		summaryTitleArea: {
			...textStyle["16_regular"],
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
			backgroundColor: theme.background.getColor(),
			shadowColor: "#0D0A2C",
			shadowOffset: {width: 0, height: 2},
			shadowOpacity: 0.5,
			shadowRadius: 10,
			elevation: 10,
		},
		buttonFocusNavigate: {
			...textStyle["18_semibold"],
			color: "white",
		},
		buttonNotFocusNavigate: {
			backgroundColor: theme.background.getColor(),
			...textStyle["18_regular"],
			color: neutral.getColor("900"),
			opacity: 0.4
		},

	})

// Khởi tạo dữ liệu cho các phần tử
const orders: OrderDetailType[] = [
	{
		id: 'SP1',
		price: 1000,
		starReview: 5,
		status: ORDER_STATUS_COMPLETED,
		products: [
			{
				id: 'prod1',
				image: burrito,
				name: 'Apple',
				rating: 5,
				price: 60000,
				discountInfo: {
					discount: 0.5,
					expired: new Date("2027-12-31"),
				},
				description: 'Fresh red apples',
				options: [
					{id: 'opt1', name: 'No Sugar', price: 0.3},
					{
						id: 'grp1',
						name: 'Chan Chau',
						options: [
							{id: 'opt2', name: 'den', price: 0.5},
							{id: 'opt3', name: 'trang', price: 0},
						],
					},
				],
			},
			{
				id: 'prod12',
				image: banh_mi,
				name: 'Banh mi',
				rating: 4,
				price: 50000,
				discountInfo: {
					discount: 0.5,
					expired: new Date("2027-12-31"),
				},
				description: '',
			},
		],
		address: {
			name: 'Home',
			address: '123 Main St',
		},
		paymentMethod: {type: 'Credit Card'},
		promotions: [{name: 'PROMO10'}, {name: 'PREE'}],
		subTotal: 4.5,
		deliveryFee: 2.0,
		discount: 0.5,
		description: '',
	},
	{
		id: 'SP2',
		price: 2000,
		starReview: 4,
		status: ORDER_STATUS_CANCELLED,
		products: [
			{
				id: 'prod2',
				image: burger,
				name: 'Banana',
				rating: 4,
				discountInfo: {
					discount: 0.5,
					expired: new Date("2027-12-31"),
				},
				price: 0.75,
				description: 'Fresh yellow bananas',
				options: [{id: 'opt4', name: 'Organic', price: 1}],
			},
			{
				id: 'prod2',
				image: donut_1,
				name: 'Banana',
				rating: 4,
				discountInfo: {
					discount: 0.5,
					expired: new Date("2027-12-31"),
				},
				price: 0.75,
				description: 'Fresh yellow bananas',
				options: [{id: 'opt4', name: 'Organic', price: 1}],
			},
		],
		address: {
			name: 'Home',
			address: '123 Main St',
		},
		paymentMethod: {type: 'Credit Card'},
		promotions: [{name: 'PROMO10'}, {name: 'PREE DELIVERY'}],
		subTotal: 5.5,
		deliveryFee: 1.5,
		discount: 1.0,
		description: 'This is a very good product',
	},
	{
		id: 'SP3',
		price: 3000,
		starReview: 3,
		status: ORDER_STATUS_ACTIVE,
		products: [
			{
				id: 'prod3',
				name: 'Orange Juice',
				image: lemonade,
				rating: 0,
				price: 3.0,
				description: 'Freshly squeezed orange juice',
			},
			{
				id: 'prod31',
				image: pasta,
				rating: 0,
				name: 'Orange Juice',
				price: 3.0,
				description: 'Freshly squeezed orange juice',
			},
		],
		address: {
			name: 'Home',
			address: '123 Main St',
		},
		paymentMethod: {type: 'Credit Card'},
		promotions: [{name: 'PROMO10'}, {name: 'PREE DELIVERY'}],
		subTotal: 6.0,
		deliveryFee: 1.0,
		discount: 0.5,
		description: 'This is a very good product',
	},
];