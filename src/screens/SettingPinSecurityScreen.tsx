/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:11 PM - 21/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useState } from "react";
import {
	Keyboard,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import textStyle from "../configs/styles/textStyle.config";
import { ButtonHasStatus } from "../components/custom/ButtonHasStatus";
import Col from "../components/custom/Col";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import InputCodeFragment from "../fragments/InputCodeFragment";
import { Header } from "../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";

export function SettingPinSecurityScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [hidden, setHidden] = useState<boolean>(false);
	const [code, setCode] = useState<string>("");
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "SettingPinSecurityScreen">>();

	const onBlurInput = () => {
		setHidden(false);
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (Platform.OS === "web") return;
				onBlurInput();
			}}
		>
			<SafeAreaView style={[{ flex: 1, backgroundColor: theme.background.getColor() }]}>
				<Header
					title={"PIN Security"}
					colorTitle={theme.text_1.getColor()}
					titleStyle={[styles.titleHeader]}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
					style={styles.header}
					onPressBack={() => navigation.replace("LoginScreen")}
				/>
				<Col style={styles.container}>
					<ScrollView
						style={{ flexDirection: "column" }}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						onResponderRelease={onBlurInput}
					>
						<Text style={[styles.text, styles.textNotification, { color: theme.text_1.getColor() }]}>
							Protect your account with a secure PIN
						</Text>
						<InputCodeFragment
							numberOfInput={4}
							keyboardType={"numeric"}
							onChangeCode={setCode}
							onFocus={() => {
								setHidden(true);
							}}
							onBlur={onBlurInput}
						/>
					</ScrollView>
					<Col style={[styles.footerContainer]}>
						<ButtonHasStatus
							title={"Continue"}
							active={code.length === 4}
							styleButton={[styles.buttonVerify]}
						/>
						<TouchableOpacity
							style={[
								styles.buttonSkip,
								{
									display: hidden ? "none" : "flex",
								},
							]}
							onPress={() => navigation.replace("MainScreen", { screen: "HomeScreen" })}
						>
							<Text style={[{ ...textStyle["18_regular"], color: theme.textSkip.getColor() }]}>Skip</Text>
						</TouchableOpacity>
					</Col>
				</Col>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 25,
		justifyContent: "space-between",
	},
	header: {
		marginBottom: 32,
	},
	titleHeader: {
		...textStyle["30_bold_5%"],
	},
	textNotification: {
		marginBottom: 32,
	},
	inputCodeContainer: {
		justifyContent: "space-between",
		marginBottom: 51,
	},
	inputCode: {
		height: "100%",
		...textStyle["40_semibold"],
		textAlign: "center",
	},
	text: {
		textAlign: "center",
		...textStyle["16_regular"],
	},
	textSimiBold: {
		fontWeight: "bold",
	},
	footerContainer: {
		justifyContent: "center",
		marginTop: 50,
	},
	buttonVerify: {
		marginBottom: 25,
	},
	buttonSkip: {
		paddingVertical: 16,
		borderRadius: 999,
		alignItems: "center",
		marginBottom: 25,
	},
});
