/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:08 PM - 07/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import {
	Image,
	Keyboard,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { Header } from "../components/header/Header";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Col from "../components/custom/Col";
import NumberValue from "../configs/value/number.value";
import IconRating from "../components/rating/IconRating";
import Row from "../components/custom/Row";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import textStyle from "../configs/styles/textStyle.config";
import SolarCameraBold from "../../assets/images/icons/SolarCameraBold";
import SolarGalleryBold from "../../assets/images/icons/SolarGalleryBold";
import { neutral, secondary } from "../configs/colors/color-template.config";
import Space from "../components/custom/Space";

type OrderRatingScreenProps = {
	route: RouteProp<RootStackParamList, "DriverRatingScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function OrderRatingScreen({ navigation }: OrderRatingScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [rating, setRating] = React.useState(0);
	const [focus, setFocus] = React.useState(false);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (Platform.OS === "web") return;
				Keyboard.dismiss();
			}}
		>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
				<Header
					title={"Driver Rating"}
					colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => navigation.pop()}
				/>
				<ScrollView
					style={{ paddingHorizontal: NumberValue.paddingHorizontalScreen }}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<Col flex={1} style={styles.containerContent}>
						<Text
							style={[
								{
									...textStyle["22_regular"],
									color: theme.text_1.getColor(),
									textAlign: "center",
								},
							]}
						>
							Rate your driver's delivery service.
						</Text>
						<Col style={{ alignItems: "center", gap: 15 }} flex={0}>
							<View style={styles.frameAvatar}>
								<Image
									source={{
										uri: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
									}}
									style={{ width: "100%", height: "100%" }}
									resizeMode={"cover"}
								/>
							</View>
							<Text
								style={{
									textAlign: "center",
									...textStyle["22_semibold"],
									color: theme.text_1.getColor(),
								}}
							>
								David Wayne
							</Text>
							<Text
								style={{
									textAlign: "center",
									...textStyle["18_regular"],
									color: theme.text_1.getColor(),
								}}
							>
								Driver
							</Text>
						</Col>
					</Col>
					<Col style={{ marginTop: 30 }}>
						<Col style={{ paddingHorizontal: 10 }}>
							<IconRating
								total={5}
								rating={rating}
								iconSize={60}
								isChangeable={true}
								onChangeRating={setRating}
								colorSelected={secondary.getColor("500")}
								colorUnselected={neutral.getColor("50")}
							/>
						</Col>
						{!!rating ? (
							<Col
								style={[
									styles.containerInputReview,
									{ backgroundColor: theme.rating.backgroundInputReview.getColor() },
								]}
							>
								<TextInput
									multiline
									scrollEnabled
									numberOfLines={4}
									style={[
										{
											...textStyle["16_regular"],
											color: theme.text_1.getColor(),
										},
									]}
									onFocus={() => setFocus(true)}
									onBlur={() => setFocus(false)}
									placeholder={"Type your review ... "}
									placeholderTextColor={theme.placeholder.getColor()}
									textAlignVertical={"top"}
								/>
								<Row style={{ justifyContent: "flex-end", gap: 10 }} flex={0}>
									<TouchableOpacity>
										<SolarCameraBold width={27} height={27} color={neutral.getColor("100")} />
									</TouchableOpacity>
									<TouchableOpacity>
										<SolarGalleryBold width={25} height={25} color={neutral.getColor("100")} />
									</TouchableOpacity>
								</Row>
							</Col>
						) : (
							<Space height={70} />
						)}
					</Col>
				</ScrollView>
				<Row flex={0} style={[styles.containerFooter, { display: focus ? "none" : "flex" }]}>
					<ButtonHasStatus
						title={"Skip"}
						styleText={{ fontWeight: "regular", color: theme.text_3.getColor() }}
						active={true}
						styleButton={[styles.buttonFooter, { backgroundColor: undefined }]}
					/>
					<ButtonHasStatus title={"Submit"} active={!!rating} styleButton={[styles.buttonFooter]} />
				</Row>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 25,
	},
	containerContent: {
		gap: 50,
	},
	frameAvatar: {
		width: 150,
		height: 150,
		borderRadius: 9999,
		overflow: "hidden",
	},
	containerInputReview: {
		borderRadius: 10,
		padding: 20,
		gap: 10,
		marginTop: 25,
	},
	containerFooter: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		gap: 10,
		marginTop: 30,
	},
	buttonFooter: {
		marginBottom: 0,
		flex: 1,
	},
});

export default OrderRatingScreen;
