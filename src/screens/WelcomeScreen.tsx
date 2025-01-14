/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:36 AM - 14/08/2024
 * User: lam-nguyen
 **/

import * as React from "react";
import { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import background from "../../assets/images/introduce/welcome.png";
import textStyle from "../configs/styles/textStyle.config";
import { white } from "../configs/colors/color-template.config";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import Modal from "../components/modal/Modal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../configs/redux/store.config";
import { isServerAlive } from "../services/health.service";
import { isShowIntroduce } from "../services/client.service";
import { AuthType, initialStateAuth } from "../hooks/redux/auth.slice";
import { removeAllToken } from "../services/auth.service";

export default function WelcomeScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "WelcomeScreen">>();
	const [isAlive, setIsAlive] = React.useState<boolean>(false);
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	// Check server is alive
	useEffect(() => {
		isServerAlive().then(isAlive => {
			console.log("Server is alive", isAlive);
			if (isAlive) {
				setIsAlive(true);
			} else {
				console.error("Server is down");
				setShowModal(true);
			}
		});
	}, []);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (isAlive) {
				dispatch(initialStateAuth()).then(action => {
					switch (action.type) {
						case AuthType.GET_ACCOUNT_FULFILLED:
							navigation.replace("MainScreen", { screen: "HomeScreen" });
							break;
						case AuthType.GET_ACCOUNT_REJECTED:
							removeAllToken().finally(() => {
								isShowIntroduce().then(response => {
									if (response) {
										navigation.replace("IntroduceScreen");
									} else {
										navigation.replace("MainScreen", { screen: "HomeScreen" });
									}
								});
							});
							break;
					}
				});
			}
		}, 2000);

		return () => clearTimeout(timeOut);
	}, [isAlive]); // Server alive is running

	return (
		<SafeAreaView style={[style.container]}>
			<ImageBackground source={background} style={style.imageBackground} resizeMode={"stretch"}>
				<View style={style.viewContextTextButton}>
					<Text style={[textStyle["22_semibold"], style.welcomeText]}>Welcome to</Text>
					<Text style={[textStyle["40_semibold"], style.appNameText]}>SPEEDY CHOW</Text>
				</View>
			</ImageBackground>
			<ModalServerDown showed={showModal} />
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageBackground: {
		flex: 1,
		justifyContent: "flex-end",
		width: "100%",
	},
	viewContextTextButton: {
		justifyContent: "flex-start",
		alignItems: "center",
		height: "20%",
	},
	welcomeText: {
		color: white.getColor(),
		marginBottom: 5,
		fontWeight: "bold",
	},
	appNameText: {
		fontWeight: "bold",
		color: white.getColor(),
	},
});

function ModalServerDown({ showed = false, onShowed }: { onShowed?: (value: boolean) => void; showed?: boolean }) {
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const theme = useSelector((state: RootState) => state.themeState.theme);

	useEffect(() => {
		setShowModal(showed);
	}, [showed]);

	useEffect(() => {
		onShowed?.(showModal);
	}, [showModal]);
	return (
		<Modal
			active={showModal}
			onEndHide={() => {
				setShowModal(false);
			}}
			background={{
				backgroundColor: theme.background.getColor(),
				opacity: 0.2,
			}}
		>
			<Text style={[{ ...textStyle["22_semibold"] }]}>Server is down</Text>
			<Text style={[{ ...textStyle["16_semibold"] }]}>Please wait</Text>
		</Modal>
	);
}
