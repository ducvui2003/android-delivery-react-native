import React, { cloneElement, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Row from "../custom/Row";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import themes from "../../configs/themes/theme.config";
import { SolarTicketSaleOutline } from "../../../assets/images/icons/TicketSaleOutline";
import textStyle from "../../configs/styles/textStyle.config";
import { SolarAltArrowRightOutline } from "../../../assets/images/icons/SolarAltArrowRightOutline";
import { FlatList } from "react-native-gesture-handler";
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

const ProfileOptionData = [
	{
		icon: <SolarMapPointLinear />,
		name: "My Locations",
	},
	{
		icon: <SolarTicketSaleOutline />,
		name: "My Promotions",
	},
	{
		icon: <SolarWalletOutline />,
		name: "Payment Methods",
	},
	{
		icon: <SolarChatDotsLinear />,
		name: "Messages",
	},
	{
		icon: <SolarUsersGroupTwoRoundedLinear />,
		name: "Invite Friends",
	},
	{
		icon: <SolarShieldUserOutline />,
		name: "Security",
	},
	{
		icon: <FluentQuestionCircle48Regular />,
		name: "Help Center",
	},
];

function ProfileOption() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const textTheme = useSelector((state: RootState) => state.themeState.textTheme);
	const [isDark, setDark] = useState(textTheme === "dark");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTheme(isDark ? "dark" : "light"));
	}, [isDark]);

	return (
		<Col>
			<FlatList
				data={ProfileOptionData}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<TouchableOpacity style={[styles.container]}>
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
				)}
				ListFooterComponent={<View style={styles.footerBorder} />}
			/>

			<Space height={20}/>

			<Row flex={0} style={[{ paddingVertical: 10, justifyContent: "space-between" }]}>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>Dark Mode</Text>
				<Switch
					trackColor={{ false: theme.profile.switch.getColor(), true: primary.getColor("500") }}
					thumbColor={white.getColor()}
					ios_backgroundColor="#3e3e3e"
					onValueChange={setDark}
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
