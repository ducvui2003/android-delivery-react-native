/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:13 AM - 26/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { LocationObjectCoords } from "expo-location/src/Location.types";
import Col from "../components/custom/Col";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import { RouteProp } from "@react-navigation/native";
import NumberValue from "../configs/value/number.value";
import spacing from "../configs/styles/space.config";
import GoogleMapView from "../fragments/GoogleMapView";
import { Picker } from "../components/location/Picker";
import DriverInfoType from "../types/driverInfo.type";
import OrderTrackingFragment from "../fragments/OrderTrackingFragment";

type OrderTrackingScreenProps = {
	route: RouteProp<RootStackParamList, "OrderTrackingScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function OrderTrackingScreen({ navigation }: OrderTrackingScreenProps) {
	const [currentLocation, setCurrentLocation] = useState<LocationObjectCoords>();
	const dropAnim = useSharedValue(340);
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [driver, setDriver] = useState<DriverInfoType>();

	const dropAnimHandler = (value: "down" | "up") => {
		dropAnim.value = withTiming(value === "down" ? 45 : 340, { duration: 500 });
	};

	const animateDrop = useAnimatedStyle(() => ({
		height: dropAnim.value,
	}));

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Col style={{ width: "100%", height: "100%" }}>
				<Header
					title={"Order Tracking"}
					colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => navigation.pop()}
				/>
				<GoogleMapView currentLocation={setCurrentLocation}>
					<View style={styles.pickerContainer}>
						<Picker />
					</View>
				</GoogleMapView>
				<Animated.View
					style={[
						styles.dropContainer,
						{ backgroundColor: theme.add_new_location.background.getColor() },
						animateDrop,
					]}
				>
					<PanGestureHandler
						onGestureEvent={event => {
							const { translationY } = event.nativeEvent;
							if (translationY < -20) {
								dropAnimHandler("up");
							}
							if (translationY > 20) {
								Keyboard.dismiss();
								dropAnimHandler("down");
							}
						}}
					>
						<View
							style={[
								{
									backgroundColor: theme.add_new_location.drop_button.getColor(),
								},
								styles.dropButton,
							]}
						/>
					</PanGestureHandler>
					<OrderTrackingFragment driver={setDriver} />
				</Animated.View>
			</Col>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	pickerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -30 }, { translateY: -60 }],
	},
	dropContainer: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		flexDirection: "column",
		borderRadius: spacing["spaced-4"],
	},
	dropButton: {
		height: 15,
		borderRadius: 9999,
		marginTop: 15,
		marginBottom: 18,
		width: "40%",
		left: "30%",
	},
});
