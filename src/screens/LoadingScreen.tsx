/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { LinearProgress } from "@rneui/themed";
import Animated, {
	Easing,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { primary, white } from "../configs/colors/color-template.config";
import brand from "../../assets/images/brand/brand_3.png";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";

const duration = 2000;

function LoadingScreen() {
	const sizeLogo = 180;
	const sizeTextNameApp = 40;
	const sizeTextVersion = 18;
	const sizeTextFooter = 22;
	const sizeTextNameAppAnim = useSharedValue(0);
	const sizeTextVersionAnim = useSharedValue(0);
	const sizeLogoAnim = useSharedValue(0);
	const sizeTextFooterAnim = useSharedValue(0);
	const transformAnim = useSharedValue(0);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, "LoadingScreen">>();

	const animatedTransform = useAnimatedStyle(() => ({
		transform: [{ translateY: transformAnim.value }],
	}));

	const animatedSizeLogo = useAnimatedStyle(() => ({
		width: sizeLogoAnim.value,
		height: sizeLogoAnim.value,
	}));

	const transformFontSize = (anim: SharedValue<number>) => {
		return useAnimatedStyle(() => ({
			fontSize: anim.value,
		}));
	};

	useEffect(() => {
		sizeLogoAnim.value = withTiming(sizeLogo, {
			duration,
		});

		sizeTextNameAppAnim.value = withDelay(
			duration,
			withTiming(sizeTextNameApp, {
				duration,
			})
		);

		sizeTextVersionAnim.value = withDelay(
			duration,
			withTiming(sizeTextVersion, {
				duration,
			})
		);

		sizeTextFooterAnim.value = withDelay(
			duration,
			withTiming(sizeTextFooter, {
				duration,
			})
		);

		transformAnim.value = withDelay(
			duration * 2,
			withRepeat(
				withSequence(
					withTiming(-100, {
						easing: Easing.ease,
					}),
					withSpring(0, {
						damping: 5,
					})
				),
				3,
				false
			)
		);

		const timeOut = setTimeout(() => {
			navigation.replace("WelcomeScreen");
		}, duration * 5);

		return () => clearTimeout(timeOut);
	}, []);

	return (
		<SafeAreaView style={[styles.container]}>
			<View
				style={{
					flex: 11,
				}}
			>
				<View style={[styles.topContainer]}>
					<Animated.Image source={brand} style={[animatedSizeLogo, animatedTransform]} />
					<Animated.Text
						style={[transformFontSize(sizeTextNameAppAnim), styles.textAppName]}
					>
						SPEEDY CHOW
					</Animated.Text>
					<Animated.Text
						style={[transformFontSize(sizeTextVersionAnim), styles.textVersion]}
					>
						Version 2.1.0
					</Animated.Text>
				</View>
				<View style={[styles.textContainer]}>
					<Animated.Text style={[transformFontSize(sizeTextFooterAnim), styles.text]}>
						As fast as lightning,
					</Animated.Text>
					<Animated.Text style={[transformFontSize(sizeTextFooterAnim), styles.text]}>
						as delicious as thunder!
					</Animated.Text>
				</View>
			</View>
			<View style={[styles.linearProgressContainer]}>
				<LinearProgress style={[styles.linearProgressStyle]} color={white.getColor(0.9)} />
			</View>
		</SafeAreaView>
	);
}

export default LoadingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: primary.getColor("500"),
		justifyContent: "center",
		alignItems: "center",
	},
	topContainer: {
		flex: 3,
		justifyContent: "center",
		alignItems: "center",
	},
	textAppName: {
		color: white.getColor(),
		width: "100%",
		height: "auto",
		textAlign: "center",
		fontWeight: "bold",
	},
	textVersion: {
		color: white.getColor(),
		width: "100%",
		height: "auto",
		textAlign: "center",
		fontWeight: "semibold",
	},
	textContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	text: {
		color: white.getColor(),
		height: "auto",
		width: "100%",
		textAlign: "center",
		fontWeight: "semibold",
	},
	linearProgressContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	linearProgressStyle: {
		marginVertical: 10,
		backgroundColor: primary.getColor("600"),
	},
});
