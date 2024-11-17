/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MainScreenStackParamList } from "../navigations/stack.type";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import textStyle from "../configs/styles/textStyle.config";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./mainSubScreens/home/HomeScreen";
import { gradient, neutral, white } from "../configs/colors/color-template.config";
import SolarHomeSmileLinear from "../../assets/images/icons/SolarHomeSmileLinear";
import SolarHomeSmileBold from "../../assets/images/icons/SolarHomeSmileBold";
import SolarClipboardListLinear from "../../assets/images/icons/SolarClipboardListLinear";
import SolarClipboardListBold from "../../assets/images/icons/SolarClipboardListBold";
import SolarHeartLinear from "../../assets/images/icons/SolarHeartLinear";
import SolarHeartBold from "../../assets/images/icons/SolarHeartBold";
import SolarBellLinear from "../../assets/images/icons/SolarBellLinear";
import SolarBellBold from "../../assets/images/icons/SolarBellBold";
import SolarUserCircleLinear from "../../assets/images/icons/SolarUserCircleLinear";
import SolarUserCircleBold from "../../assets/images/icons/SolarUserCircleBold";
import BottomNavigation from "../components/navigation/BottomNavigation";
import OrderScreen from "./mainSubScreens/order/OrderScreen";
import LikedScreen from "./mainSubScreens/liked/LikedScreen";
import NotificationScreen from "./mainSubScreens/notification/NotificationScreen";
import ProfileScreen from "./mainSubScreens/profile/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MainScreenStack = createStackNavigator<MainScreenStackParamList>();

function MainScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const navigation = useNavigation<NativeStackNavigationProp<MainScreenStackParamList>>();

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<BottomNavigation
				initialItem={0}
				position={"static"}
				bottom={15}
				sizeIcon={60}
				marginHorizontal={10}
				backgroundColor={theme.navigation.getColor()}
				backgroundIcon={theme.navigation.getColor()}
				backgroundIconActive={gradient.getColor()}
				colorTitle={gradient.getColor()}
				boxShadow={{
					shadowColor: "#0D0A2C",
					shadowOffset: { width: -50, height: 5 },
					shadowOpacity: 0.2,
					shadowRadius: 10,
					elevation: 10,
				}}
				items={[
					{
						icon: (
							<SolarHomeSmileLinear
								strokeWidth={1.5}
								color={neutral.getColor("100")}
								height={30}
								width={30}
							/>
						),
						iconActive: <SolarHomeSmileBold color={white.getColor()} height={30} width={30} />,
						title: "Home",
						onPress: () => {
							navigation.replace("HomeScreen");
						},
					},
					{
						icon: (
							<SolarClipboardListLinear
								strokeWidth={1.5}
								color={neutral.getColor("100")}
								height={30}
								width={30}
							/>
						),
						iconActive: <SolarClipboardListBold color={white.getColor()} height={30} width={30} />,
						title: "Orders",
						onPress: () => {
							navigation.replace("OrderScreen");
						},
					},
					{
						icon: (
							<SolarHeartLinear strokeWidth={2} color={neutral.getColor("100")} height={30} width={30} />
						),
						iconActive: <SolarHeartBold color={white.getColor()} height={30} width={30} />,
						title: "Liked",
						onPress: () => {
							navigation.replace("LikedScreen");
						},
					},
					{
						icon: (
							<SolarBellLinear strokeWidth={1.5} color={neutral.getColor("100")} height={30} width={30} />
						),
						iconActive: <SolarBellBold color={white.getColor()} height={30} width={30} />,
						title: "Notification",
						onPress: () => {
							navigation.replace("NotificationScreen");
						},
					},
					{
						icon: (
							<SolarUserCircleLinear
								strokeWidth={1.5}
								color={neutral.getColor("100")}
								height={30}
								width={30}
							/>
						),
						iconActive: <SolarUserCircleBold color={white.getColor()} height={30} width={30} />,
						title: "Profile",
						onPress: () => {
							navigation.replace("ProfileScreen");
						},
					},
				]}
			>
				<MainScreenStack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={"HomeScreen"}
				>
					<MainScreenStack.Screen name="HomeScreen" component={HomeScreen} />
					<MainScreenStack.Screen name="OrderScreen" component={OrderScreen} />
					<MainScreenStack.Screen name="LikedScreen" component={LikedScreen} />
					<MainScreenStack.Screen name="NotificationScreen" component={NotificationScreen} />
					<MainScreenStack.Screen name="ProfileScreen" component={ProfileScreen} />
				</MainScreenStack.Navigator>
			</BottomNavigation>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	header: {
		marginBottom: 32,
		marginTop: 72,
		paddingHorizontal: 32,
	},
	titleHeader: {
		...textStyle["30_bold_5%"],
	},
});

export default MainScreen;
