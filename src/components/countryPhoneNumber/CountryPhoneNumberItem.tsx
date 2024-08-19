/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:49 PM - 16/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryPhoneNumberType from "../../types/countryPhoneNumber.type";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function CountryPhoneNumberItem({ data }: { data: CountryPhoneNumberType }) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Text style={[styles.flag]}>{data.flag}</Text>
			<Text style={[styles.dialCode, { color: theme.text_3.getColor() }]}>({data.dial_code})</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	flag: {
		fontSize: 20,
	},
	dialCode: {
		fontSize: 12,
	},
});

export default CountryPhoneNumberItem;
