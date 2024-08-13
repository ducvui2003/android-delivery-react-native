/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import React, {useEffect} from 'react';
// import {AccessToken, LoginManager, LoginResult, Profile} from "react-native-fbsdk-next";
import {Text, TouchableOpacity, View} from "react-native";
import {Image} from "@rneui/themed";
import {white} from "../../configs/colors/color-template.config";
import {RootState} from "../../configs/redux/store.config";
import {useSelector} from "react-redux";

function FacebookAuth() {
    // const [profile, setProfile] = React.useState<Profile | null>();
    // const [accessToken, setAccessToken] = React.useState<AccessToken | null>();
    const theme = useSelector((state: RootState) => state.themeState.theme);
    //
    // const login = async () => LoginManager.logInWithPermissions(["public_profile", "email"])
    //     .then((result: LoginResult) => {
    //             if (result.isCancelled) {
    //                 console.log("Login cancelled");
    //                 return;
    //             }
    //
    //             getProfile();
    //             getAccessToken();
    //         }
    //     ).catch((error) => {
    //             console.log("Login fail with error: " + error);
    //         }
    //     );
    // const logout = () => LoginManager.logOut();
    //
    // const getProfile = () => Profile.getCurrentProfile().then((profile) => {
    //     setProfile(profile);
    // });
    //
    // const getAccessToken = () => AccessToken.getCurrentAccessToken().then((accessToken) => {
    //     setAccessToken(accessToken);
    // })
    //
    // useEffect(() => {
    //     getAccessToken().then(() => {
    //         getProfile().then()
    //     });
    // }, []);
    //
    // if (accessToken)
    //     return (
    //         <View style={{
    //             justifyContent: "center",
    //             alignItems: "center",
    //         }}>
    //             <Text>Facebook Auth {profile && profile.name} & {accessToken && accessToken.getUserId()}</Text>
    //             {profile && <Image source={{
    //                 uri: profile.imageURL ? profile.imageURL : ""
    //             }} style={{width: 100, height: 100}}/>}
    //             <TouchableOpacity
    //                 style={{
    //                     padding: 10,
    //                     margin: 5,
    //                     backgroundColor: theme.primary.getColor("500"),
    //                 }}
    //                 onPress={() => {
    //                     logout();
    //                     setAccessToken(null);
    //                     setProfile(null);
    //                 }}
    //             >
    //                 <Text style={{
    //                     color: white.getColor()
    //                 }}>Đăng xuất</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );

    return (
        <TouchableOpacity
            style={{
                padding: 10,
                margin: 5,
                backgroundColor: theme.green.getColor("500"),
            }}
            onPress={async () => {
                // await login();
            }}
        >
            <Text style={{
                color: white.getColor()
            }}>Đăng nhập bằng Facebook</Text>
        </TouchableOpacity>
    );
}

export default FacebookAuth;
