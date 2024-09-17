/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:30 AM - 27/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import SearchFragment from "../fragments/SearchFragment";

type SearchScreenProps = {
	route: RouteProp<RootStackParamList, "SearchScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function SearchScreen({
	route: {
		params: { autoFocus, category },
	},
	navigation,
}: SearchScreenProps) {
	return <SearchFragment autoFocus={autoFocus} category={category} navigation={navigation} />;
}
