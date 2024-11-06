/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React, {ReactNode, useState} from "react";
import {
	Keyboard,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import textStyle from "../configs/styles/textStyle.config";
import {gradient, neutral, otherMethodSignIn, primary} from "../configs/colors/color-template.config";
import {CheckBox, Divider} from "@rneui/themed";
import Row from "../components/custom/Row";
import Col from "../components/custom/Col";
import GoogleAuth from "../components/auth/GoogleAuth";
import FacebookAuth from "../components/auth/FacebookAuth";
import {Controller, useForm} from "react-hook-form";
import LoginFormType from "../types/loginForm.type";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import InputPhoneNumber from "../components/input/InputPhoneNumber";
import GradientText from "../components/gradientText/GradientText";
import {FlatList} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigations/stack.type";
import InputIcon from "../components/input/InputIcon";
import SolarLockPasswordBold from "../../assets/images/icons/SolarLockPasswordBold";
import Space from "../components/custom/Space";
import CountryPhoneNumberType from "../types/countryPhoneNumber.type";
import SolarEyeBold from "../../assets/images/icons/SolarEyeBold";
import SolarEyeClosedBold from "../../assets/images/icons/SolarEyeClosedBold";
import NumberValue from "../configs/value/number.value";
import {loginApi} from "../services/auth.service";
import {login as loginRedux} from "../hooks/redux/auth.slice";

function LoginScreen() {
	const [checked, setChecked] = React.useState(false);
	const [showed, setShowed] = React.useState(false);
	const [isFocusInput, setIsFocusInput] = React.useState(false);
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "LoginScreen">>();
	const [countryPhoneNumber, setCountryPhoneNumber] = useState<CountryPhoneNumberType>();
	const [showPassword, setShowPassword] = useState(false);
	const sizeIcon = 25;
	const dispatch = useDispatch();

	const {
		control,
		setError,
		handleSubmit,
		formState: {isValid},
	} = useForm<LoginFormType>({mode: "all"});

	const onFocusInput = () => {
		setIsFocusInput(true);
		setShowed(false);
	};

	const onBlurInput = () => {
		setIsFocusInput(false);
	};

	const onOtherPress = () => {
		setShowed(false);
		if (Platform.OS === "web") return;
		Keyboard.dismiss();
	};

	const onSubmit = (data: LoginFormType) => {
		if (!isValid || !countryPhoneNumber) return;
		data.region = countryPhoneNumber?.code;
		loginApi(data).then(user => {
			dispatch(loginRedux(user));
			navigation.navigate("SettingPinSecurityScreen");
		}).catch();
	};

	const renderIconShowPassword: Record<"true" | "false", ReactNode> = {
		true: (
			<SolarEyeBold
				width={sizeIcon}
				height={sizeIcon}
				style={{marginRight: 12}}
				color={neutral.getColor("100")}
			/>
		),
		false: (
			<SolarEyeClosedBold
				width={sizeIcon}
				height={sizeIcon}
				style={{marginRight: 12}}
				color={neutral.getColor("100")}
			/>
		),
	};

	return (
		<TouchableWithoutFeedback onPress={onOtherPress}>
			<SafeAreaView style={[styles.container, {backgroundColor: theme.background.getColor()}]}>
				<FlatList
					data={[1]}
					renderItem={() => {
						return (
							<>
								<GradientText
									style={{marginBottom: 32, alignItems: "center"}}
									textStyle={styles.title}
									text={"Login"}
									gradientColors={gradient.getColor()}
								/>
								<Controller
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
									render={({field: {onChange, value}, fieldState: {error}}) => {
										return (
											<Col>
												<InputPhoneNumber
													showed={showed}
													onShow={setShowed}
													placeholder={"00 000 000"}
													value={value}
													borderColor={error ? "red" : undefined}
													onValidation={isValid => {
														if (isValid) return;
														setError("phoneNumber", {
															type: "validate",
															message: "Invalid phone number",
														});
													}}
													onCountryPhoneNumberSelected={setCountryPhoneNumber}
													onBlur={onBlurInput}
													onFocus={onFocusInput}
													onChange={element => {
														onChange(element.nativeEvent.text);
													}}
												/>
												{error && (
													<Text style={{color: "red", zIndex: -1}}>{error.message}</Text>
												)}
											</Col>
										);
									}}
								/>
								<Space height={24}/>
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
									render={({field: {onChange, value}, fieldState: {error}}) => {
										return (
											<Col style={{zIndex: -1}}>
												<InputIcon
													iconLeft={
														<SolarLockPasswordBold
															width={sizeIcon}
															height={sizeIcon}
															style={{marginRight: 12}}
															color={neutral.getColor("100")}
														/>
													}
													iconRight={
														renderIconShowPassword[
															showPassword.toString() as "true" | "false"
															]
													}
													placeholder={"Password"}
													borderColor={error ? primary.getColor("500") : undefined}
													value={value}
													onBlur={onBlurInput}
													onFocus={onFocusInput}
													onChange={element => {
														onChange(element.nativeEvent.text);
													}}
													secureTextEntry={!showPassword}
													onPressIconRight={() => setShowPassword(!showPassword)}
												/>
												{error && (
													<Text style={{color: primary.getColor("500")}}>
														{error.message}
													</Text>
												)}
											</Col>
										);
									}}
								/>
								<Row style={[styles.rememberMeContainer]}>
									<CheckBox
										checked={checked}
										onPress={() => setChecked(!checked)}
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
									<Text style={[styles.rememberMeText, {color: theme.text_1.getColor()}]}>
										Remember me
									</Text>
								</Row>
							</>
						);
					}}
				/>
				<Col style={{zIndex: -1}}>
					<ButtonHasStatus title={"Sign in"} active={isValid} onPress={handleSubmit(onSubmit)}/>
					<Col style={{display: isFocusInput ? "none" : "flex"}}>
						<View style={[styles.otherMethodSignInContainer]}>
							<Divider width={1} color={otherMethodSignIn.getColor()} style={[styles.dividerStyle]}/>
							<Text
								style={[
									styles.otherMethodSignIn,
									{
										backgroundColor: theme.background.getColor(),
									},
								]}
							>
								Or sign in with
							</Text>
						</View>
						<Row style={[styles.buttonOtherMethodSignIn]} flex={0}>
							<GoogleAuth/>
							<View style={{padding: 8}}/>
							<FacebookAuth/>
						</Row>
						<Row style={[styles.askSignUpContainer]} flex={0}>
							<Text style={[styles.askSignUpText, {color: theme.text_1.getColor()}]}>
								Don’t have an account?
							</Text>
							<TouchableOpacity
								onPress={() => {
									navigation.replace("SignUpScreen");
								}}
							>
								<Text style={[styles.signUpText]}>Sign Up</Text>
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
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
	},
	titleContainer: {
		marginBottom: 32,
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

export default LoginScreen;
