/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:37 PM - 14/08/2024
 *  User: lam-nguyen
 **/
import {FragmentIntroduceType} from "../types/fragmentIntroduce.type";
import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import PagerView from "react-native-pager-view";
import FragmentIntroduceItem from "./FragmentIntroduceItem";
import {primary} from "../configs/colors/color-template.config";

function ListDot({data, dotSizes, dotStatuses}: {
    data: FragmentIntroduceType[],
    dotSizes: number[],
    dotStatuses: boolean[]
}) {

    const renderDot = () => {
        return data.map((item, index) => {
            return (
                <View style={[
                    styles.dot,
                    {width: dotSizes[index]},
                    dotStatuses[index] && styles.dotActive,
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

function FragmentIntroduce({data, viewPagerRef, setCurrentPageViewPager}: {
    data: FragmentIntroduceType[],
    viewPagerRef: (viewPager: PagerView) => void;
    setCurrentPageViewPager: (currentPage: number) => void;
}) {
    const [currentPageViewPager,] = useState(0);
    const listDotSizes = data.map(() => useState(10));
    const listStatus = data.map(() => useState(false));

    const renderViewPagerItem = () => {
        return data.map((item, index) => {
            return (
                <FragmentIntroduceItem {...item} key={index.toString()}/>
            );
        });
    }

    useEffect(() => {
        listStatus[0][1](true);
        listDotSizes[0][1](30);
    }, [])


    return (
        <View style={styles.container}>
            <PagerView style={[styles.container]}
                       ref={viewPager => {
                           if (!viewPager) return;
                           viewPagerRef(viewPager);
                       }}
                       onPageSelected={event => {
                           const {position} = event.nativeEvent;
                           setCurrentPageViewPager(position);
                       }}
                       onPageScroll={event => {
                           const {offset, position} = event.nativeEvent;
                           if (position === data.length - 1) return;
                           const [, setSizeNextDot] = listDotSizes[position + 1];
                           const [, setSizePrevDot] = listDotSizes[position];
                           const [, setStatusNextDot] = listStatus[position + 1];
                           const [, setStatusPrevDot] = listStatus[position];
                           setSizeNextDot(10 + 20 * offset);
                           setSizePrevDot(10 + 20 * (1 - offset));
                           setStatusNextDot(offset > 0.5);
                           setStatusPrevDot(!(offset > 0.5));
                       }}
                       onResponderEnd={() => {
                           setCurrentPageViewPager(currentPageViewPager + 1);
                       }}
            >
                {renderViewPagerItem()}
            </PagerView>
            <ListDot data={data}
                     dotSizes={listDotSizes.map(([size,]) => size)}
                     dotStatuses={listStatus.map(([status,]) => status)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        marginBottom: 25,
        marginHorizontal: 4,
        backgroundColor: primary.getColor("50")
    },
    dotActive: {
        backgroundColor: primary.getColor("500")
    }
})

export default FragmentIntroduce;
