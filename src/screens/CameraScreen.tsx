/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:20 PM - 08/09/2024
 *  User: lam-nguyen
 **/

import React, { ReactNode, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { gradient, neutral, secondary } from "../configs/colors/color-template.config";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import SolarFlashAuto from "../../assets/images/icons/SolarFlashAuto";
import SolarFlashOff from "../../assets/images/icons/SolarFlashOff";
import SolarFlashTorch from "../../assets/images/icons/SolarFlashTorch";
import SolarFlashOn from "../../assets/images/icons/SolarFlashOn";
import Row from "../components/custom/Row";
import SolarRefreshLinear from "../../assets/images/icons/SolarRefreshLinear";
import NumberValue from "../configs/value/number.value";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import GradientText from "../components/gradientText/GradientText";
import textStyle from "../configs/styles/textStyle.config";

type CameraScreenProps = {
	route: RouteProp<RootStackParamList, "CameraScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const sizeButton = 40;
const sizeWidth = Dimensions.get("window").width;
const arrayModeFlash: FlashMode[] = Object.keys(FlashMode) as FlashMode[];

function CameraScreen({
	route: {
		params: { data, prevScreen },
	},
	navigation,
}: CameraScreenProps) {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const refCamera = React.useRef<Camera>(null);
	const [ratios, setRatios] = useState<string[]>([]);
	const [ratio, setRatio] = useState(ratios.length ? ratios[0] : "1:1");
	const heightAmin = useSharedValue(sizeWidth);

	const renderIconFlashMode: Record<keyof typeof FlashMode, ReactNode> = {
		off: <SolarFlashOff width={sizeButton} height={sizeButton} />,
		on: <SolarFlashOn width={sizeButton} height={sizeButton} />,
		auto: <SolarFlashAuto width={sizeButton} height={sizeButton} />,
		torch: <SolarFlashTorch width={sizeButton} height={sizeButton} />,
	};

	useEffect(() => {
		refCamera.current?.getSupportedRatiosAsync().then(setRatios);
	}, []);

	useEffect(() => {
		if (!permission || !permission.granted) requestPermission().then();
	}, [permission]);

	useEffect(() => {
		heightAmin.value = withTiming(calculatorHeight(ratio), { duration: 1000 });
	}, [ratio]);

	const toggleCameraType = () => {
		setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
	};

	const calculatorHeight = (ratio: string) => {
		return (sizeWidth / Number(ratio.split(":")[1])) * Number(ratio.split(":")[0]);
	};

	const animatedHeight = useAnimatedStyle(() => ({
		height: heightAmin.value,
	}));

	const takePicture = async () => {
		refCamera?.current?.takePictureAsync().then(value => {
			navigation.replace(prevScreen, {
				data: { ...data },
				uri: value.uri,
			});
		});
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<Header
				title={"Camera"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				styleIconRight={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() =>
					navigation.replace(prevScreen, {
						data: data,
					})
				}
				style={[styles.headerContainer]}
				iconRight={
					<GradientText
						textStyle={[{ ...textStyle["16_semibold"], textAlign: "center" }]}
						text={ratio}
						gradientColors={gradient.getColor()}
						style={[{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }]}
					/>
				}
				onPressIconRight={() => {
					const currentIndex = ratios.indexOf(ratio);
					setRatio(ratios[currentIndex >= ratios.length - 1 ? 0 : currentIndex + 1]);
				}}
			/>
			<Animated.View style={[{ width: sizeWidth }, animatedHeight]}>
				<Camera
					ref={refCamera}
					style={[styles.camera, { height: calculatorHeight(ratio) }]}
					flashMode={flashMode}
					type={type}
					ratio={ratio}
				/>
			</Animated.View>
			<Row style={[styles.footerContainer]} flex={1}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						const currentIndex = arrayModeFlash.indexOf(flashMode);
						setFlashMode(arrayModeFlash[currentIndex >= 3 ? 0 : currentIndex + 1]);
					}}
				>
					{renderIconFlashMode[flashMode]}
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.outlineButtonTake]} onPress={takePicture}>
					<View style={[styles.buttonTake]} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
					<SolarRefreshLinear width={sizeButton} height={sizeButton} />
				</TouchableOpacity>
			</Row>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
	},
	headerContainer: {
		position: "absolute",
		width: "100%",
		top: 0,
		left: 0,
		zIndex: 1,
	},
	camera: {
		width: sizeWidth,
	},
	footerContainer: {
		position: "absolute",
		width: "100%",
		bottom: NumberValue.marginBottomScreen,
		left: 0,
		justifyContent: "space-around",
	},
	button: {
		alignItems: "center",
		backgroundColor: neutral.getColor("50"),
		padding: 10,
		borderRadius: 9999,
	},
	buttonTake: {
		backgroundColor: secondary.getColor("500"),
		width: sizeButton,
		height: sizeButton,
		borderRadius: 9999,
	},
	outlineButtonTake: {
		borderColor: neutral.getColor("100"),
		borderStyle: "solid",
		borderWidth: 5,
		padding: 5,
	},
});

export default CameraScreen;
