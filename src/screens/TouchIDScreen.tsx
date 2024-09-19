/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:45 PM - 17/09/2024
 * User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import Col from "../components/custom/Col";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import textStyle from "../configs/styles/textStyle.config";
import spacing from "../configs/styles/space.config";
import { green, neutral, secondary } from "../configs/colors/color-template.config";
import GradientView from "../components/gradientView/GradientView";
import ColorFactory from "../utils/Color";
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import Row from "../components/custom/Row";
import SolarCheckBold from "../../assets/images/icons/SolarCheckBold";
import SolarFingerScan from "../../assets/images/icons/SolarFingerScan";
import * as LocalAuthentication from "expo-local-authentication";

type TouchIDScreenProps = {
	route: RouteProp<RootStackParamList, "TouchIDScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

function TouchIDScreen({ navigation }: TouchIDScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const scanAnim = useSharedValue(0);
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	const animatedScan = useAnimatedStyle(() => ({
		height: scanAnim.value,
	}));

	useEffect(() => {
		scanAnim.value = withRepeat(
			withSequence(withTiming(250, { duration: 1000 }), withTiming(0, { duration: 1000 })),
			-1
		);
		handleBiometricAuth().then();
	}, []);

	const handleBiometricAuth = async () => {
		const compatible = await LocalAuthentication.hasHardwareAsync();
		if (!compatible) {
			stopAnimation();
			alert("Thiết bị không hỗ trợ sinh trắc học");
			return;
		}

		const biometricRecords = await LocalAuthentication.isEnrolledAsync();
		if (!biometricRecords) {
			stopAnimation();
			alert("Thiết bị không có dữ liệu sinh trắc học");
			return;
		}

		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: "Xác thực bằng vân tay",
			fallbackLabel: "Nhập mật khẩu",
		});

		stopAnimation();
		if (result.success) {
			setAuthenticated(true);
		} else {
			alert("Xác thực thất bại");
		}
	};

	const stopAnimation = () => {
		cancelAnimation(scanAnim);
		scanAnim.value = 0;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background.getColor() }}>
			<Header
				title={"Touch ID Security"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => {
					navigation.pop();
				}}
			/>
			<Col style={styles.container} flex={1}>
				<Text style={[styles.text, { color: theme.text_1.getColor(), width: "80%" }]}>
					Secure your account with your fingerprint using Touch ID
				</Text>
				<View style={{ width: 250, height: 250, overflow: "hidden", borderRadius: 35 }}>
					<View style={{ left: -40, top: -40 }}>
						<SolarFingerScan
							width={330}
							height={330}
							color={authenticated ? green.getColor("500") : neutral.getColor("50")}
							colorBorder={authenticated ? green.getColor("500") : secondary.getColor("500")}
						/>
					</View>
					<Animated.View style={[{ width: 250, position: "absolute", bottom: 0, height: 0 }, animatedScan]}>
						<GradientView
							gradientColors={[
								ColorFactory.createSingleColor("#FFC700").getColor(0.6),
								ColorFactory.createSingleColor("#FFC700").getColor(0),
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={[{ width: 250, height: "100%" }]}
						>
							<View style={{ width: "100%", height: 10, backgroundColor: secondary.getColor("500") }} />
						</GradientView>
					</Animated.View>
				</View>
				{authenticated ? (
					<Row>
						<SolarCheckBold color={green.getColor("500")} />
						<Text style={[styles.text, { color: green.getColor("500") }]}>
							Authentication authenticatedful
						</Text>
					</Row>
				) : (
					<Text style={[styles.text, { color: theme.text_1.getColor(), width: "80%" }]}>
						Please place your finger on the fingerprint sensor to get started
					</Text>
				)}
			</Col>
			<Col style={[styles.footerContainer]}>
				<ButtonHasStatus title={"Continue"} active={authenticated} styleButton={[styles.buttonVerify]} />
				<TouchableOpacity
					style={[styles.buttonSkip]}
					onPress={() => navigation.replace("MainScreen", { screen: "HomeScreen" })}
				>
					<Text style={[{ ...textStyle["18_regular"], color: theme.textSkip.getColor() }]}>Skip</Text>
				</TouchableOpacity>
			</Col>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing["spaced-5"],
		alignItems: "center",
		marginTop: spacing["spaced-6"],
		gap: spacing["spaced-5"],
	},
	text: {
		textAlign: "center",
		...textStyle["16_regular"],
	},
	footerContainer: {
		paddingHorizontal: spacing["spaced-5"],
		justifyContent: "center",
		marginTop: spacing["spaced-8"],
	},
	buttonVerify: {
		marginBottom: spacing["spaced-5"],
	},
	buttonSkip: {
		paddingVertical: 16,
		borderRadius: 999,
		alignItems: "center",
		marginBottom: spacing["spaced-5"],
	},
});

export default TouchIDScreen;
