/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:53 PM - 05/09/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import textStyle from "../configs/styles/textStyle.config";
import Row from "../components/custom/Row";
import Col from "../components/custom/Col";
import IconRating from "../components/rating/IconRating";
import LineRating from "../components/rating/LineRating";
import { secondary } from "../configs/colors/color-template.config";
import { ReviewType } from "../components/review/type/buttonReview.props";
import ReviewDisplayItem from "../components/review/ReviewDisplayItem";
import ReviewDisplayItemProps from "../components/review/type/reviewDisplayItem.props";
import ButtonReview from "../components/review/ButtonReview";
import Space from "../components/custom/Space";

type ReviewScreenProps = {
	route: RouteProp<RootStackParamList, "ReviewScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ReviewTypeArray: ReviewType[] = ["All", "Positive", "Negative", "5", "4", "3", "2", "1"];

function ReviewScreen({
	route: {
		params: { id = "", name = "Chicken Burger" },
	},
	navigation,
}: ReviewScreenProps) {
	const theme = useSelector((root: RootState) => root.themeState.theme);
	const [reviewType, setReviewType] = React.useState<ReviewType>("All");

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: theme.background.getColor(),
			}}
		>
			<Header
				title={"Reviews"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => {
					Keyboard.dismiss();
					navigation.pop();
				}}
			/>
			<Col style={[styles.containerContent]} flex={1}>
				<Text style={[{ ...textStyle["22_semibold"], textAlign: "center", color: theme.text_1.getColor() }]}>
					{name}
				</Text>
				<Row style={{ gap: 20, paddingHorizontal: 25 }} flex={0}>
					<Col flex={1}>
						<Text
							style={[
								{ ...textStyle["40_semibold"], textAlign: "center", color: theme.text_1.getColor() },
							]}
						>
							4.9
						</Text>
						<IconRating
							colorSelected={secondary.getColor("500")}
							colorUnselected={theme.review.colorRatingUnSelected.getColor()}
							total={5}
							rating={4.8}
							iconSize={25}
						/>
					</Col>
					<Col flex={1}>
						<LineRating
							data={[
								{ title: "5", percent: 20 },
								{ title: "4", percent: 35 },
								{ title: "3", percent: 25 },
								{ title: "2", percent: 15 },
								{ title: "1", percent: 5 },
							]}
						/>
					</Col>
				</Row>
				<Row flex={0}>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={[{ gap: 10 }]}
					>
						{ReviewTypeArray.map((value, index) => (
							<ButtonReview
								key={index}
								title={value}
								isSelected={reviewType === value}
								hiddenIconRight={Number.isNaN(Number.parseInt(value))}
								onPress={() => {
									setReviewType(value);
								}}
							/>
						))}
					</ScrollView>
				</Row>
				<ScrollView contentContainerStyle={{ gap: 25 }} showsVerticalScrollIndicator={false}>
					{dataDemo.map((item, index) => (
						<ReviewDisplayItem key={index} {...item} />
					))}
					<Space height={20} />
				</ScrollView>
			</Col>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerContent: {
		paddingHorizontal: 25,
		gap: 32,
	},
});

export default ReviewScreen;

const dataDemo: ReviewDisplayItemProps[] = [
	{
		name: "John Doe",
		date: "29/03/2024",
		rating: 5,
		comment:
			"Delicious chicken burger! Loved the crispy chicken and the bun was perfectly toasted. Definitely a new favorite!",
	},
	{
		name: "Tom",
		date: "05/04/2024",
		rating: 5,
		comment:
			"Absolutely delicious! The chicken burger was juicy and flavorful, with just the right amount of seasoning. Highly recommend!",
	},
	{
		name: "Adam",
		date: "25/03/2024",
		rating: 5,
		comment:
			"The chicken burger was decent, but I felt like it could use more seasoning. Overall, it was tasty and satisfying.",
	},
	{
		name: "James",
		date: "29/03/2024",
		rating: 4,
		comment:
			"The chicken burger was okay, but it was a bit overcooked for my liking. The toppings were fresh, though.",
	},
	{
		name: "James",
		date: "29/03/2024",
		rating: 4,
		comment:
			"The chicken burger was okay, but it was a bit overcooked for my liking. The toppings were fresh, though.",
	},
];
