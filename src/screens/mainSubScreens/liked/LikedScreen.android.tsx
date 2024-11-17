/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
import * as React from "react";
import SearchFragment from "../../../fragments/SearchFragment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainScreenStackParamList } from "../../../navigations/stack.type";
import { RouteProp } from "@react-navigation/native";
import Space from "../../../components/custom/Space";
import spacing from "../../../configs/styles/space.config";
import Col from "../../../components/custom/Col";
import { ThemeType } from "../../../types/theme.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";

type LikedScreenProps = {
	navigation: NativeStackNavigationProp<MainScreenStackParamList>;
	route: RouteProp<MainScreenStackParamList, "LikedScreen">;
};

function LikedScreen({ navigation }: LikedScreenProps) {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Col style={{ backgroundColor: theme.background.getColor() }} flex={1}>
			<SearchFragment autoFocus={false} category={{ id: -1, name: "Liked" }} navigation={navigation} />
		</Col>
	);
}

export default LikedScreen;
