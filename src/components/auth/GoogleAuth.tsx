/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:34 PM - 05/08/2024
 * User: kimin
 **/

import React from "react";
import {Platform, Text} from "react-native";
import {WebGoogleSignInButton} from "./WebGoogleSignInButton";
import {AndroidGoogleSignInButton} from "./AndroidGoogleSignInButton";

export type GoogleAuthProps = {
    loginSuccess?: (email: string) => void; //để tạm
    errorLogin?: () => void;
    loginFail?: () => void;
    logoutSuccess?: () => void;
    email: string | undefined; //để tạm
};

const GoogleAuth = () => {
    const [email, setEmail] = React.useState<string | undefined>();

    const loginSuccess = (email: string) => {
        setEmail(email);
    }

    const logoutSuccess = () => {
        setEmail(undefined);
    }

    const renderComponent: Record<typeof Platform.OS, React.JSX.Element> = {
        ios: <Text>Sign in with Google</Text>,
        web: <WebGoogleSignInButton email={email} loginSuccess={loginSuccess} logoutSuccess={logoutSuccess}/>,
        android: < AndroidGoogleSignInButton email={email} loginSuccess={loginSuccess} logoutSuccess={logoutSuccess}/>,
        macos: <Text>Sign in with Google</Text>,
        windows: <Text>Sign in with Google</Text>,
    }


    return renderComponent[Platform.OS];
}

export default GoogleAuth;
