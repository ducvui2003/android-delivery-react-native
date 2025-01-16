import React, { cloneElement, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Row from "../custom/Row";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../configs/redux/store.config";
import themes from "../../configs/themes/theme.config";
import { SolarTicketSaleOutline } from "../../../assets/images/icons/TicketSaleOutline";
import textStyle from "../../configs/styles/textStyle.config";
import { SolarAltArrowRightOutline } from "../../../assets/images/icons/SolarAltArrowRightOutline";
import SolarMapPointLinear from "../../../assets/images/icons/SolarMapPointLinear";
import { SolarWalletOutline } from "../../../assets/images/icons/SolarWalletOutline";
import SolarChatDotsLinear from "../../../assets/images/icons/SolarChatDotsLinear";
import { SolarUsersGroupTwoRoundedLinear } from "../../../assets/images/icons/SolarUserGroupTwoRoundedLinear";
import { SolarShieldUserOutline } from "../../../assets/images/icons/SolarShieldUserOutline";
import { FluentQuestionCircle48Regular } from "../../../assets/images/icons/FluentQuestionCircle48Regular";
import { Switch } from "@rneui/base";
import { primary, white } from "../../configs/colors/color-template.config";
import Col from "../custom/Col";
import { setTheme } from "../../hooks/redux/theme.slice";
import Space from "../custom/Space";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Role } from "../auth/const/authenticationConst";
import { SonarBox } from "../../../assets/images/icons/SonarBox";
import MaterialFastFood from "../../../assets/images/icons/MaterialFastFood";

const ProfileOptionData = [
	{
		icon: <MaterialFastFood />,
		name: "Manager Product",
		role: ["ADMIN"],
	},
	{
		icon: <SonarBox />,
		name: "Manage Order",
		role: ["ADMIN"],
	},
	{
		icon: <SolarMapPointLinear />,
		name: "Change Password",
		role: ["USER", "ADMIN"],
	},
	{
		icon: <SolarMapPointLinear />,
		name: "My Locations",
		role: ["USER", "ADMIN"],
	},
	{
		icon: <SolarTicketSaleOutline />,
		name: "My Promotions",
		role: ["USER", "ADMIN"],
	},
	{
		icon: <SolarWalletOutline />,
		name: "Payment Methods",
		role: ["USER", "ADMIN"],
	},
	{
		icon: <SolarChatDotsLinear />,
		name: "Messages",
		role: ["USER", "ADMIN"],
	},
	{
		icon: <SolarUsersGroupTwoRoundedLinear />,
		name: "Invite Friends",
	},
	{
		icon: <SolarShieldUserOutline />,
		name: "Security",
		role: ["USER", "ADMIN"],
	},
	{
		icon: <FluentQuestionCircle48Regular />,
		name: "Help Center",
	},
];

type ProfileOptionProps = {
	navigateManagerOrderScreen: () => void;
	navigateManagerProductScreen: () => void;
	onShowPopUpChangePassword: (show: boolean) => void;
};

function ProfileOption({
	navigateManagerOrderScreen,
	navigateManagerProductScreen,
	onShowPopUpChangePassword,
}: ProfileOptionProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const textTheme = useSelector((state: RootState) => state.themeState.textTheme);
	const [isDark, setDark] = useState(textTheme === "dark");
	const dispatch = useAppDispatch();

	useEffect(() => {
		setDark(textTheme === "dark");
	}, [textTheme]);

	return (
		<Col>
			{ProfileOptionData.map((item, index) => {
				return (
					<ProtectedRoute key={index} allowRoles={item.role ? (item.role as Role[]) : undefined}>
						<TouchableOpacity
							style={[styles.container]}
							key={index}
							onPress={() => {
								if (item.name === "Change Password") {
									onShowPopUpChangePassword(true);
								}
								if (item.name === "Manager Product") {
									navigateManagerProductScreen();
								}
								if (item.name === "Manage Order") {
									navigateManagerOrderScreen();
								}
							}}
						>
							<Row style={{ gap: 20 }}>
								{cloneElement(item.icon, {
									color: theme.text_1.getColor(),
								})}
								<Text style={[styles.option, { color: theme.text_1.getColor() }]}>{item.name}</Text>
							</Row>
							<View>
								<SolarAltArrowRightOutline color={theme.text_1.getColor()} />
							</View>
						</TouchableOpacity>
					</ProtectedRoute>
				);
			})}
			<View style={styles.footerBorder} />

			<Space height={20} />

			<Row flex={0} style={[{ paddingVertical: 10, justifyContent: "space-between" }]}>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>Dark Mode</Text>
				<Switch
					trackColor={{ false: theme.profile.switch.getColor(), true: primary.getColor("500") }}
					thumbColor={white.getColor()}
					ios_backgroundColor="#3e3e3e"
					onValueChange={() => {
						dispatch(setTheme(isDark ? "light" : "dark"));
					}}
					value={isDark}
				/>
			</Row>
			<TouchableOpacity style={[styles.container, { justifyContent: "space-between", paddingVertical: 10 }]}>
				<Text style={[styles.option, { color: theme.text_1.getColor() }]}>Term of Service</Text>
				<SolarAltArrowRightOutline color={theme.text_1.getColor()} />
			</TouchableOpacity>
			<TouchableOpacity style={[styles.container, { justifyContent: "space-between", paddingVertical: 10 }]}>
				<Text style={[styles.option, { color: theme.text_1.getColor() }]}>Privacy Policy</Text>
				<SolarAltArrowRightOutline color={theme.text_1.getColor()} />
			</TouchableOpacity>
			<TouchableOpacity style={[styles.container, { justifyContent: "space-between", paddingVertical: 10 }]}>
				<Text style={[styles.option, { color: theme.text_1.getColor() }]}>About App</Text>
				<SolarAltArrowRightOutline color={theme.text_1.getColor()} />
			</TouchableOpacity>
		</Col>
	);
}

export default ProfileOption;
const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: "100%",
		position: "relative",
		paddingVertical: 15,
		flexDirection: "row",
	},
	option: {
		...textStyle["16_regular"],
		color: themes.light.text_1.getColor(),
	},
	footerBorder: {
		height: 1,
		backgroundColor: "#D3D3D3",
		marginTop: 10,
	},
});
