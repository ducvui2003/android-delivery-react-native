/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:37 PM - 14/08/2024
 *  User: lam-nguyen
 **/
import {FragmentIntroduceType} from "../types/fragmentIntroduceType";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {Image, StyleSheet, Text, View} from "react-native";
import textStyle from "../configs/styles/textStyle.config";

function FragmentIntroduceItem(item: FragmentIntroduceType, key: React.Key | null | undefined) {
    const theme = useSelector((state: RootState) => state.themeState.theme);
    return (
        <View style={style.container} key={key}>
            <View style={{margin: 25}}>
                <Image source={item.source}/>
            </View>
            <Text style={[style.textTitle, {color: theme.primary.getColor("500")}]}>
                {item.title}
            </Text>
            <Text style={[style.textContent, {color: theme.primary.getColor("500")}]}>
                {item.content}
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        ...textStyle["22_semibold_5%"],
        marginBottom: 12
    },
    textContent: {
        ...textStyle["18_regular"],
    },
})

export default FragmentIntroduceItem;
