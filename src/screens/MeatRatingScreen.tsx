/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:08 PM - 07/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import {
	Image,
	Keyboard,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { Header } from "../components/header/Header";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NumberValue from "../configs/value/number.value";
import Row from "../components/custom/Row";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import textStyle from "../configs/styles/textStyle.config";
import InputReviewFragment from "../fragments/InputReviewFragment";
import MeatInfoType from "../types/meatInfo.type";
import ImagePicker from "../utils/imagePicker";
import { setMeatRating, setMeats, skipMeatRating } from "../hooks/redux/rating.slice";
import RatingFormType from "../types/ratingFormType";
import Modal from "../components/modal/Modal";
import spacing from "../configs/styles/space.config";
import borderConfig from "../configs/styles/border.config";
import heart from "../../assets/images/icons/heart.png";
import { neutral, white } from "../configs/colors/color-template.config";
import SolarDismiss from "../../assets/images/icons/SolarDismiss";

type MeatRatingScreenProps = {
	route: RouteProp<RootStackParamList, "MeatRatingScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function MeatRatingScreen({
	route: {
		params: { data, uri },
	},
	navigation,
}: MeatRatingScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const { meats, meatRating, oderRating } = useSelector((state: RootState) => state.ratingState);
	const [submit, setSubmit] = React.useState(false);
	const [focus, setFocus] = React.useState(false);
	const dispatch = useDispatch();
	const [activeModal, setActiveModel] = useState(false);

	useEffect(() => {
		if (!meats) {
			// Cal api get
			Promise.resolve(dataDemo).then(res => {
				dispatch(setMeats(res));
			});
		}

		if (uri) {
			const index: number = data?.index;
			addImage(index, uri);
		}

		const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setFocus(false);
		});

		return () => {
			keyboardHideListener.remove();
		};
	}, []);

	useEffect(() => {
		setSubmit(!!meatRating?.filter(item => item.rating).length);
	}, [meatRating]);

	const dispatchRating = (ratingForm: RatingFormType) => {
		dispatch(setMeatRating(meatRating?.map(item => (item.id === ratingForm.id ? ratingForm : item)) ?? []));
	};

	const addImage = (index: number, uri: string) => {
		const indexForm = meatRating?.[index];
		if (!indexForm) return;
		const newRating = { ...indexForm, images: [...indexForm.images] };
		newRating.images.push(uri);
		dispatchRating(newRating);
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (Platform.OS === "web") return;
				Keyboard.dismiss();
			}}
		>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
				<Modal active={activeModal} containerStyle={modalStyle.container} contentStyle={[modalStyle.content]}>
					<TouchableOpacity style={[modalStyle.buttonDismiss]} onPress={() => setActiveModel(false)}>
						<SolarDismiss color={neutral.getColor("100")} width={25} height={25} />
					</TouchableOpacity>
					<Text style={[modalStyle.title]}>Thanks for rating your meal</Text>
					<Image source={heart} style={modalStyle.image} resizeMode={"cover"} />
					<Text style={[modalStyle.subTitle]}>Thank you for rating your meal!</Text>
					<Text style={[modalStyle.text]}>We appreciate your time and hope to serve you again soon!</Text>
					<ButtonHasStatus
						styleButton={[modalStyle.button]}
						title={"Ok"}
						active={true}
						onPress={() => setActiveModel(false)}
					/>
				</Modal>
				<Header
					title={"Rate Your Meal"}
					colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => navigation.pop()}
				/>
				<ScrollView contentContainerStyle={[styles.containerContent]} showsVerticalScrollIndicator={false}>
					<Row flex={0} style={{ justifyContent: "space-between" }}>
						<Text style={[{ ...textStyle["16_regular"], color: theme.text_1.getColor() }]}>Order ID</Text>
						<Text
							style={{
								...textStyle["16_semibold"],
								color: theme.text_1.getColor(),
							}}
						>
							{oderRating?.id}
						</Text>
					</Row>
					{meats &&
						meatRating &&
						meats.map((item, index) => {
							const itemForm = meatRating[index];
							if (!itemForm) return null;
							const { id, rating, review, images } = itemForm;
							const newRating = { ...itemForm };

							return (
								<InputReviewFragment
									key={index.toString()}
									id={id}
									image={item.image}
									name={item.name}
									onFocus={() => setFocus(true)}
									onBlur={() => setFocus(false)}
									onTextChange={text => {
										newRating.review = text;
										dispatchRating(newRating);
									}}
									onChangeRating={rating => {
										newRating.rating = rating;
										dispatchRating(newRating);
									}}
									onPressGallery={() => {
										if (!rating) return;

										ImagePicker.pickImage().then(uri => {
											if (!uri) return;
											addImage(index, uri);
										});
									}}
									onPressCamera={() => {
										if (!rating) return;

										navigation.replace("CameraScreen", {
											data: {
												index: index,
											},
											prevScreen: "MeatRatingScreen",
										});
									}}
									rating={rating}
									background={theme.rating.backgroundInputReview.getColor()}
									text={review}
								/>
							);
						})}
				</ScrollView>
				<Row flex={0} style={[styles.containerFooter, { display: focus ? "none" : "flex" }]}>
					<ButtonHasStatus
						title={"Skip"}
						styleText={{ fontWeight: "regular", color: theme.text_3.getColor() }}
						active={true}
						styleButton={[styles.buttonFooter, { backgroundColor: undefined }]}
						onPress={() => {
							dispatch(skipMeatRating());
							setActiveModel(true);
						}}
					/>
					<ButtonHasStatus
						title={"Submit"}
						active={submit}
						styleButton={[styles.buttonFooter]}
						onPress={() => {
							setActiveModel(true);
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
		flexGrow: 1,
		gap: spacing["spaced-3"],
		paddingBottom: NumberValue.paddingBottomScreen,
	},
	buttonFooter: {
		flex: 1,
	},
	containerFooter: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		gap: spacing["spaced-2"],
		marginTop: spacing["spaced-5"],
	},
});

const modalStyle = StyleSheet.create({
	container: {
		backgroundColor: neutral.getColor("900"),
		opacity: 0.2,
	},
	content: {
		borderRadius: borderConfig.radius["rounded-2"],
		padding: spacing["spaced-5"],
		gap: spacing["spaced-5"],
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: white.getColor(),
	},
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

export default MeatRatingScreen;

const dataDemo: MeatInfoType[] = [
	{
		id: "0",
		image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Chicken Burger",
	},
	{
		id: "1",
		image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Ramen Noodles",
	},
	{
		id: "2",
		image: "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Cherry Tomato Salad",
	},
];
