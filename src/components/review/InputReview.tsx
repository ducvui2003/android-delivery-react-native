/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:35 AM - 08/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { neutral } from "../../configs/colors/color-template.config";
import Row from "../custom/Row";
import textStyle from "../../configs/styles/textStyle.config";
import SolarCameraBold from "../../../assets/images/icons/SolarCameraBold";
import SolarGalleryBold from "../../../assets/images/icons/SolarGalleryBold";
import Col from "../custom/Col";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import InputReviewProps from "./type/inputReview.props";

function InputReview({ onFocus, onBlur, onTextChange, onPressGallery, onPressCamera, background }: InputReviewProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Col
			style={[
				styles.container,
				{ backgroundColor: background ?? theme.rating.backgroundInputReviewFragment.getColor() },
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
				placeholder={"Type your review ... "}
				placeholderTextColor={theme.placeholder.getColor()}
				textAlignVertical={"top"}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={event => {
					onTextChange?.(event.nativeEvent.text);
				}}
			/>
			<Row style={{ justifyContent: "flex-end", gap: 10 }} flex={0}>
				<TouchableOpacity onPress={onPressCamera}>
					<SolarCameraBold width={27} height={27} color={neutral.getColor("100")} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressGallery}>
					<SolarGalleryBold width={25} height={25} color={neutral.getColor("100")} />
				</TouchableOpacity>
			</Row>
		</Col>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		padding: 20,
		gap: 10,
	},
});

export default InputReview;
