/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:49 AM - 15/08/2024
 *  User: lam-nguyen
 **/
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {StyleSheet, View} from "react-native";
import React from "react";
import DotType from "./type/dot.type";

function ListDot<T>({data, sizeDotDefault, dotSizes, dotStatuses, colorDot, colorDotActive}: DotType<T>) {
    const theme = useSelector((state: RootState) => state.themeState.theme);

    const renderDot = () => {
        return data.map((item, index) => {
            return (
                <View style={[
                    style.dot,
                    {
                        width: sizeDotDefault,
                        height: sizeDotDefault
                    },
                    {
                        width: dotSizes[index]
                    },
                    {
                        backgroundColor: colorDot ?? theme.primary.getColor("100")
                    },
                    dotStatuses[index] && {
                        backgroundColor: colorDotActive ?? theme.primary.getColor("400")
                    },
                ]} key={index.toString()}/>
            );
        });
    }

    return (
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            {renderDot()}
        </View>
    );
}

const style = StyleSheet.create({
    dot: {
        borderRadius: 999,
        marginBottom: 25,
        marginHorizontal: 4
    },
})

export default ListDot;

