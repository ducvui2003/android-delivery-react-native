/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:29 PM - 07/09/2024
 *  User: lam-nguyen
 **/

import React, { useRef } from "react";
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
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { Header } from "../components/header/Header";
import Col from "../components/custom/Col";
import textStyle from "../configs/styles/textStyle.config";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import Row from "../components/custom/Row";
import NumberValue from "../configs/value/number.value";
import Grid from "../components/custom/Grid";
import GradientView from "../components/gradientView/GradientView";
import { gradient, neutral, white } from "../configs/colors/color-template.config";
import GradientText from "../components/gradientText/GradientText";
import { setTip } from "../hooks/redux/rating.slice";

type GiveThanksScreenProps = {
	route: RouteProp<RootStackParamList, "GiveThanksScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function GiveThanksScreen({ navigation }: GiveThanksScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const tip = useSelector((state: RootState) => state.ratingState.tip);
	const dispatch = useDispatch();
	const [focus, setFocus] = React.useState(false);
	const inputRef = useRef<TextInput>(null);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (Platform.OS === "web") return;
				Keyboard.dismiss();
			}}
		>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
				<Header
					title={"Give Thanks"}
					colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => navigation.pop()}
				/>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
							Tip your delivery driver
						</Text>
						<Col style={{ alignItems: "center", gap: 15, marginTop: 50, marginBottom: 30 }} flex={0}>
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
						<Grid
							col={4}
							data={[5, 10, 15, 20, 25, 30, 35, 40]}
							renderItem={(item, index) => {
								if (tip !== item) {
									return (
										<TouchableOpacity key={index} onPress={() => dispatch(setTip(item))}>
											<View
												style={[
													styles.buttonTip,
													{ borderColor: theme.border_hover.getColor() },
												]}
											>
												<GradientText
													textStyle={[styles.textButtonTip]}
													text={item + "K"}
													gradientColors={gradient.getColor()}
												/>
											</View>
										</TouchableOpacity>
									);
								}

								return (
									<GradientView
										gradientColors={gradient.getColor()}
										style={[styles.buttonTip, styles.buttonTipActive]}
									>
										<Text
											style={[
												{
													color: white.getColor(),
												},
												styles.textButtonTip,
											]}
										>
											{item} K
										</Text>
									</GradientView>
								);
							}}
							gapRow={25}
							gapCol={15}
						/>
						<Row
							flex={0}
							style={[styles.buttonTip, styles.inputTip, { borderColor: theme.border_hover.getColor() }]}
						>
							<TextInput
								ref={inputRef}
								placeholder={"Enter custom amount    "}
								placeholderTextColor={neutral.getColor("100")}
								style={[styles.textButtonTip, { color: theme.text_1.getColor() }]}
								textAlign={"right"}
								onFocus={() => {
									inputRef.current?.setSelection(0, tip?.toString().length ?? 0);
									setFocus(true);
								}}
								onBlur={() => setFocus(false)}
								onChange={event => dispatch(setTip(Number(event.nativeEvent.text)))}
								keyboardType={"numeric"}
							/>
							<GradientText
								text={"K"}
								gradientColors={gradient.getColor()}
								textStyle={[styles.textButtonTip]}
							/>
						</Row>
					</Col>
				</ScrollView>
				<Row flex={0} style={[styles.containerFooter, { display: focus ? "none" : "flex" }]}>
					<ButtonHasStatus
						title={"No. Thanks!"}
						styleText={{ fontWeight: "regular", color: theme.text_3.getColor() }}
						active={true}
						styleButton={[styles.buttonFooter, { backgroundColor: undefined }]}
						onPress={() => {
							dispatch(setTip(0));
							navigation.navigate("MeatRatingScreen", {});
						}}
					/>
					<ButtonHasStatus
						title={"Pay Tip"}
						active={!!tip}
						styleButton={[styles.buttonFooter]}
						onPress={() => {
							navigation.navigate("MeatRatingScreen", {});
						}}
					/>
				</Row>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerContent: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
	},
	frameAvatar: {
		width: 150,
		height: 150,
		borderRadius: 9999,
		overflow: "hidden",
	},
	buttonTip: {
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: 2,
		borderStyle: "solid",
	},
	textButtonTip: {
		...textStyle["22_semibold"],
		textAlign: "center",
	},
	buttonTipActive: {
		padding: 12,
		borderWidth: 0,
	},
	inputTip: {
		marginTop: 25,
		gap: 15,
	},
	containerFooter: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		gap: 10,
		marginTop: 30,
	},
	buttonFooter: {
		flex: 1,
	},
});

export default GiveThanksScreen;
