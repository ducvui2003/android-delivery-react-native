/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:14 PM - 17/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import SolarMyLocation from "../../assets/images/icons/SolarMyLocation";
import { gradient, white } from "../configs/colors/color-template.config";
import spacing from "../configs/styles/space.config";
import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location/src/Location.types";
import { LatLng } from "react-native-maps/lib/sharedTypes";
import GradientText from "../components/gradientText/GradientText";
import textStyle from "../configs/styles/textStyle.config";
import { MapViewProps } from "react-native-maps/lib/MapView";
import { MapMarkerProps } from "react-native-maps/lib/MapMarker";
import { MapPolylineProps } from "react-native-maps/lib/MapPolyline";

function GoogleMapView({
	currentLocation,
	children,
	markers,
	polylines,
	...props
}: {
	currentLocation?: (location?: LocationObjectCoords) => void;
	children?: React.ReactNode;
	markers?: MapMarkerProps[];
	polylines?: MapPolylineProps[];
} & MapViewProps) {
	const mapViewRef = useRef<MapView>(null);
	const [myLocation, setMyLocation] = useState<LocationObjectCoords>();

	useEffect(() => {
		getMyLocation().then(setMyLocation);
	}, []);

	useEffect(() => {
		setPickedLocation(myLocation);
		currentLocation?.(myLocation);
	}, [myLocation, mapViewRef]);

	const getMyLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permission to access location was denied");
			return;
		}

		return await Location.getCurrentPositionAsync({}).then(location => location.coords);
	};

	const setPickedLocation = (location?: LatLng) => {
		if (!location) return;

		mapViewRef?.current?.animateToRegion(
			{
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.001,
				longitudeDelta: 0.001,
			},
			1000
		);
	};

	return (
		<>
			{myLocation ? (
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						followsUserLocation={true}
						ref={mapViewRef}
						cameraZoomRange={{
							animated: true,
							minCenterCoordinateDistance: 0,
							maxCenterCoordinateDistance: 20,
						}}
						mapType={"terrain"}
						userInterfaceStyle={"dark"}
						{...props}
					>
						{markers?.map((item, index) => <Marker key={`marker_${index}`} {...item} />)}
						{polylines?.map((item, index) => <Polyline key={`polyline_${index}`} {...item} />)}
					</MapView>
					<TouchableOpacity
						style={[styles.myLocationContainer]}
						onPress={() => getMyLocation().then(location => setMyLocation(location))}
					>
						<SolarMyLocation width={30} height={30} />
					</TouchableOpacity>
					{children}
				</View>
			) : (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<GradientText
						gradientColors={gradient.getColor()}
						textStyle={{ ...textStyle["40_semibold"] }}
						text={"Loading..."}
					/>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	mapContainer: {
		flex: 1,
		position: "relative",
		borderRadius: 10,
		marginHorizontal: 10,
		overflow: "hidden",
	},
	map: {
		flex: 1,
	},
	myLocationContainer: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: white.getColor(),
		elevation: 10,
		padding: spacing["spaced-2"],
		borderRadius: spacing["spaced-1"],
	},
});

export default GoogleMapView;
