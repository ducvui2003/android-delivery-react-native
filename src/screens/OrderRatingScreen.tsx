/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:08 PM - 07/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import diamond from "../../assets/images/icons/diamond.png";
import { setIdDriverRating, setIdOderRating, setOderRating } from "../hooks/redux/rating.slice";

type OrderRatingScreenProps = {
	route: RouteProp<RootStackParamList, "OrderRatingScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function OrderRatingScreen({
	route: {
		params: { idOrder, idDriver },
	},
	navigation,
}: OrderRatingScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const rating = useSelector((state: RootState) => state.ratingState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIdOderRating(idOrder));
		dispatch(setIdDriverRating(idDriver));
	}, []);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title={"Order Rating"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => navigation.pop()}
			/>
			<Col flex={1} style={styles.containerContent}>
				<Text style={[{ ...textStyle["22_regular"], color: theme.text_1.getColor(), textAlign: "center" }]}>
					Rate your Experience
				</Text>
				<Row style={{ justifyContent: "center" }} flex={0}>
					<Image source={diamond} style={{ width: 200, height: 200 }} />
				</Row>
			</Col>
			<View style={[{ paddingHorizontal: NumberValue.paddingHorizontalScreen }]}>
				<IconRating
					total={5}
					rating={rating?.oderRating?.rating ?? 0}
					iconSize={55}
					isChangeable={true}
					onChangeRating={rating => dispatch(setOderRating(rating))}
				/>
			</View>
			<Row flex={0} style={[{ paddingHorizontal: NumberValue.paddingHorizontalScreen, gap: 10, marginTop: 100 }]}>
				<ButtonHasStatus
					title={"Skip"}
					styleText={{ fontWeight: "regular", color: theme.text_3.getColor() }}
					active={true}
					styleButton={[styles.buttonFooter, { backgroundColor: undefined }]}
					onPress={() => {
						dispatch(setOderRating(0));
						navigation.navigate("DriverRatingScreen", {});
					}}
				/>
				<ButtonHasStatus
					title={"Submit"}
					active={!!rating.oderRating?.rating}
					styleButton={[styles.buttonFooter]}
					onPress={() => {
						navigation.navigate("DriverRatingScreen", {});
					}}
				/>
			</Row>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerContent: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		gap: 50,
	},
	buttonFooter: {
		flex: 1,
	},
});

export default OrderRatingScreen;
