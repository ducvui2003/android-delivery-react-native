/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeType} from "../../types/theme.type";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {setTheme} from "../../hooks/redux/theme.slice";

function TestThemeScreen() {
    const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
    const dispatch = useDispatch();

    return (
        <View style={[styles.container, {
            backgroundColor: theme.background.getColor(),
        }]}>
            <Text style={{color: theme.text_3.getColor()}}>Chào mừng bạn đến với chức năng đổi theme</Text>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black',
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                    }}
                    onPress={() => {
                        dispatch(setTheme("dark"));
                    }}
                >
                    <Text style={{
                        color: 'white',
                    }}>Dark theme</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#f0f0f0',
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                    }}
                    onPress={() => {
                        dispatch(setTheme("light"));
                    }}
                >
                    <Text style={{
                        color: 'black',
                    }}>Light theme</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default TestThemeScreen;
