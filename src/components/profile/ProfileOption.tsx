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
		icon: <SolarShieldUserOutline/>,
		name: "Security",
	},
	{
		icon: <FluentQuestionCircle48Regular/>,
		name: "Help Center",
	},
];

function ProfileOption() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	return (
		<View style={{ flex: 0}}>
			<FlatList
				data={ProfileOptionData}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<TouchableOpacity>
						<Row style={styles.row}>
							<Row style={styles.container}>
								<Row style={{ gap: 20 }}>
									<Text style={{ color: theme.text_1.getColor() }}>{item.icon}</Text>
									<Text style={styles.option}>{item.name}</Text>
								</Row>
								<View>
									<SolarAltArrowRightOutline />
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
