/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:47 AM - 13/08/2024
 *  User: lam-nguyen
 **/

import * as React from 'react';
import {googleLogout, TokenResponse, useGoogleLogin} from "@react-oauth/google";
import {Button, Text, TouchableOpacity, View} from "react-native";
import axiosInstance, {ApiResponse} from "../../configs/axios/axios.config";
import {AxiosError, AxiosResponse} from "axios";
import {GoogleAuthProps} from "./GoogleAuth";
import {Authentication} from "../../types/authentication.type";


export function WebGoogleSignInButton({email, loginSuccess, logoutSuccess, loginFail, errorLogin}: GoogleAuthProps) {
    const loginServerSide = async (accessToken: string) => {
        axiosInstance.post<any, ApiResponse<Authentication>>
        ("/auth/login-google-web",
            {
                accessToken: accessToken
            }
        )
            .then(result => {
                loginSuccess && loginSuccess(result.data.user.email)
            }).catch((error: AxiosError) => {
            console.error(error.code)
        });
    }

    const onSuccess = (credentialResponse: TokenResponse) => {
        loginServerSide(credentialResponse.access_token).then();
    };
    const onError = (errorResponse: Pick<TokenResponse, any>) => {
        console.log("error");
    };

    const login = useGoogleLogin({
        onSuccess: onSuccess,
        onError: onError
    })

    if (email)
        return (
            <View>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                }}>Xin chào {email} !</Text>
                <Button title={"Sign out"} onPress={async () => {
                    googleLogout();
                    logoutSuccess && logoutSuccess();
                }}/>
            </View>
        );


    return (
        <TouchableOpacity
            style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
            }}
            onPress={() => {
                login();
            }}>
            <Text style={{
                color: "white",
                textAlign: "center",
            }}>Sign in with Google</Text>
        </TouchableOpacity>
    );
}
