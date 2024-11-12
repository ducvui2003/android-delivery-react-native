import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Row from "../custom/Row";
import { useSelector } from "react-redux";
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

const ProfileOptionData= (themeColor: string) => [
	{
		icon: <SolarMapPointLinear color={themeColor}/>,
		name: "My Locations",
	},
	{
		icon: <SolarTicketSaleOutline color={themeColor}/>,
		name: "My Promotions",
	},
	{
		icon: <SolarWalletOutline color={themeColor}/>,
		name: "Payment Methods",
	},
	{
		icon: <SolarChatDotsLinear color={themeColor}/>,
		name: "Messages",
	},
	{
		icon: <SolarUsersGroupTwoRoundedLinear color={themeColor}/>,
		name: "Invite Friends",
	},
	{
		icon: <SolarShieldUserOutline color={themeColor}/>,
		name: "Security",
	},
	{
		icon: <FluentQuestionCircle48Regular color={themeColor}/>,
		name: "Help Center",
	},
];

function ProfileOption() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const profileOptions = ProfileOptionData(theme.text_1.getColor());

	return (
		<View style={{ flex: 0}}>
			<FlatList
				data={profileOptions}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<TouchableOpacity>
						<Row style={styles.row}>
							<Row style={styles.container}>
								<Row style={{ gap: 20 }}>
									<Text>{item.icon}</Text>
									<Text style={[styles.option, {color: theme.text_1.getColor()}]}>{item.name}</Text>
								</Row>
								<View>
									<SolarAltArrowRightOutline color={theme.text_1.getColor()}/>
								</View>
							</Row>
						</Row>
					</TouchableOpacity>
				)}
				ListFooterComponent={
					<View style={styles.footerBorder} />
				}
			/>
		</View>
	);
}

export default ProfileOption;
const styles = StyleSheet.create({
	container: {
		flex: 0,
		gap: 5,
		width: "100%",
		position: "relative",
		paddingVertical: 15,
	},
	row: {
		gap: 10,
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
