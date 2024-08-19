/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 7:29pm
 * User: ducvui2003
 **/

import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import React from "react";
import { ThemeType } from "../../types/theme.type";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { CategoryType } from "./type/category.type";

function CategoryItem({ item }: CategoryType) {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	return (
		<TouchableOpacity style={{ ...styles.container }}>
			<Image source={item.image} style={{ ...styles.image }} />
			<Text style={{ ...styles.text }}>{item.name}</Text>
		</TouchableOpacity>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			alignItems: "center",
			padding: 6,
			elevation: 5,
			borderRadius: 8,
			backgroundColor: theme.home.category.background.getColor(),
		},
		image: {
			width: 24,
			height: 24,
		},
		text: {
			...textStyle["12_medium"],
			marginTop: 5,
			textAlign: "center",
			color: theme.home.category.text.getColor(),
		},
	});

export default CategoryItem;
