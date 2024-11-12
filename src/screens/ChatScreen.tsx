/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:35AM - 04/10/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { Image, Keyboard, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { Header } from "../components/header/Header";
import logo from "../../assets/images/lamnguyen.jpeg";
import { RouteProp } from "@react-navigation/native";
import Col from "../components/custom/Col";
import Row from "../components/custom/Row";
import SolarPhoneLinear from "../../assets/images/icons/SolarPhoneLinear";
import SolarVideocameraLinear from "../../assets/images/icons/SolarVideocameraLinear";
import spacing from "../configs/styles/space.config";
import textStyle from "../configs/styles/textStyle.config";
import MessageContent from "../components/contact/MessageContent";
import ChatScreenFragment from "../fragments/ChatScreenFragment";

type ChatScreenProps = {
	navigation: NativeStackNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, "ChatScreen">;
};

const imageTest =
	"https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function ChatScreen({ navigation }: ChatScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [moreOption, setMoreOption] = React.useState<boolean>(false);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title={"Message"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => navigation.pop()}
			/>
			<Col flex={1}>
				<Row style={[styles.headerContainer]} flex={0}>
					<Row flex={1} style={[{ gap: spacing["spaced-3"], alignItems: "center" }]}>
						<Image source={logo} style={styles.avatar} />
						<Col style={[{ justifyContent: "space-between" }]}>
							<Text style={[{ ...textStyle["16_semibold"], color: theme.text_1.getColor() }]}>
								David Wayne
							</Text>
							<Text
								style={[
									{
										...textStyle["12_regular"],
										color: theme.text_1.getColor(),
									},
								]}
							>
								Driver
							</Text>
						</Col>
					</Row>
					<Row style={[{ alignItems: "center", gap: spacing["spaced-2"] }]} flex={0}>
						<TouchableOpacity style={[styles.buttonContact]}>
							<SolarVideocameraLinear width={25} height={25} />
						</TouchableOpacity>
						<TouchableOpacity style={[styles.buttonContact]}>
							<SolarPhoneLinear width={25} height={25} />
						</TouchableOpacity>
					</Row>
				</Row>
				<ScrollView
					style={[{ backgroundColor: theme.chat.background.getColor() }, styles.chatContainer]}
					contentContainerStyle={[styles.chatContentContainer]}
					showsVerticalScrollIndicator={false}
					onTouchStart={() => {
						if (Platform.OS === "web") return;
						setMoreOption(false);
						Keyboard.dismiss();
					}}
				>
					<MessageContent
						role={"SENDER"}
						time={"10:12"}
						contents={[
							"Hello, I'm David Wayne. I'm on the way to your location. I will be there in 10 minutes.",
							"Hello, I'm David Wayne. I'm on the way to your location. I will be there in 10 minutes.",
							"Hello, I'm David Wayne. I'm on the way to your location. I will be there in 10 minutes.",
						]}
					/>
					<MessageContent
						role={"RECEIVER"}
						time={"10:12"}
						contents={
							"Hello, I'm David Wayne. I'm on the way to your location. I will be there in 10 minutes."
						}
						images={[imageTest, imageTest, imageTest, imageTest]}
					/>
				</ScrollView>
				<ChatScreenFragment setShowMoreOption={setMoreOption} showMoreOption={moreOption} />
			</Col>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: spacing["spaced-5"],
		paddingBottom: spacing["spaced-5"],
	},
	avatar: {
		width: 45,
		height: 45,
		overflow: "hidden",
		borderRadius: 999999,
		backgroundColor: "red",
	},
	buttonContact: {
		padding: 10,
	},
	chatContainer: {
		marginHorizontal: spacing["spaced-2"],
		flexDirection: "column",
	},
	chatContentContainer: {
		flexDirection: "column",
		flexGrow: 1,
		gap: spacing["spaced-3"],
		justifyContent: "flex-end",
		paddingVertical: spacing["spaced-3"],
		paddingHorizontal: spacing["spaced-4"],
	},
});

export default ChatScreen;
