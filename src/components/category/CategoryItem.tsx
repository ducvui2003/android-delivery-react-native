/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 7:29pm
 * User: ducvui2003
 **/

import {Image, Text, View, StyleSheet} from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import React from "react";
import {Category} from "../../types/category.type";
import {ThemeType} from "../../types/theme.type";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";

function CategoryItem({item}: { item: Category }) {
    const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
    const styles = makeStyled(theme);
    return (
        <View style={{...styles.container}}>
            <Image source={item.image} style={{...styles.image}}/>
            <Text style={{...styles.text}}>
                {item.name}
            </Text>
        </View>
    );
}

const makeStyled = (theme: ThemeType) => StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 6,
        elevation: 5,
        borderRadius: 8,
        backgroundColor: "white",
    },
    image: {
        width: 24,
        height: 24,
    },
    text: {
        ...textStyle["12_medium"],
        marginTop: 5,
        textAlign: "center",
        color: theme.neutral.getColor("900"),
    },
});

export default CategoryItem;
