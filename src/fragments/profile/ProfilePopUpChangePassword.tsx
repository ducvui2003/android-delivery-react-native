import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Col from "../../components/custom/Col";
import textStyle from "../../configs/styles/textStyle.config";
import { Controller, useForm } from "react-hook-form";
import InputIcon from "../../components/input/InputIcon";
import Space from "../../components/custom/Space";
import { neutral, primary } from "../../configs/colors/color-template.config";
import Row from "../../components/custom/Row";
import ButtonHasStatus from "../../components/custom/ButtonHasStatus";
import PopUp from "../../components/popUp/PopUp";
import NumberValue from "../../configs/value/number.value";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { ChangePasswordType } from "../../types/changePassword.type";
import axiosInstance from "../../configs/axios/axios.config";
import SolarLockPasswordBold from "../../../assets/images/icons/SolarLockPasswordBold";
import SolarEyeBold from "../../../assets/images/icons/SolarEyeBold";
import SolarEyeClosedBold from "../../../assets/images/icons/SolarEyeClosedBold";

function ProfilePopUpChangePassword({
	showed = false,
	onShowed,
}: {
	onShowed?: (value: boolean) => void;
	showed?: boolean;
}) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const sizeIcon = 25;

	const {
		control,
		setError,
		handleSubmit,
		watch,
		formState: { isValid, errors },
	} = useForm<ChangePasswordType>({
		mode: "all",
	});

	useEffect(() => {
		if (onShowed) {
			onShowed(showPopUp);
		}
	}, [showPopUp]);

	useEffect(() => {
		setShowPopUp(showed);
	}, [showed]);

	const newPassword = watch("newPassword");

	const onSubmit = async (data: ChangePasswordType) => {
		try {
			const response = await axiosInstance.put("/user/change-password", data);

			if (response.status === 200) {
				console.log("Password changed successfully");
				setShowPopUp(false);
			}
		} catch (error) {
			console.error("Error changing password", error);
		}
	};

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
						Change Password
					</Text>
					<Controller
						control={control}
						name={"currentPassword"}
						rules={{
							required: "New password is required",
						}}
						render={({ field: { onChange, value } }) => (
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
									secureTextEntry={!showCurrentPassword}
									iconRight={
										<TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
											{showCurrentPassword ? (
												<SolarEyeBold
													width={sizeIcon}
													height={sizeIcon}
													style={{ marginRight: 12 }}
													color={neutral.getColor("100")}
												/>
											) : (
												<SolarEyeClosedBold
													width={sizeIcon}
													height={sizeIcon}
													style={{ marginRight: 12 }}
													color={neutral.getColor("100")}
												/>
											)}
										</TouchableOpacity>
									}
									placeholder={"Current Password"}
									borderColor={errors.currentPassword ? primary.getColor("500") : undefined}
									borderColorFocus={errors.currentPassword ? primary.getColor("500") : undefined}
									value={value}
									onChange={element => {
										onChange(element.nativeEvent.text);
									}}
								/>
								{errors.currentPassword && (
									<Text style={{ color: primary.getColor("500") }}>
										{errors.currentPassword.message}
									</Text>
								)}
							</Col>
						)}
					/>

					<Space height={24} />

					<Controller
						control={control}
						name={"newPassword"}
						rules={{
							required: "New password is required",
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
								message:
									"Password must contain 8-20 characters, including uppercase, lowercase, number, and special character",
							},
						}}
						render={({ field: { onChange, value } }) => (
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
									secureTextEntry={!showNewPassword}
									iconRight={
										<TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
											{showNewPassword ? (
												<SolarEyeBold
													width={sizeIcon}
													height={sizeIcon}
													style={{ marginRight: 12 }}
													color={neutral.getColor("100")}
												/>
											) : (
												<SolarEyeClosedBold
													width={sizeIcon}
													height={sizeIcon}
													style={{ marginRight: 12 }}
													color={neutral.getColor("100")}
												/>
											)}
										</TouchableOpacity>
									}
									placeholder={"New Password"}
									borderColor={errors.newPassword ? primary.getColor("500") : undefined}
									borderColorFocus={errors.newPassword ? primary.getColor("500") : undefined}
									value={value}
									onChange={element => {
										onChange(element.nativeEvent.text);
									}}
								/>
								{errors.newPassword && (
									<Text style={{ color: primary.getColor("500") }}>{errors.newPassword.message}</Text>
								)}
							</Col>
						)}
					/>

					<Space height={24} />

					<Controller
						control={control}
						name={"confirmPassword"}
						rules={{
							required: "Confirm password is required",
							validate: value => value === newPassword || "Confirm password does not match new password",
						}}
						render={({ field: { onChange, value } }) => (
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
									secureTextEntry={!showConfirmPassword}
									iconRight={
										<TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
											{showConfirmPassword ? (
												<SolarEyeBold
													width={sizeIcon}
													height={sizeIcon}
													style={{ marginRight: 12 }}
													color={neutral.getColor("100")}
												/>
											) : (
												<SolarEyeClosedBold
													width={sizeIcon}
													height={sizeIcon}
													style={{ marginRight: 12 }}
													color={neutral.getColor("100")}
												/>
											)}
										</TouchableOpacity>
									}
									placeholder={"Confirm Password"}
									value={value}
									borderColor={errors.confirmPassword ? primary.getColor("500") : undefined}
									borderColorFocus={errors.confirmPassword ? primary.getColor("500") : undefined}
									onChange={element => {
										onChange(element.nativeEvent.text);
									}}
								/>
								{errors.confirmPassword && (
									<Text style={{ color: primary.getColor("500") }}>
										{errors.confirmPassword.message}
									</Text>
								)}
							</Col>
						)}
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
							onPress={handleSubmit(onSubmit)}
						/>
					</Row>
				</Col>
			}
			showed={showPopUp}
		/>
	);
}

export default ProfilePopUpChangePassword;

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
