/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:55 AM - 08/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import InputReview from "../components/review/InputReview";
import InputReviewProps from "../components/review/type/inputReview.props";
import Col from "../components/custom/Col";
import { Image, StyleSheet, Text, View } from "react-native";
import IconRating from "../components/rating/IconRating";
import Row from "../components/custom/Row";
import textStyle from "../configs/styles/textStyle.config";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";

type InputReviewFragmentProps = InputReviewProps & {
	id: string;
	image: string;
	name: string;
	onChangeRating?: (rating: number) => void;
	rating: number;
};

function InputReviewFragment({
	id,
	image,
	name,
	onFocus,
	onTextChange,
	onBlur,
	onPressGallery,
	onPressCamera,
	onChangeRating,
	rating,
	background,
	text,
}: InputReviewFragmentProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Col
			style={[
				styles.container,
				{ borderColor: theme.border.getColor(), backgroundColor: theme.basket.background.getColor() },
			]}
		>
			<Row style={{ gap: 15 }}>
				<View style={styles.frameAvatarMeat}>
					<Image
						source={{
							uri: image,
						}}
						style={{ width: "100%", height: "100%" }}
						resizeMode={"cover"}
					/>
				</View>
				<Col style={{ justifyContent: "space-between" }}>
					<Text style={[{ ...textStyle["16_semibold"], color: theme.text_1.getColor() }]}>{name}</Text>
					<IconRating
						total={5}
						rating={rating}
						iconSize={40}
						isChangeable={true}
						onChangeRating={onChangeRating}
					/>
				</Col>
			</Row>
			<InputReview
				onFocus={onFocus}
				onBlur={onBlur}
				onTextChange={onTextChange}
				onPressCamera={onPressCamera}
				onPressGallery={onPressGallery}
				background={background}
				text={text}
			/>
		</Col>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		gap: 15,
	},
	frameAvatarMeat: {
		width: 70,
		height: 70,
		borderRadius: 7,
		overflow: "hidden",
	},
});

export default InputReviewFragment;
