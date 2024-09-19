import {ScrollView, StyleSheet, Text, View} from "react-native";
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
import {SolarCardBold} from "../../assets/images/icons/SolarCardBold";
import SolarTicketSaleBold from "../../assets/images/icons/SolarTicketSaleBold";
import {secondary} from "../configs/colors/color-template.config";
import Col from "../components/custom/Col";

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
	const [orderDetail, setOrderDetail] = React.useState<OrderDetailType | null>(null)

	React.useEffect(() => {
		const order = orders.find((order) => order.id === id)
		if (order) {
			setOrderDetail(order)
		}
	}, [])
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
			<ScrollView style={{paddingHorizontal: 25}}>
				<View>
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
									  descriptionInfo={orderDetail?.address ? orderDetail?.address : ""}/>

					<BoxInfoNecessary iconTopRight={<SolarCardBold/>} titleInfo={"Payment Method"}
									  descriptionInfo={orderDetail?.paymentMethod ? orderDetail?.paymentMethod : ""}/>

					<BoxInfoNecessary iconTopRight={<SolarTicketSaleBold/>} styleDescriptionInfo={styles.promotionStyle} titleInfo={"Promotions"} descriptionInfo={orderDetail?.promotions ? orderDetail?.promotions : ""}/>

				<Col >
					<Row style={styles.summaryArea}>
						<Text style={styles.summaryTitleArea}>Subtotal</Text>
						<Text style={styles.summaryNumberArea}>{orderDetail?.subTotal}</Text>
					</Row>
					<Row style={styles.summaryArea}>
						<Text style={styles.summaryTitleArea}>Delivery Fee</Text>
						<Text style={styles.summaryNumberArea}>{orderDetail?.deliveryFee}</Text>
					</Row>
					<Row style={styles.summaryArea}>
						<Text style={styles.summaryTitleArea}>Discount</Text>
						<Text style={styles.summaryNumberArea}>{orderDetail?.discount}</Text>
					</Row>
					<View style={{borderWidth: 1, borderColor: theme.border.getColor()}}/>
					<Row style={styles.summaryArea}>
						<Text style={styles.summaryTitleArea}>Total</Text>
						<Text style={styles.summaryNumberArea}>{orderDetail?.price}</Text>
					</Row>
				</Col>
				</View>
			</ScrollView>


		</SafeAreaView>
	)
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			...textStyle["16_regular"],
		},
		styleBackgroundIconRight: {
			backgroundColor: theme.background.getColor(),
			padding: 8,
			borderRadius: 50,
			shadowColor: "#0D0A2C",
			shadowOffset: {width: -50, height: 5},
			shadowOpacity: 0.2,
			shadowRadius: 10,
		},
		orderSummary: {
			justifyContent: "space-between"
		},
		promotionStyle: {
			padding: 5,
			borderRadius: 5,
			backgroundColor: secondary.getColor("500"),
			color: "white",
			textTransform: "uppercase",

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
		address: '123 Main St',
		paymentMethod: 'Credit Card',
		promotions: ['PROMO10'],
		subTotal: 4.5,
		deliveryFee: 2.0,
		discount: 0.5,
	},
	{
		id: 'SP2',
		price: 2000,
		starReview: 4,
		status: ORDER_STATUS_COMPLETED,
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
		address: '456 Another St',
		paymentMethod: 'PayPal',
		promotions: ['PROMO20'],
		subTotal: 5.5,
		deliveryFee: 1.5,
		discount: 1.0,
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
		address: '789 Third St',
		paymentMethod: 'Cash',
		promotions: ['PROMO5'],
		subTotal: 6.0,
		deliveryFee: 1.0,
		discount: 0.5,
	},
];