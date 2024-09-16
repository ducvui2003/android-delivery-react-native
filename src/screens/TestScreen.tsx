/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:20 PM - 15/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { NativeModules, Text, TouchableOpacity, View } from "react-native";
const { CardVisaActivityModule } = NativeModules;

function TestScreen() {
	const openNativeActivity = () => {
		CardVisaActivityModule.openMyActivity();
	};

	return (
		<View>
			<TouchableOpacity onPress={openNativeActivity}>
				<Text>Change</Text>
			</TouchableOpacity>
		</View>
	);
}

export default TestScreen;
