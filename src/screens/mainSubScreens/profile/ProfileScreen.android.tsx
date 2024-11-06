import {Button, Text, View} from "react-native";
import * as React from "react";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";
import {logout} from "../../../services/auth.service";
import {getFromStorage, KEY_SECURE} from "../../../services/secureStore.service";
import {useEffect} from "react";

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
function ProfileScreen() {
	const [accessToken, setAccessToken] = React.useState<string | null>(null);
	const onClick = () => {
		logout().then(() => {
			console.log("Logout success");
		});
	}
	useEffect(() => {
		getFromStorage(KEY_SECURE.ACCESS_TOKEN).then((value) => {
			setAccessToken(value);
		});
	}, []);
	return (
		<View>
			<Text>{accessToken}</Text>
			<ButtonHasStatus title={"Logout"} active={true} onPress={onClick}/>
		</View>
	);
}

export default ProfileScreen;
