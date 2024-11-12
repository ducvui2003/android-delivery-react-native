import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../configs/redux/store.config";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { MainScreenStackParamList, RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Row from "../../../components/custom/Row";
import NumberValue from "../../../configs/value/number.value";
import Col from "../../../components/custom/Col";
import textStyle from "../../../configs/styles/textStyle.config";
import { primary, white } from "../../../configs/colors/color-template.config";
import ProfileOption from "../../../components/profile/ProfileOption";
import { logout } from "../../../hooks/redux/auth.slice";
import { Switch } from "@rneui/base";
import { setTheme } from "../../../hooks/redux/theme.slice";
import SolarOption from "../../../../assets/images/icons/SolarOption";
import ProfileHasNotUser from "../../../fragments/profile/ProfileHasNotUser";
import ProfileHasUser from "../../../fragments/profile/ProfileHasUser";
import ChangeProfile from "../../../types/changeProfile";
import ProfilePopUp from "../../../fragments/profile/ProfilePopUp";
import ProfileModel from "../../../fragments/profile/ProfileModel";
import Space from "../../../components/custom/Space";

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
type ProfileScreenProps = {
	route: RouteProp<MainScreenStackParamList, "ProfileScreen">;
	navigation: NativeStackNavigationProp<MainScreenStackParamList>;
};

function ProfileScreen({ navigation }: ProfileScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const textTheme = useSelector((state: RootState) => state.themeState.textTheme);
	const user = useSelector((state: RootState) => state.authState.user);
	const [isLogoutActive, setLogoutActive] = useState(true);
	const appDispatch = useAppDispatch();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	//press button logout
	const handleLogoutPress = () => {
		setLogoutActive(!isLogoutActive);
		appDispatch(logout()).then(() => {
			setShowModal(false);
			navigation.replace("HomeScreen");
		});
	};


	//press button option
	const handleOptionPress = () => {};

	//press button save change profile
	const handlePressSaveChangeProfile = async (data: ChangeProfile) => {};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title="Profile"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				styleIconRight={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				onPressBack={handleBackPress}
				iconRight={<SolarOption width={30} height={30} color={theme.text_1.getColor()} />}
				onPressIconRight={() => handleOptionPress}
			/>
			<ScrollView>
				<Col flex={0} style={styles.content}>
					{user == null ? (
						<ProfileHasNotUser onPress={() => nav.replace("LoginScreen")} />
					) : (
						<ProfileHasUser onChangeProfile={() => setShowPopUp(true)} logout={() => setShowModal(true)} />
					)}
					<ProfileOption />
				</Col>
				<Space height={50} />
			</ScrollView>
			<ProfileModel onYes={handleLogoutPress} onShowed={setShowModal} showed={showModal} />
			<ProfilePopUp onSave={handlePressSaveChangeProfile} onShowed={setShowPopUp} showed={showPopUp} />
		</SafeAreaView>
	);
}

export default ProfileScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		justifyContent: "center",
	},
	buttonModal: {
		marginBottom: 0,
		width: "47%",
	},
});
