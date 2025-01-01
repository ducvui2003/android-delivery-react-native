/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:51 PM - 12/11/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Row from "../../components/custom/Row";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Col from "../../components/custom/Col";
import { neutral, primary, white } from "../../configs/colors/color-template.config";
import { IRoundPhone } from "../../../assets/images/icons/IRoundPhone";
import textStyle from "../../configs/styles/textStyle.config";
import { MaterialSymbolsMail } from "../../../assets/images/icons/MaterialSymbolsMail";
import SolarPenBold from "../../../assets/images/icons/SolarPenBold";
import ButtonHasStatus from "../../components/custom/ButtonHasStatus";
import { SolarLogout3Linear } from "../../../assets/images/icons/SolarLogout3Linear";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function ProfileHasUser({ logout, onChangeProfile }: { logout: () => void; onChangeProfile?: () => void }) {
	const user = useSelector((state: RootState) => state.authState.user);
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Col>
			<Row flex={0} style={styles.infoUser}>
				<Image
					source={{ uri: "https://i.pinimg.com/originals/5c/fc/32/5cfc32131a83bbe03da98c55b3dc02fe.jpg" }}
					style={styles.circularImage}
				/>
				<Col flex={0} style={styles.infoBasic}>
					<Text style={[styles.fullName, { color: primary.getColor("500") }]}>{user?.fullName || ""}</Text>
					<Row>
						<IRoundPhone width={14} color={neutral.getColor("100")} height={14} />
						<Text
							style={[
								textStyle["12_medium"],
								{
									marginLeft: 5,
									color: theme.text_1.getColor(),
								},
							]}
						>
							{user?.phoneNumber || ""}
						</Text>
					</Row>
					<Row>
						<MaterialSymbolsMail width={14} color={neutral.getColor("100")} height={14} />
						<Text
							style={[
								textStyle["12_medium"],
								{
									marginLeft: 5,
									color: theme.text_1.getColor(),
								},
							]}
						>
							{user?.email || ""}
						</Text>
					</Row>
				</Col>
				<TouchableOpacity onPress={onChangeProfile}>
					<View style={styles.buttonEdit}>
						<SolarPenBold width={26} height={26} color={white.getColor()} />
					</View>
				</TouchableOpacity>
			</Row>
			<TouchableOpacity>
				<ButtonHasStatus
					onPress={logout}
					active={true}
					title={"Logout"}
					styleText={styles.textStyleActive}
					styleButton={styles.buttonLogoutActive}
					icon={<SolarLogout3Linear color={white.getColor()} />}
				/>
			</TouchableOpacity>
		</Col>
	);
}

export default ProfileHasUser;

const styles = StyleSheet.create({
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
