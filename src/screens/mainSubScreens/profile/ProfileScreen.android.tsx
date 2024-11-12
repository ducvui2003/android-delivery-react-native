import { Image, Keyboard, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useCallback, useState } from "react";
import { Header } from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { RouteProp } from "@react-navigation/native";
import { MainScreenStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Row from "../../../components/custom/Row";
import NumberValue from "../../../configs/value/number.value";
import Col from "../../../components/custom/Col";
import textStyle from "../../../configs/styles/textStyle.config";
import { neutral, primary, white } from "../../../configs/colors/color-template.config";
import { IRoundPhone } from "../../../../assets/images/icons/IRoundPhone";
import { MaterialSymbolsMail } from "../../../../assets/images/icons/MaterialSymbolsMail";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";
import { SolarLogout3Linear } from "../../../../assets/images/icons/SolarLogout3Linear";
import ProfileOption from "../../../components/profile/ProfileOption";
import { setTheme, toggleDarkMode } from "../../../hooks/redux/theme.slice";
import { NameTheme, ThemeType } from "../../../types/theme.type";
import SolarMenuDotsLinear from "../../../../assets/images/icons/SolarMenuDotLinear";

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
	const [isLogoutActive, setLogoutActive] = useState(true);
	const styles = makeStyled(theme);
	const isEnabled = useSelector((state: RootState) => state.themeState.isDarkModeEnabled);
	const dispatch = useDispatch();
	const [isLocalEnabled, setIsLocalEnabled] = useState(isEnabled);

	const toggleSwitch = () => {
		setIsLocalEnabled(prev => !prev);
		const action: NameTheme = isEnabled ? "light" : "dark";
		dispatch(setTheme(action));
		dispatch(toggleDarkMode());
	};

	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	const handleLogoutPress = () => {
		setLogoutActive(!isLogoutActive);
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor(), flex: 1 }]}>
			<Header
				title="Profile"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				onPressBack={handleBackPress}
				iconRight={
					<View style={styles.styleBackgroundIconRight}>
						<SolarMenuDotsLinear color={theme.text_1.getColor()}/>
					</View>
				}

			/>
			<Col flex={0} style={styles.content}>
				<Row flex={0} style={styles.infoUser}>
					<Image
						source={{ uri: "https://i.pinimg.com/originals/5c/fc/32/5cfc32131a83bbe03da98c55b3dc02fe.jpg" }}
						style={styles.circularImage}
					/>
					<Col flex={0} style={styles.infoBasic}>
						<Text style={[styles.fullName, { color: primary.getColor("500") }]}>Nguyễn Thanh Bình</Text>
						<Row>
							<IRoundPhone width={14} color={neutral.getColor("100")} height={14} />
							<Text style={[styles.phoneAndMail, { color: theme.text_1.getColor() }]}>
								(+84) 123 456 789
							</Text>
						</Row>
						<Row>
							<MaterialSymbolsMail width={14} color={neutral.getColor("100")} height={14} />
							<Text style={[styles.phoneAndMail, { color: theme.text_1.getColor() }]}>
								dongtrinh@gmail.com
							</Text>
						</Row>
					</Col>
					<View style={styles.buttonEdit}>
						<SolarPenBold width={26} height={26} color={white.getColor()} />
					</View>
				</Row>
				<TouchableOpacity>
					<ButtonHasStatus
						onPress={handleLogoutPress}
						active={isLogoutActive}
						title={"Logout"}
						styleText={isLogoutActive ? styles.textStyleActive : styles.textStyleNonActive}
						styleButton={isLogoutActive ? styles.buttonLogoutActive : styles.buttonLogoutNotActive}
						icon={
							<SolarLogout3Linear color={isLogoutActive ? white.getColor() : primary.getColor("500")} />
						}
					/>
				</TouchableOpacity>
				<ProfileOption />
				<Row flex={0} style={styles.darkmodeBtn}>
					<Text style={[textStyle["16_regular"], { color: theme.text_1.getColor() }]}>Dark Mode</Text>
					<View>
						<Switch
							trackColor={{ false: "#767577", true: primary.getColor("500") }}
							thumbColor={isEnabled ? white.getColor() : "#f4f3f4"}
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</Row>
			</Col>
		</SafeAreaView>
	);
}

export default ProfileScreen;
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 0,
		},
		content: {
			paddingHorizontal: NumberValue.paddingHorizontalScreen,
			justifyContent: "center",
		},
		circularImage: {
			width: 60,
			height: 60,
			borderRadius: 50,
		},
		phoneAndMail: {
			...textStyle["12_medium"],
			marginLeft: 5,
		},
		infoUser: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		infoBasic: {
			paddingHorizontal: 10,
			width: "70%",
		},
		fullName: {
			...textStyle["18_semibold"],
		},
		buttonEdit: {
			width: 42,
			backgroundColor: primary.getColor("500"),
			height: 42,
			borderRadius: 21,
			justifyContent: "center",
			alignItems: "center",
		},
		buttonLogoutNotActive: {
			marginTop: 20,
		},
		buttonLogoutActive: {
			marginTop: 20,
		},
		textStyleActive: {
			color: white.getColor(),
			marginLeft: 10,
		},
		textStyleNonActive: {
			color: primary.getColor("500"),
			marginLeft: 10,
		},
		darkmodeBtn: {
			flex: 1,
			justifyContent: "space-between",
			width: "100%",
			position: "relative",
			paddingVertical: 15,
		},
		styleBackgroundIconRight: {
			backgroundColor: theme.header.backgroundIconBack.getColor(),
			padding: 8,
			borderRadius: 50,
			shadowColor: "#0D0A2C",
			shadowOffset: { width: -50, height: 5 },
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 3,
		},
	});
