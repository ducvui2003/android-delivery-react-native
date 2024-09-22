/**
 * Author: Lam Hong Phong
 * Email: giotrang1401@gmail.com
 * Phone number: +84 376236485
 * Create at: 10:25 - 22/09/2024
 *  User: lamhongphong
 */
import {Header} from "../components/header/Header";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {ThemeType} from "../types/theme.type";
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {OptionItem} from "../components/optionItem/OptionItem";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import numberValue from "../configs/value/number.value";
import {neutral} from "../configs/colors/color-template.config";
import Row from "../components/custom/Row";
import React, {useState} from "react";
import heart from "../../assets/images/heart.png";
import Modal from "../components/modal/Modal";
import textStyle from "../configs/styles/textStyle.config";
import {modalStyle} from "./PaymentMethodScreen";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../navigations/stack.type";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type CancelOrderScreenProps = {
	route: RouteProp<RootStackParamList, "CancelOrderScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
}
const reasons = ["Change of mind", "Found better price elsewhere", "Delivery delay", "Incorrect item selected", "Duplicate order", "Unable to fulfill order", "Other reasons"];

function CancelOrderScreen({ navigation }: CancelOrderScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	const [checked, setChecked] = React.useState<boolean[]>(Array(reasons.length).fill(false));
	const hasChecked: boolean = checked.filter(item => item).length > 0;
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<View style={styles.container}>
			<Header title={"Cancel Order"} colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
						elevation: 5
					}}
			onPressBack={() => navigation.pop()}/>
			<ScrollView style={{flex: 1}}>
				{reasons.map((reason, index) =>
					<Row style={styles.reason}>
						<OptionItem key={index}  selected={checked[index]} onPress={() => {
							setChecked([...checked.map((item, i) => i === index ? !item : false)]);
						}} name={reason} icon={"circle"}/>
					</Row>
				)}
				{checked[reasons.length - 1] &&
					<TextInput placeholder={"Other reason..."} textAlignVertical={"top"} multiline
							   style={{
								   padding: 16,
								   borderRadius: 10,
								   height: 90,
								   backgroundColor: theme.background_input.getColor(),
								   marginBottom: 10
							   }}/>
				}
					</ScrollView>
					<ButtonHasStatus title={"Submit"} active={hasChecked} onPress={() => setShowModal(true)}/>

			<Modal
				active={showModal}
				onEndHide={() => {
					setShowPopUp(false);
					setShowModal(false);
				}}
			>
				<Text style={[modalStyle.title]}>Your Order Canceled</Text>
				<Image source={heart} style={modalStyle.image} resizeMode={"cover"} />
				<Text style={{color: neutral.getColor("900"), ...textStyle["16_semibold"]}}>We're sorry to see your order go. 😔</Text>
				<Text style={[modalStyle.text]}>We're always striving to improve, and we hope to serve you better next time!</Text>
				<ButtonHasStatus
					styleButton={[modalStyle.button]}
					title={"Ok"}
					active={true}
					onPress={() => {
						setShowPopUp(false);
						setShowModal(false);
					}}
				/>
			</Modal>
		</View>
	)
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
			justifyContent: "space-between",
			paddingHorizontal: numberValue.paddingHorizontalScreen
		},
		reason: {
			marginBottom: 12,
			paddingHorizontal: 12,
			backgroundColor: theme.background.getColor(),
			borderWidth: 1,
			borderColor: neutral.getColor("50"),
			borderRadius: 10,
			height: 56,
		}
	})

export default CancelOrderScreen;