/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:37 PM - 14/08/2024
 *  User: lam-nguyen
 **/
import React, {useEffect, useRef, useState} from "react";
import {NativeSyntheticEvent, StyleSheet, View} from "react-native";
import ListDot from "./ListDot";
import {Double} from "react-native/Libraries/Types/CodegenTypes";
import CarouselProps from "./type/carousel.type";
import PagerView from "react-native-pager-view";

function Carousel<T>
({
     data,
     viewPagerRef = useRef<PagerView>(),
     onCurrentPage,
     renderItem,
     initialPage = 0,
     showDot = true,
     colorDot,
     colorDotActive,
     sizeDot,
     sizeDotActive,
     positionListDot = {
         position: "center",
         side: "bottom",
     },
 }: CarouselProps<T>) {
    const sizeDotDefault = sizeDot ?? 10;
    const sizeDotActiveDefault = sizeDotActive ?? 30;
    const listDotSizes = data.map(() => useState(sizeDotDefault));
    const listStatus = data.map(() => useState(false));

    const renderViewPagerItem = () => {
        return data.map((item, index) => {
            return (
                renderItem(item, index)
            );
        });
    }

    useEffect(() => {
        listStatus[initialPage][1](true);
        listDotSizes[initialPage][1](sizeDotActiveDefault);
    }, [])

    const onPageScroll = (event: NativeSyntheticEvent<Readonly<{ position: Double, offset: Double }>>) => {
        const {offset, position} = event.nativeEvent;
        onCurrentPage(position); //for set scroll page
        if (position === data.length - 1) return;
        const [, setSizeNextDot] = listDotSizes[position + 1];
        const [, setSizePrevDot] = listDotSizes[position];
        const [, setStatusNextDot] = listStatus[position + 1];
        const [, setStatusPrevDot] = listStatus[position];
        setSizeNextDot(sizeDotDefault + (sizeDotActiveDefault - sizeDotDefault) * offset);
        setSizePrevDot(sizeDotDefault + (sizeDotActiveDefault - sizeDotDefault) * (1 - offset));
        setStatusNextDot(offset > 0.5);
        setStatusPrevDot(!(offset > 0.5));
    }

    return (
        <View style={style.container}>
            {
                (showDot && positionListDot?.side === "top") && <ListDot<T>
                    data={data}
                    dotSizes={listDotSizes.map(([size,]) => size)}
                    dotStatuses={listStatus.map(([status,]) => status)}
                    colorDot={colorDot}
                    colorDotActive={colorDotActive}
                    sizeDotDefault={sizeDotDefault}
                    position={positionListDot?.position}
                />
            }
            <PagerView
                style={[style.container]}
                ref={viewPager => {
                    if (!viewPager) return;
                    viewPagerRef.current = viewPager;
                }}
                initialPage={initialPage}
                onPageScroll={onPageScroll}
            >
                {renderViewPagerItem()}
            </PagerView>
            {
                (showDot && positionListDot?.side === "bottom") && <ListDot<T>
                    data={data}
                    dotSizes={listDotSizes.map(([size,]) => size)}
                    dotStatuses={listStatus.map(([status,]) => status)}
                    colorDot={colorDot}
                    colorDotActive={colorDotActive}
                    sizeDotDefault={sizeDotDefault}
                    position={positionListDot?.position}
                />
            }
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Carousel;
