import * as React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";
import { RootState, useAppDispatch } from "../../../configs/redux/store.config";
import { logout } from "../../../hooks/redux/auth.slice";
/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
function ProfileScreen() {
	const accessToken = useSelector((state: RootState) => state.authState.accessToken);
	const dispatch = useAppDispatch();
	const onClick = () => {
		dispatch(logout()).then(() => {});
	};

	return (
		<View>
			<Text>{accessToken}</Text>
			{accessToken && <ButtonHasStatus title={"Logout"} active={true} onPress={onClick} />}
		</View>
	);
}

export default ProfileScreen;
