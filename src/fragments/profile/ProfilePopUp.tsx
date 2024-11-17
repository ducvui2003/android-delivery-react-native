/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:44 PM - 12/11/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import Col from "../../components/custom/Col";
import { StyleSheet, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { Controller, useForm } from "react-hook-form";
import InputPhoneNumber from "../../components/input/InputPhoneNumber";
import Space from "../../components/custom/Space";
import InputIcon from "../../components/input/InputIcon";
import SolarLetterBold from "../../../assets/images/icons/SolarLetterBold";
import { neutral, primary } from "../../configs/colors/color-template.config";
import SolarUserBold from "../../../assets/images/icons/SolarUserBold";
import Row from "../../components/custom/Row";
import ButtonHasStatus from "../../components/custom/ButtonHasStatus";
import PopUp from "../../components/popUp/PopUp";
import ChangeProfile from "../../types/changeProfile";
import CountryPhoneNumberType from "../../types/countryPhoneNumber.type";
import NumberValue from "../../configs/value/number.value";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function ProfilePopUp({
	onSave,
	showed = false,
	onShowed,
}: {
	onSave: (data: ChangeProfile) => void;
	onShowed?: (value: boolean) => void;
	showed?: boolean;
}) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const sizeIcon = 25;
	const {
		control,
		setError,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<ChangeProfile>({ mode: "all" });
	const [countryPhoneNumber, setCountryPhoneNumber] = useState<CountryPhoneNumberType>();

	useEffect(() => {
		setShowPopUp(showed);
	}, [showed]);

	useEffect(() => {
		onShowed?.(showPopUp);
	}, [showPopUp]);

	return (
		<PopUp
			height={0.6}
			onEndHide={() => setShowPopUp(false)}
			body={
				<Col style={[{ justifyContent: "center" }]}>
					<Text
						style={[
							{
								...textStyle["18_semibold"],
								color: theme.text_1.getColor(),
								textAlign: "center",
								paddingVertical: 15,
							},
						]}
					>
						Change User Information
					</Text>

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
						render={({ field: { onChange, value }, fieldState: { error } }) => {
							return (
								<Col>
									<InputPhoneNumber
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
										onChange={element => {
											onChange(element.nativeEvent.text);
										}}
									/>
									{error && <Text style={{ color: "red", zIndex: -1 }}>{error.message}</Text>}
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
										borderColorFocus={errors.email ? primary.getColor("500") : undefined}
										value={value}
										onChange={element => {
											onChange(element.nativeEvent.text);
										}}
									/>
									{errors.email && (
										<Text style={{ color: primary.getColor("500") }}>{errors.email.message}</Text>
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
										borderColorFocus={errors.fullName ? primary.getColor("500") : undefined}
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

					<Row flex={0} style={[{ justifyContent: "space-between", width: "100%", marginTop: 30 }]}>
						<ButtonHasStatus
							styleButton={styles.buttonModal}
							styleButtonActive={{
								backgroundColor: theme.add_new_location.background.getColor(),
							}}
							styleText={{
								color: theme.text_1.getColor(),
								...textStyle["18_regular"],
							}}
							title={"Cancel"}
							active={true}
							onPress={() => setShowPopUp(false)}
						/>
						<ButtonHasStatus
							styleButton={styles.buttonModal}
							title={"Save"}
							active={true}
							onPress={handleSubmit(onSave)}
						/>
					</Row>
				</Col>
			}
			showed={showPopUp}
		/>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		justifyContent: "center",
	},
	buttonModal: {
		marginBottom: 0,
		width: "47%",
	},
});

export default ProfilePopUp;
