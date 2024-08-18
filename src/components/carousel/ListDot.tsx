/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:49 AM - 15/08/2024
 *  User: lam-nguyen
 **/
import {StyleSheet, View} from "react-native";
import React from "react";
import DotProps from "./type/dot.type";
import {primary} from "../../configs/colors/color-template.config";
import Row from "../custom/Row";

function ListDot<T>({
                        data,
                        sizeDotDefault,
                        dotSizes,
                        dotStatuses,
                        colorDot,
                        colorDotActive,
                        position = "center"
                    }: DotProps<T>) {
    const renderDot = () => {
        return data.map((_, index) => {
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
                        backgroundColor: colorDot ?? primary.getColor("100")
                    },
                    dotStatuses[index] && {
                        backgroundColor: colorDotActive ?? primary.getColor("400")
                    },
                ]} key={index.toString()}/>
            );
        });
    }

    return (
        <Row style={[
            style.container,
            {
                justifyContent: position === "center" ? "center" :
                    position === "left" ? "flex-start" : "flex-end",
            }
        ]}>
            {renderDot()}
        </Row>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    dot: {
        borderRadius: 999,
        marginBottom: 25,
        marginHorizontal: 4
    },
})

export default ListDot;

