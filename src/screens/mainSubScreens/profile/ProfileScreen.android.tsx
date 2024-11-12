import {Image, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useCallback, useState} from "react";
import {Header} from "../../../components/header/Header";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../configs/redux/store.config";
import {RouteProp} from "@react-navigation/native";
import {MainScreenStackParamList} from "../../../navigations/stack.type";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import Row from "../../../components/custom/Row";
import NumberValue from "../../../configs/value/number.value";
import Col from "../../../components/custom/Col";
import textStyle from "../../../configs/styles/textStyle.config";
import {neutral, primary, white} from "../../../configs/colors/color-template.config";
import {IRoundPhone} from "../../../../assets/images/icons/IRoundPhone";
import {MaterialSymbolsMail} from "../../../../assets/images/icons/MaterialSymbolsMail";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";
import {SolarLogout3Linear} from "../../../../assets/images/icons/SolarLogout3Linear";
import ProfileOption from "../../../components/profile/ProfileOption";
import {logout} from "../../../hooks/redux/auth.slice";

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

function ProfileScreen({navigation}: ProfileScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const user = useSelector((state: RootState) => state.authState.user);
	const [isLogoutActive, setLogoutActive] = useState(true);
	const dispatch = useAppDispatch();

	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	const handleLogoutPress = () => {
		setLogoutActive(!isLogoutActive);
		dispatch(logout()).then(() => {
			navigation.replace("HomeScreen");
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header
				title="Profile"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{backgroundColor: theme.header.backgroundIconBack.getColor()}}
				onPressBack={handleBackPress}
			/>
			<Col flex={0} style={styles.content}>
				<Row flex={0} style={styles.infoUser}>
					<Image
						source={{uri: "https://i.pinimg.com/originals/5c/fc/32/5cfc32131a83bbe03da98c55b3dc02fe.jpg"}}
						style={styles.circularImage}
					/>
					<Col flex={0} style={styles.infoBasic}>
						<Text style={[styles.fullName, {color: primary.getColor("500")}]}>{user?.fullName || ""}</Text>
						<Row>
							<IRoundPhone width={14} color={neutral.getColor("100")} height={14}/>
							<Text style={[textStyle["12_medium"], {marginLeft: 5}]}>{user?.phoneNumber || ""}</Text>
						</Row>
						<Row>
							<MaterialSymbolsMail width={14} color={neutral.getColor("100")} height={14}/>
							<Text style={[textStyle["12_medium"], {marginLeft: 5}]}>{user?.email || ""}</Text>
						</Row>
					</Col>
					<View style={styles.buttonEdit}>
						<SolarPenBold width={26} height={26} color={white.getColor()}/>
					</View>
				</Row>
				<TouchableOpacity>
					<ButtonHasStatus
						onPress={handleLogoutPress}
						active={isLogoutActive}
						title={"Logout"}
						styleText={isLogoutActive ? styles.textStyleActive : styles.textStyleNonActive}
						styleButton={isLogoutActive ? styles.buttonLogoutActive : styles.buttonLogoutNotActive}
						icon={<SolarLogout3Linear
							color={isLogoutActive ? white.getColor() : primary.getColor("500")}
						/>}
					/>
				</TouchableOpacity>
				<ProfileOption/>
			</Col>
		</SafeAreaView>
	);
}

export default ProfileScreen;
const styles = StyleSheet.create({
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
});
