/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:34 PM - 05/08/2024
 * User: kimin
 **/

import React from "react";
import {Platform, Text} from "react-native";
import ButtonAuthProps from "./type/googleAuth.type";

let GoogleSignInButton: React.ComponentType<ButtonAuthProps>;

if (Platform.OS === 'android') {
    GoogleSignInButton = require('./google/GoogleSignInButton.android').default;
}  else if (Platform.OS === 'web') {
    GoogleSignInButton = require('./google/GoogleSignInButton.web').default;
}


const GoogleAuth = ({loginSuccess, logoutSuccess, email}: ButtonAuthProps) => {
    const renderComponent: Record<typeof Platform.OS, React.JSX.Element> = {
        ios: <Text>Sign in with Google</Text>,
        web: <GoogleSignInButton email={email} loginSuccess={loginSuccess} logoutSuccess={logoutSuccess}/>,
        android: <GoogleSignInButton email={email} loginSuccess={loginSuccess} logoutSuccess={logoutSuccess}/>,
        macos: <Text>Sign in with Google</Text>,
        windows: <Text>Sign in with Google</Text>,
    }


    return renderComponent[Platform.OS];
}

export default GoogleAuth;
