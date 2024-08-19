/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:45 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import Row from "../custom/Row";
import BottomNavigationItem from "./BottomNavigationItem";
import BottomNavigationProps from "./type/bottomNavigation.type";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";


function BottomNavigation
({
     items = [],
     backgroundColor = "#fff",
     backgroundIcon,
     backgroundIconActive,
     colorTitle,
     fontSize = 15,
     sizeIcon = 60,
     transformTop,
     position,
     top,
     bottom,
     right,
     left,
     zIndex,
     marginHorizontal,
     initialItem = 0,
     boxShadow
 }: BottomNavigationProps) {
    const styles = createStyles(sizeIcon + 20, backgroundColor)
    const stateItems = items.map((_, index, __) => useState(initialItem === index));

    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <BottomNavigationItem
                    key={index}
                    index={index}
                    state={stateItems[index]}
                    icon={item.icon}
                    title={item.title}
                    iconActive={item.iconActive}
                    onPress={item.onPress}
                    backgroundIcon={backgroundIcon}
                    backgroundIconActive={backgroundIconActive}
                    colorTitle={colorTitle}
                    sizeIcon={sizeIcon}
                    fontSize={fontSize}
                    transformTop={transformTop}
                    onActive={(index) => {
                        stateItems.forEach(([, setState], i) => {
                            if (i !== index) {
                                setState(false)
                            }
                        })
                    }}
                />
            )
        })
    }

    return (
        <View style={[
            styles.container,
            boxShadow,
            {position, top, right, left, bottom, zIndex, marginHorizontal}]}>
            <Row style={[styles.iconContainer]}>
                {renderItems()}
            </Row>
        </View>
    );
}

const createStyles = (height: number, backgroundColor: ColorValue) => StyleSheet.create({
    container: {
        backgroundColor: backgroundColor,
        justifyContent: "center",
        borderRadius: (18.75 * height) / 100,
        height: height,
        shadowOffset: {
            width: 0,
            height: -5,
        }
    },
    iconContainer: {
        justifyContent: "space-around",
        alignItems: "center",
    }
});

export default BottomNavigation;
