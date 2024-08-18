/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:53 PM - 07/08/2024
 * User: lam-nguyen
 **/

import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {borderOthMethodSignIn} from "../../../configs/colors/color-template.config";
import ButtonAuthProps from "../type/googleAuth.type";
import icon from "../../../../assets/images/icons/facebook_icon.png";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../configs/redux/store.config";

function FacebookSignInButtonWeb({}: ButtonAuthProps) {
    const theme = useSelector((state: RootState) => state.themeState.theme);

    return (
        <TouchableOpacity style={[styles.container]}>
            <Image
                source={icon}
                style={[styles.icon, {backgroundColor: theme.background.getColor()}]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: borderOthMethodSignIn.getColor(),
        borderStyle: "solid",
        borderWidth: 2,
        padding: 8,
        borderRadius: 99999
    },
    icon: {
        borderRadius: 99999,
        width: 40,
        height: 40
    }
})

export default FacebookSignInButtonWeb;
