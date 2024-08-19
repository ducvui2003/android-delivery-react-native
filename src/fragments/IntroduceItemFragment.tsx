/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:37 PM - 14/08/2024
 *  User: lam-nguyen
 **/
import {FragmentIntroduceType} from "../types/fragmentIntroduce.type";
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import textStyle from "../configs/styles/textStyle.config";
import {primary} from "../configs/colors/color-template.config";

function IntroduceItemFragment(item: FragmentIntroduceType, key: React.Key | null | undefined) {
    return (
        <View style={styles.container} key={key}>
            <View style={{margin: 25}}>
                <Image source={item.source} style={[styles.sizeImage]}/>
            </View>
            <Text style={[styles.textTitle]}>
                {item.title}
            </Text>
            <Text style={[styles.textContent,]}>
                {item.content}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    sizeImage: {
        width: 300,
        height: 300
    },
    textTitle: {
        ...textStyle["22_semibold_5%"],
        marginBottom: 12,
        color: primary.getColor("500")
    },
    textContent: {
        ...textStyle["18_regular"],
        color: primary.getColor("500")
    },
})

export default IntroduceItemFragment;
