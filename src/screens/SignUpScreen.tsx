/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React, { ReactNode, useState } from "react";
import {
	Alert,
	Keyboard,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import textStyle from "../configs/styles/textStyle.config";
import { gradient, neutral, otherMethodSignIn, primary } from "../configs/colors/color-template.config";
import { CheckBox, Divider } from "@rneui/themed";
import Row from "../components/custom/Row";
import Col from "../components/custom/Col";
import GoogleAuth from "../components/auth/GoogleAuth";
import FacebookAuth from "../components/auth/FacebookAuth";
import SolarLetterBold from "../../assets/images/icons/SolarLetterBold";
import InputIcon from "../components/input/InputIcon";
import SolarUserBold from "../../assets/images/icons/SolarUserBold";
import Space from "../components/custom/Space";
import { Controller, useForm } from "react-hook-form";
import InputPhoneNumber from "../components/input/InputPhoneNumber";
import GradientText from "../components/gradientText/GradientText";
import RegisterFormType from "../types/registerForm.type";
import { ButtonHasStatus } from "../components/custom/ButtonHasStatus";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";
import SolarLockPasswordBold from "../../assets/images/icons/SolarLockPasswordBold";
import CountryPhoneNumberType from "../types/countryPhoneNumber.type";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { AxiosError } from "axios";
import SolarEyeBold from "../../assets/images/icons/SolarEyeBold";
import SolarEyeClosedBold from "../../assets/images/icons/SolarEyeClosedBold";

function SignUpScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [isShow, setIsShow] = useState(false);
	const [isFocusInput, setIsFocusInput] = useState(false);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "SignUpScreen">>();
	const [countryPhoneNumber, setCountryPhoneNumber] = useState<CountryPhoneNumberType>();
	const [showPassword, setShowPassword] = useState(false);
	const sizeIcon = 25;
	const {
		control,
		setError,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<RegisterFormType>({ mode: "all" });

	const onSubmit = async (data: RegisterFormType) => {
		if (!isValid || !countryPhoneNumber) return;
		axiosInstance
			.post("/auth/check-before-register", {
				phoneNumber: data.phoneNumber,
				region: countryPhoneNumber.code,
				email: data.email,
			})
			.then(() => {
				data.region = countryPhoneNumber.code;

				navigation.replace("VerificationScreen", {
					dialCode: countryPhoneNumber.dial_code,
					form: data,
				});
			})
			.catch((error: AxiosError<ApiResponse<string>>) => {
				Alert.alert("Lỗi đăng ký", error.response?.data?.message);
			});
	};

	const onFocusInput = () => {
		setIsFocusInput(true);
		setIsShow(false);
	};

	const onBlurInput = () => {
		setIsFocusInput(false);
	};

	const onOtherPress = () => {
		setIsShow(false);
		if (Platform.OS === "web") return;
		Keyboard.dismiss();
	};

	const renderIconShowPassword: Record<"true" | "false", ReactNode> = {
		true: (
			<SolarEyeBold
				width={sizeIcon}
				height={sizeIcon}
				style={{ marginRight: 12 }}
				color={neutral.getColor("100")}
			/>
		),
		false: (
			<SolarEyeClosedBold
				width={sizeIcon}
				height={sizeIcon}
				style={{ marginRight: 12 }}
				color={neutral.getColor("100")}
			/>
		),
	};

	return (
		<TouchableWithoutFeedback onPress={onOtherPress}>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
				<FlatList
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={[1]}
					renderItem={() => {
						return (
							<>
								<Row style={styles.titleContainer} flex={0}>
									<GradientText
										style={{ marginBottom: 32 }}
										textStyle={styles.title}
										text={"Registration"}
										gradientColors={gradient.getColor()}
									/>
								</Row>
								<Controller
									key={"phoneNumber"}
									control={control}
									name={"phoneNumber"}
									rules={{
										required: "Phone number is required",
										minLength: {
											value: 9,
											message: "Phone number is too short",
										},
										validate: undefined,
									}}
									render={({ field: { onChange, value } }) => {
										return (
											<Col style={{ zIndex: 2 }}>
												<InputPhoneNumber
													showed={isShow}
													onShow={setIsShow}
													placeholder={"00 000 000"}
													value={value}
													borderColor={
														errors.phoneNumber ? primary.getColor("500") : undefined
													}
													borderColorFocus={
														errors.phoneNumber ? primary.getColor("500") : undefined
													}
													onBlur={onBlurInput}
													onFocus={onFocusInput}
													onValidation={isValid => {
														if (isValid) return;

														setError("phoneNumber", {
															type: "validate",
															message: "Invalid phone number",
														});
													}}
													onChange={element => {
														onChange(element.nativeEvent.text);
													}}
													onCountryPhoneNumberSelected={setCountryPhoneNumber}
												/>
												{errors.phoneNumber && (
													<Text style={{ color: primary.getColor("500"), zIndex: -1 }}>
														{errors.phoneNumber.message}
													</Text>
												)}
											</Col>
										);
									}}
								/>
								<Space height={24} />
								<Controller
									control={control}
									name={"email"}
									rules={{
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: "Invalid email",
										},
									}}
									render={({ field: { onChange, value } }) => {
										return (
											<Col>
												<InputIcon
													iconLeft={
														<SolarLetterBold
															width={sizeIcon}
															height={sizeIcon}
															style={{ marginRight: 12 }}
															color={neutral.getColor("100")}
														/>
													}
													placeholder={"Email"}
													borderColor={errors.email ? primary.getColor("500") : undefined}
													borderColorFocus={
														errors.email ? primary.getColor("500") : undefined
													}
													value={value}
													onBlur={onBlurInput}
													onFocus={onFocusInput}
													onChange={element => {
														onChange(element.nativeEvent.text);
													}}
												/>
												{errors.email && (
													<Text style={{ color: primary.getColor("500") }}>
														{errors.email.message}
													</Text>
												)}
											</Col>
										);
									}}
								/>
								<Space height={24} />
								<Controller
									control={control}
									name={"fullName"}
									rules={{
										required: "Full name is required",
									}}
									render={({ field: { onChange, value } }) => {
										return (
											<Col>
												<InputIcon
													iconLeft={
														<SolarUserBold
															width={sizeIcon}
															height={sizeIcon}
															style={{ marginRight: 12 }}
															color={neutral.getColor("100")}
														/>
													}
													placeholder={"Full Name"}
													value={value}
													borderColor={errors.fullName ? primary.getColor("500") : undefined}
													borderColorFocus={
														errors.fullName ? primary.getColor("500") : undefined
													}
													onBlur={onBlurInput}
													onFocus={onFocusInput}
													onChange={element => {
														onChange(element.nativeEvent.text);
													}}
												/>
												{errors.fullName && (
													<Text style={{ color: primary.getColor("500") }}>
														{errors.fullName.message}
													</Text>
												)}
											</Col>
										);
									}}
								/>
								<Space height={24} />
								<Controller
									control={control}
									name={"password"}
									rules={{
										required: "Password is required",
										minLength: {
											value: 8,
											message: "Password is too short",
										},
										pattern: {
											value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?])[A-Za-z\d!@#$%^&*()_+\[\]{}|;:,.<>?]*$/,
											message: "Invalid password",
										},
									}}
									render={({ field: { onChange, value } }) => {
										return (
											<Col>
												<InputIcon
													iconLeft={
														<SolarLockPasswordBold
															width={sizeIcon}
															height={sizeIcon}
															style={{ marginRight: 12 }}
															color={neutral.getColor("100")}
														/>
													}
													iconRight={
														renderIconShowPassword[
															showPassword.toString() as "true" | "false"
														]
													}
													placeholder={"Password"}
													borderColor={errors.password ? primary.getColor("500") : undefined}
													borderColorFocus={
														errors.password ? primary.getColor("500") : undefined
													}
													value={value}
													onBlur={onBlurInput}
													secureTextEntry={!showPassword}
													onFocus={onFocusInput}
													onChange={element => {
														onChange(element.nativeEvent.text);
													}}
													onPressIconRight={() => setShowPassword(!showPassword)}
												/>
												{errors.password && (
													<Text style={{ color: primary.getColor("500") }}>
														{errors.password.message}
													</Text>
												)}
											</Col>
										);
									}}
								/>
								<Row style={[styles.rememberMeContainer]} flex={0}>
									<CheckBox
										checked={false}
										iconType={"material-community"}
										checkedIcon={"checkbox-marked"}
										uncheckedIcon={"checkbox-blank-outline"}
										checkedColor={primary.getColor("500")}
										uncheckedColor={neutral.getColor("100")}
										size={24}
										containerStyle={{
											backgroundColor: theme.background.getColor(),
											padding: 5,
										}}
									/>
									<Text style={[styles.rememberMeText, { color: theme.text_1.getColor() }]}>
										Remember me
									</Text>
								</Row>
							</>
						);
					}}
				/>
				<Col style={{ zIndex: -1 }}>
					<ButtonHasStatus title={"Register"} active={isValid} onPress={handleSubmit(onSubmit)} />
					<Col style={{ display: isFocusInput ? "none" : "flex" }}>
						<View style={[styles.otherMethodSignInContainer]}>
							<Divider width={1} color={otherMethodSignIn.getColor()} style={[styles.dividerStyle]} />
							<Text
								style={[
									styles.otherMethodSignIn,
									{
										backgroundColor: theme.background.getColor(),
									},
								]}
							>
								Or sign up with
							</Text>
						</View>
						<Row style={[styles.buttonOtherMethodSignIn]} flex={0}>
							<GoogleAuth />
							<View style={{ padding: 8 }} />
							<FacebookAuth />
						</Row>
						<Row style={[styles.askSignUpContainer]} flex={0}>
							<Text style={[styles.askSignUpText, { color: theme.text_1.getColor() }]}>
								Do have an account?
							</Text>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("LoginScreen");
								}}
							>
								<Text style={[styles.signUpText]}>Sign In</Text>
							</TouchableOpacity>
						</Row>
					</Col>
				</Col>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 78,
		justifyContent: "space-between",
		paddingHorizontal: 24,
	},
	titleContainer: {
		justifyContent: "center",
	},
	title: {
		...textStyle["30_bold_5%"],
	},
	itemSelected: {
		fontSize: 28,
	},
	inputPhoneNumberContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	sizeArrow: {
		width: 20,
		height: 20,
	},
	textDialCode: {
		...textStyle["16_regular"],
		marginHorizontal: 10,
	},
	rememberMeContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 34,
		marginBottom: 25,
	},
	rememberMeText: {
		...textStyle["16_regular"],
	},
	otherMethodSignInContainer: {
		alignItems: "center",
		position: "relative",
		marginBottom: 32,
		marginTop: 7,
	},
	otherMethodSignIn: {
		...textStyle["16_regular"],
		width: 120,
		textAlign: "center",
		color: otherMethodSignIn.getColor(),
	},
	dividerStyle: {
		position: "absolute",
		top: "50%",
		width: "100%",
	},
	askSignUpContainer: {
		justifyContent: "center",
		marginBottom: 45,
	},
	askSignUpText: {
		...textStyle["16_regular"],
		marginRight: 10,
	},
	signUpText: {
		...textStyle["16_semibold"],
		color: primary.getColor("500"),
	},
	buttonOtherMethodSignIn: {
		justifyContent: "center",
		marginBottom: 24,
	},
});

export default SignUpScreen;
