/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:20 PM - 13/09/2024
 *  User: lam-nguyen
 **/

import React, { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PopUp from "../components/popUp/PopUp";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import Modal from "../components/modal/Modal";
import CardVisaType from "../types/cardVisa.type";
import AddPaymentMethodFragment from "../fragments/paymentMethod/AddPaymentMethodFragment";
import textStyle from "../configs/styles/textStyle.config";
import PaymentMethodType from "../types/paymentMethod.type";
import LogosMoney from "../../assets/images/icons/LogosMoney";
import LogosPaypal from "../../assets/images/icons/LogosPaypal";
import LogosGooglePay from "../../assets/images/icons/LogosGoogePay";
import LogosApple from "../../assets/images/icons/LogosApple";
import { Header } from "../components/header/Header";
import ButtonPaymentMethod from "../components/payment/ButtonPaymentMethod";
import SolarAddLinear from "../../assets/images/icons/SolarAddLinear";
import { neutral } from "../configs/colors/color-template.config";
import spacing from "../configs/styles/space.config";
import LogosVisa from "../../assets/images/icons/LogosVisa";
import confetti from "../../assets/images/confetti.png";

type PaymentMethodScreenProps = {
	route: RouteProp<RootStackParamList, "PaymentMethodScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const sizeIcon = 25;

const payments: PaymentMethodType[] = [
	{
		icon: <LogosMoney width={sizeIcon} height={sizeIcon} />,
		type: "Cash",
	},
	{
		icon: <LogosPaypal width={sizeIcon} height={sizeIcon} />,
		type: "PayPal",
	},
	{
		icon: <LogosGooglePay width={sizeIcon} height={sizeIcon} />,
		type: "Google Pay",
	},
	{
		icon: <LogosApple width={sizeIcon} height={sizeIcon} />,
		type: "Apple Pay",
	},
];

function PaymentMethodScreen({ navigation }: PaymentMethodScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [cards, setCards] = useState<CardVisaType[]>([]);
	const [card, setCard] = useState<CardVisaType>();

	useEffect(() => {
		// Call API get card
		Promise.all(dataDemo).then(value => {
			setCards(value);
		});
	}, []);

	const formatCardNumber = useCallback((cardNumber: string) => {
		let result = "*".repeat(12) + cardNumber.substring(12);
		for (let index = 1; index <= 3; index++)
			result = result.substring(0, 4 * index + index - 1) + " " + result.substring(4 * index + index - 1);
		return result;
	}, []);

	const submitAddNewCard = useCallback((card: CardVisaType) => {
		// Call API add new card
		Promise.all([card]).then(([value]) => {
			setCards(prev => [...prev, value]);
			setShowModal(true);
		});
	}, []);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title={"Payment Methods"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => navigation.pop()}
			/>
			<ScrollView
				style={[{ paddingHorizontal: spacing["spaced-5"] }]}
				contentContainerStyle={[{ gap: spacing["spaced-3"] }]}
			>
				{payments.map((value, index) => (
					<ButtonPaymentMethod key={`payment_type_${index}`} title={value.type} icon={value.icon} />
				))}

				{cards.map((value, index) => (
					<ButtonPaymentMethod
						key={`card_${index}`}
						title={formatCardNumber(value.cardNumber)}
						titleStyle={[{ color: theme.text_1.getColor() }]}
						icon={<LogosVisa color={theme.text_1.getColor()} />}
					/>
				))}
				<ButtonPaymentMethod
					containerStyle={[
						{ backgroundColor: theme.paymentMethod.backgroundButtonAdd.getColor(), borderWidth: 0 },
					]}
					title={"Add New Card"}
					showCheckBox={false}
					titleStyle={{
						color: theme.paymentMethod.colorButtonAdd.getColor(),
					}}
					icon={<SolarAddLinear color={theme.paymentMethod.colorButtonAdd.getColor()} />}
					onPress={() => setShowPopUp(true)}
				/>
			</ScrollView>
			<ButtonHasStatus
				styleButton={{
					marginHorizontal: spacing["spaced-5"],
				}}
				title={"Apply"}
				active={false}
			/>
			<PopUp
				showed={showPopUp}
				onEndHide={() => setShowPopUp(false)}
				header={
					<Text style={[styles.titleAddPaymentMethod, { color: theme.text_1.getColor() }]}>Add New Card</Text>
				}
				body={<AddPaymentMethodFragment onDoneInput={setCard} clearData={!showPopUp} />}
				footer={
					<ButtonHasStatus
						title={"Save"}
						onPress={() => {
							if (card) submitAddNewCard(card);
						}}
						active={!!card}
						styleButton={{ marginTop: spacing["spaced-5"] }}
					/>
				}
			/>
			<Modal
				active={showModal}
				onEndHide={() => {
					setShowPopUp(false);
					setShowModal(false);
				}}
			>
				<Text style={[modalStyle.title]}>Payment Successful</Text>
				<Image source={confetti} style={modalStyle.image} resizeMode={"cover"} />
				<Text style={[modalStyle.subTitle]}>Thank you for your order!</Text>
				<Text style={[modalStyle.text]}>Your payment has been successfully processed.</Text>
				<ButtonHasStatus
					styleButton={[modalStyle.button]}
					title={"Ok. Great!"}
					active={true}
					onPress={() => {
						setShowPopUp(false);
						setShowModal(false);
					}}
				/>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleAddPaymentMethod: {
		...textStyle["22_semibold"],
		textAlign: "center",
		marginBottom: spacing["spaced-3"],
	},
});

export const modalStyle = StyleSheet.create({
	title: {
		...textStyle["22_semibold"],
		color: neutral.getColor("900"),
		textAlign: "center",
	},
	subTitle: {
		...textStyle["16_regular"],
		color: neutral.getColor("900"),
		textAlign: "center",
	},
	text: {
		...textStyle["16_regular"],
		color: neutral.getColor("400"),
		textAlign: "center",
	},
	image: {
		width: 200,
		height: 200,
	},
	button: {
		width: "100%",
		marginBottom: 0,
	},
	buttonDismiss: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});

export default PaymentMethodScreen;

const dataDemo: CardVisaType[] = [
	{
		cardNumber: "1234567890123456",
		name: "Nguyễn Đình Lam",
		expired: "25/29",
		cvv: "123",
	},
];
