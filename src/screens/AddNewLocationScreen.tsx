/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:13 AM - 26/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, Keyboard, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location/src/Location.types";
import { Picker } from "../components/location/Picker";
import textStyle from "../configs/styles/textStyle.config";
import { LatLng } from "react-native-maps/lib/sharedTypes";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import Col from "../components/custom/Col";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import InputIcon from "../components/input/InputIcon";
import Space from "../components/custom/Space";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SolarMapPointLinear from "../../assets/images/icons/SolarMapPointLinear";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import { RouteProp } from "@react-navigation/native";
import NumberValue from "../configs/value/number.value";
import GoogleMapView from "../fragments/GoogleMapView";
import spacing from "../configs/styles/space.config";

type AddNewLocationScreenProps = {
	route: RouteProp<RootStackParamList, "AddNewLocationScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function AddNewLocationScreen({ navigation }: AddNewLocationScreenProps) {
	const [currentLocation, setCurrentLocation] = useState<LocationObjectCoords>();
	const [pickedLocation, setPickedLocation] = useState<LatLng>({ latitude: 0, longitude: 0 });
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const dropAnim = useSharedValue(340);

	const dropAnimHandler = (value: "down" | "up") => {
		dropAnim.value = withTiming(value === "down" ? 45 : 340, { duration: 500 });
	};

	const animateDrop = useAnimatedStyle(() => ({
		height: dropAnim.value,
	}));

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setCurrentLocation(location.coords);
		})();
	}, []);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Col style={{ width: "100%", height: "100%" }}>
				<Header
					title={"Add new location"}
					colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
					}}
					onPressBack={() => navigation.pop()}
				/>
				<GoogleMapView
					currentLocation={setCurrentLocation}
					onRegionChange={region => {
						setPickedLocation({ latitude: region.latitude, longitude: region.longitude });
						console.log(pickedLocation);
					}}
					markers={currentLocation && [{ coordinate: currentLocation, title: "my location" }]}
				>
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
					<Text
						style={[{ ...textStyle["18_semibold"], color: theme.text_1.getColor(), textAlign: "center" }]}
					>
						Location
					</Text>
					<Space height={16} />
					<InputIcon
						height={54}
						placeholder={"Your Location"}
						iconRight={<SolarMapPointLinear width={24} height={24} color={theme.text_1.getColor()} />}
					/>
					<Space height={16} />
					<InputIcon height={54} placeholder={"Location name"} />
					<Space height={32} />
					<ButtonHasStatus title={"Apply"} onPress={() => {}} styleButton={styles.buttonApply} />
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
	buttonApply: {
		width: "100%",
	},
});
