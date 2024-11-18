/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 7:29pm
 * User: ducvui2003
 **/

import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import React, { useEffect, useState } from "react";
import { ThemeType } from "../../types/theme.type";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import CategoryProps from "./type/category.props";
import { firebaseStorage } from "../../configs/firebase/firebase.config";

function CategoryItem({ item, onPress }: CategoryProps) {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [image, setImage] = useState<string | undefined>();

	useEffect(() => {
		firebaseStorage
			.ref(item.urlImage ?? "category/more.png")
			.getDownloadURL()
			.then(value => {
				setImage(value);
			});
	}, [item.urlImage]);

	return (
		<TouchableOpacity onPress={onPress} style={{ ...styles.container }}>
			{image && <Image source={{ uri: image }} style={{ ...styles.image }} />}
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
