import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SolarOption from "../../../../assets/images/icons/SolarOption";
import Col from "../../../components/custom/Col";
import Space from "../../../components/custom/Space";
import { Header } from "../../../components/header/Header";
import { BottomNavigationContext } from "../../../components/navigation/BottomNavigation";
import ProfileOption from "../../../components/profile/ProfileOption";
import { RootState, useAppDispatch } from "../../../configs/redux/store.config";
import spacing from "../../../configs/styles/space.config";
import NumberValue from "../../../configs/value/number.value";
import ProfileHasNotUser from "../../../fragments/profile/ProfileHasNotUser";
import ProfileHasUser from "../../../fragments/profile/ProfileHasUser";
import ChangeProfile from "../../../types/changeProfile";
import ProfilePopUp from "../../../fragments/profile/ProfilePopUp";
import { logout } from "../../../hooks/redux/auth.slice";
import { hiddenModalNotify, showModalNotify } from "../../../hooks/redux/modal.slice";
import { MainScreenStackParamList, RootStackParamList } from "../../../navigations/stack.type";
import ChangeProfile from "../../../types/changeProfile";
import ProfilePopUpChangePassword from "../../../fragments/profile/ProfilePopUpChangePassword";
import { updateProfile } from "../../../hooks/redux/profile.slice";

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
	const user = useSelector((state: RootState) => state.authState.user);
	const appDispatch = useAppDispatch();
	const bottomNavigation = useContext(BottomNavigationContext);

	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [showPopUpChangePassword, setShowPopUpChangePassword] = useState<boolean>(false);
	const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	//press button logout
	const handleLogoutPress = () => {
		appDispatch(logout())
			.then(_ => {
				appDispatch(hiddenModalNotify());
				bottomNavigation?.setMenu(0);
				navigation.replace("HomeScreen");
			})
			.catch(error => {
				console.error(error);
			});
		return true;
	};

	const onLogout = () => {
		appDispatch(
			showModalNotify({
				title: "Logout",
				body: "Are you sure you want to log out?",
				onConfirm: handleLogoutPress,
				showCancelButton: true,
				showConfirmButton: true,
			})
		);
	};

	//press button option
	const handleOptionPress = () => {};

	//press button save change profile
	const handlePressSaveChangeProfile = async (data: ChangeProfile) => {
		await appDispatch(updateProfile(data));
		setShowPopUp(false);
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title="Profile"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				styleIconRight={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				iconRight={<SolarOption width={30} height={30} color={theme.text_1.getColor()} />}
				onPressIconRight={() => handleOptionPress}
				showIconBack={false}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Col flex={0} style={styles.content}>
					{user == null ? (
						<ProfileHasNotUser onPress={() => nav.push("LoginScreen", { back: true })} />
					) : (
						<ProfileHasUser onChangeProfile={() => {}} logout={onLogout} />
					)}
					<ProfileOption onShowPopUpChangePassword={setShowPopUpChangePassword} />

				</Col>
				<Space height={spacing["spaced-7"]} />
			</ScrollView>
			<ProfilePopUp
				numberPhone={(user?.phoneNumber ?? "")
					.replace((user?.countryCode ?? 0).toString(), "0")
					.replace("+", "")}
				fullName={user?.fullName}
				email={user?.email}
				onSave={handlePressSaveChangeProfile}
				onShowed={setShowPopUp}
				showed={showPopUp}
			/>
			<ProfilePopUpChangePassword
				showed={showPopUpChangePassword}
				onShowed={(value) => setShowPopUpChangePassword(value)}
			/>

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
