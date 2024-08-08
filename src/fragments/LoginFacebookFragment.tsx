/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {LoginScreenStackParamList} from "../navigations/stack.type";


function LoginGoogleFragment() {
    const navigation = useNavigation<NavigationProp<LoginScreenStackParamList>>();

    return (
        <View style={styles.container}>
            <Text>Đăng nhập bằng Facebook</Text>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("LoginGoogleFragment");
                }}
                style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 10,
                }}
            >
                <Text style={{
                    color: 'white',
                }}>Đăng nhập bằng Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default LoginGoogleFragment;
