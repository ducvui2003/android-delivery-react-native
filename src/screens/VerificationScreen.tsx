/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:06 PM - 20/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { gradient, neutral, primary } from "../configs/colors/color-template.config";
import textStyle from "../configs/styles/textStyle.config";
import Row from "../components/custom/Row";
import SolarClockCircleLinear from "../../assets/images/icons/SolarClockCircleLinear";
import { ButtonHasStatus } from "../components/custom/ButtonHasStatus";
import Col from "../components/custom/Col";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { RootStackParamList } from "../navigations/stack.type";
import { VerificationScreenRouteProp } from "../navigations/route.type";
import { CountDown } from "../components/coutDown/CountDown";
import InputCodeFragment from "../fragments/InputCodeFragment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header } from "../components/header/Header";
import { formatHiddenPhoneNumber } from "../utils/formator";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { firebaseAuth } from "../configs/firebase/firebase.config";
import { AxiosError } from "axios";

type Props = {
	route: VerificationScreenRouteProp;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function VerificationScreen({
	route: {
		params: { dialCode, form },
	},
	navigation,
}: Props) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [hidden, setHidden] = useState<boolean>(false);
	const [time, setTime] = useState(0);
	const [errorVerify, setErrorVerify] = useState<boolean>(false);
	const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult>();

	useEffect(() => {
		signInWithPhoneNumber(form.phoneNumber);

		return firebaseAuth.onAuthStateChanged(user => {
			if (!user) return;

			user.getIdToken(true).then(token => {
				register(token);
			});
		});
	}, []);

	const componentResend: Record<"true" | "false", ReactNode> = {
		true: (
			<TouchableOpacity onPress={() => signInWithPhoneNumber(form.phoneNumber)}>
				<Text style={[styles.text, styles.textSimiBold, { color: primary.getColor("500") }]}>Resend Code</Text>
			</TouchableOpacity>
		),
		false: <Text style={[styles.text, styles.textSimiBold, { color: neutral.getColor("100") }]}>Resend Code</Text>,
	};

	const onBlurInput = () => {
		setHidden(false);
		Keyboard.dismiss();
	};

	const signInWithPhoneNumber = (phoneNumber: string) => {
		if (time !== 0 || firebaseAuth.currentUser) return;
		setTime(60 * 5);
		firebaseAuth
			.signInWithPhoneNumber(`${dialCode}${phoneNumber}`)
			.then(confirmation => {
				if (!confirmation) {
					navigation.replace("SignUpScreen");
					return;
				}
				setConfirmation(confirmation);
			})
			.catch(error => {
				console.log(error);
				navigation.replace("SignUpScreen");
			});
	};

	const verifyCode = (code: string) => {
		if (!confirmation) {
			navigation.replace("SignUpScreen");
			return;
		}
		confirmation
			.confirm(code)
			.then((value: FirebaseAuthTypes.UserCredential | null) => {
				if (!value) {
					setErrorVerify(true);
					return;
				}
				value.user.getIdToken(true).then(idToken => {
					register(idToken);
				});
			})
			.catch(() => setErrorVerify(true));
	};

	const register = (idToken: string) => {
		form.idToken = idToken;
		axiosInstance
			.post("/auth/register", form)
			.then(() => {
				navigation.navigate("LoginScreen");
			})
			.catch((error: AxiosError<ApiResponse<string>>) => {
				Alert.alert("Lỗi đăng ký", error.response?.data?.message);
			});
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (Platform.OS === "web") return;
				onBlurInput();
			}}
		>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
				<Header
					title={"Verification"}
					colorTitle={gradient.getColor()}
					titleStyle={[styles.titleHeader]}
					colorIconBack={theme.text_1.getColor()}
					sizeIconBack={26}
					strokeWidth={2}
					styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor(), borderWidth: 0 }}
					style={{ marginBottom: 32 }}
					onPressBack={() => {
						navigation.replace("SignUpScreen");
					}}
				/>
				<ScrollView
					style={{ flexDirection: "column" }}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					onResponderRelease={onBlurInput}
				>
					<Text style={[styles.text, styles.textNotification, { color: theme.text_1.getColor() }]}>
						Code has been send to ({dialCode}) {formatHiddenPhoneNumber(form.phoneNumber)}
					</Text>
					<InputCodeFragment
						numberOfInput={6}
						onFocus={() => {
							setHidden(true);
						}}
						sizeInputCode={40}
						onBlur={onBlurInput}
						setError={errorVerify}
						onChangeCode={code => {
							if (code.length !== 6) return;
							verifyCode(code);
						}}
					/>
					<Text style={[styles.text, { color: theme.text_1.getColor() }]}>Didn’t receive code?</Text>
					<CountDown
						time={time}
						icon={<SolarClockCircleLinear color={theme.text_1.getColor()} strokeWidth={2} />}
						textStyle={[{ color: theme.text_1.getColor() }]}
						onEnd={() => {
							setTime(0);
						}}
					/>
					{componentResend[(time === 0).toString() as "true" | "false"]}
				</ScrollView>
				<Col style={[styles.footerContainer]}>
					<ButtonHasStatus title={"Verify"} active={errorVerify} styleButton={[styles.buttonVerify]} />
					<Row style={[{ display: hidden ? "none" : "flex" }, styles.containerCanHidden]}>
						<Text style={[styles.text, { color: theme.text_1.getColor() }]}>Back to </Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("LoginScreen");
							}}
						>
							<Text style={[styles.text, styles.signIn, styles.textSimiBold]}>Sign In</Text>
						</TouchableOpacity>
					</Row>
				</Col>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 32,
		paddingTop: 75,
		justifyContent: "space-between",
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
	timeOutContainer: {
		justifyContent: "center",
		gap: 16,
		marginVertical: 24,
	},
	footerContainer: {
		justifyContent: "center",
		marginTop: 50,
	},
	buttonVerify: {
		marginBottom: 25,
	},
	containerCanHidden: {
		justifyContent: "center",
		marginBottom: 45,
		marginTop: 7,
	},
	signIn: {
		color: primary.getColor("500"),
	},
});
