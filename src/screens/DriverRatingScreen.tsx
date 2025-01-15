/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:08 PM - 07/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect } from "react";
import {
	Image,
	Keyboard,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import { neutral, secondary } from "../configs/colors/color-template.config";
import Space from "../components/custom/Space";
import InputReview from "../components/review/InputReview";
import ImagePicker from "../utils/imagePicker";
import DriverInfoType from "../types/driverInfo.type";
import { setDriverInfo, setDriverRating, skipDriverRating } from "../hooks/redux/rating.slice";

type OrderRatingScreenProps = {
	route: RouteProp<RootStackParamList, "DriverRatingScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function DriverRatingScreen({
	route: {
		params: { uri },
	},
	navigation,
}: OrderRatingScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const { driverRating, driverInfo } = useSelector((state: RootState) => state.ratingState);
	const dispatch = useDispatch();
	const [focus, setFocus] = React.useState(false);

	useEffect(() => {
		if (!driverInfo?.name) {
			Promise.resolve(dataDemo).then(res => {
				dispatch(setDriverInfo(res));
			});
		}

		updateImage(uri);

		const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setFocus(false);
		});

		return () => {
			keyboardHideListener.remove();
		};
	}, []);

	const updateImage = (uri: string | undefined) => {
		if (uri && driverRating) {
			dispatch(
				setDriverRating({
					...driverRating,
					images: [...driverRating.images, uri],
				})
			);
		}
	};

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
					showsVerticalScrollIndicator={false}
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
										uri: driverInfo?.image,
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
								{driverInfo?.name}
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
						{driverRating && (
							<Col style={{ paddingHorizontal: 10, marginBottom: 25 }}>
								<IconRating
									total={5}
									rating={driverRating.rating}
									iconSize={60}
									isChangeable={true}
									onChangeRating={rating => {
										dispatch(
											setDriverRating({
												...driverRating,
												rating,
											})
										);
									}}
									colorSelected={secondary.getColor("500")}
									colorUnselected={neutral.getColor("50")}
								/>
							</Col>
						)}
						{!!driverRating?.rating ? (
							<InputReview
								onFocus={() => setFocus(true)}
								onBlur={() => setFocus(false)}
								onPressCamera={() => {
									navigation.replace("CameraScreen", {
										prevScreen: "DriverRatingScreen",
									});
								}}
								text={driverRating?.review}
								onTextChange={text =>
									dispatch(
										setDriverRating({
											...driverRating,
											review: text,
										})
									)
								}
								onPressGallery={() => {
									ImagePicker.pickImage().then(asset => updateImage(asset?.uri));
								}}
							/>
						) : (
							<Space height={45} />
						)}
					</Col>
				</ScrollView>
				<Row flex={0} style={[styles.containerFooter, { display: focus ? "none" : "flex" }]}>
					<ButtonHasStatus
						title={"Skip"}
						styleText={{ fontWeight: "regular", color: theme.text_3.getColor() }}
						active={true}
						styleButton={[styles.buttonFooter, { backgroundColor: undefined }]}
						onPress={() => {
							dispatch(skipDriverRating());
							navigation.navigate("GiveThanksScreen");
						}}
					/>
					<ButtonHasStatus
						title={"Submit"}
						active={!!driverRating?.rating}
						styleButton={[styles.buttonFooter]}
						onPress={() => {
							navigation.navigate("GiveThanksScreen");
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
		flex: 1,
	},
});

export default DriverRatingScreen;

const dataDemo: DriverInfoType = {
	id: "0",
	name: "David Wayne",
	image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
