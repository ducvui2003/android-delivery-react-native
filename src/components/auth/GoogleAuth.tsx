/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:34 PM - 05/08/2024
 * User: kimin
 **/

import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
    User,
} from '@react-native-google-signin/google-signin';
import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import axiosInstance, {ApiResponse} from "../../configs/axios/axios.config";
import {AxiosError} from "axios";

const GoogleAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '', // specifies a hosted domain restriction
        // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        // accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo: User = await GoogleSignin.signIn();
            await getDataFormServer(userInfo.serverAuthCode ? userInfo.serverAuthCode : "");
        } catch (error) {
            switchCaseError(error)
        }
    };

    const switchCaseError = (error: any) => {
        if (isErrorWithCode(error)) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    break;
                case statusCodes.IN_PROGRESS:
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    break;
                default:
            }
            return;
        }
    }

    const getDataFormServer = async (authCode: string) => {
        axiosInstance.post<ApiResponse<string>>
        ("/auth/google",
            {
                authCode: authCode
            }
        )
            .then(result => {
                console.log(result)
            }).catch((error: AxiosError) => {
            console.error(error.code)
        });
    }

    if (user)
        return (
            <View>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                }}>Xin chào {user.user.name} !</Text>
                <Button title={"Sign out"} onPress={async () => {
                    await GoogleSignin.signOut();
                    setUser(null);
                }}/>
            </View>
        );


    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
                await signIn();
            }}
        />
    );
}

export default GoogleAuth;
