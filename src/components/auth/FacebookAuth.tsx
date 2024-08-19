/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import { Platform, Text } from "react-native";
import React from "react";
import ButtonAuthProps from "./type/googleAuth.type";

let FacebookSignInButton: React.ComponentType<ButtonAuthProps>;

if (Platform.OS === "android") {
	FacebookSignInButton = require("./facebook/FacebookSignInButton.android").default;
} else if (Platform.OS === "web") {
	FacebookSignInButton = require("./facebook/FacebookSignInButton.web").default;
}

function FacebookAuth({ loginSuccess, logoutSuccess, email }: ButtonAuthProps) {
	const renderComponent: Record<typeof Platform.OS, React.JSX.Element> = {
		ios: <Text>Sign in with Google</Text>,
		web: <FacebookSignInButton email={email} loginSuccess={loginSuccess} logoutSuccess={logoutSuccess} />,
		android: <FacebookSignInButton email={email} loginSuccess={loginSuccess} logoutSuccess={logoutSuccess} />,
		macos: <Text>Sign in with Google</Text>,
		windows: <Text>Sign in with Google</Text>,
	};

	return renderComponent[Platform.OS];
}

export default FacebookAuth;
