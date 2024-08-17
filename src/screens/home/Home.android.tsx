/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 12:51 pm
 * User: ducvui2003
 **/

import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {ThemeType} from "../../types/theme.type";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {Icon} from "@rneui/themed";
import textStyle from "../../configs/styles/textStyle.config";
import Carousel from "../../components/carousel/Carousel";
import PagerView from "react-native-pager-view";
import CategoryGrid from "../../components/category/CategorGrid";
import {banners, categories} from "../../components/category/data";
import CategoryItem from "../../components/category/CategoryItem";


function Home() {
    const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
    const styles = makeStyled(theme);
    const [currentPageViewPager, setCurrentPageViewPager] = useState(0);
    const viewPagerRef = useRef<PagerView>();

    return (
        <View style={styles.container}>
            <Header/>

            <View style={styles.bannerContainer}>
                <Carousel<{}>
                    data={banners}
                    viewPagerRef={viewPagerRef}
                    renderItem={(item, index) => {
                        return <Image style={styles.banner}
                                      source={item}/>
                    }}
                    onCurrentPage={(currentPage) => setCurrentPageViewPager(currentPage)}/>
            </View>
            <View style={styles.inputContainer}>
                <Icon
                    name="search"
                    size={20}
                    type="font-awesome-5"
                    solid={false}
                    color={theme.neutral.getColor("100")}
                />
                <TextInput
                    placeholder='Vui lòng nhập số điện thoại'
                    style={styles.input}
                    placeholderTextColor={theme.neutral.getColor("100")}
                />
                <Icon
                    name="sliders-h" // FontAwesome icon name
                    size={20}
                    type="font-awesome-5"
                    solid={false}
                    color={theme.neutral.getColor("900")}
                />
            </View>

            <View style={styles.categoryGridContainer}>
                <CategoryGrid col={4} data={categories} gap={24}
                              renderItem={(item, index) => <CategoryItem item={item}/>}/>
            </View>
        </View>
    );
}

function Header() {
    const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
    const styles = makeStyled(theme);

    return (
        <View style={{...styles.stack}}>
            <View>
                <Text style={{...textStyle["16_regular"]}}>Deliver to</Text>
                <Text style={{
                    ...textStyle["18_semibold"],
                    marginTop: 11,
                    color: theme.neutral.getColor("200"),
                }}>Select
                    Your Location</Text>
            </View>
            <View style={styles.shopIconContainer}>
                <Icon
                    name="shopping-bag" // FontAwesome icon name
                    size={32}
                    type="font-awesome-5"
                    solid={false}
                />
            </View>
        </View>
    )
}

const makeStyled = (theme: ThemeType) => StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 54,
        flex: 1,
        backgroundColor: "white",
    },
    stack: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 12,
        borderRadius: 8,
        borderWidth: 1.1,
        borderColor: theme.neutral.getColor("100"),
        backgroundColor: theme.neutral.getColor("50"),
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    input: {
        flex: 1,
        borderBottomWidth: 0,
        color: theme.neutral.getColor("900"),
    },
    shopIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        elevation: 4,
    },
    shopIcon: {
        aspectRatio: 1,
        width: 50,
        height: 50
    },
    bannerContainer: {
        marginTop: 24,
        marginBottom: 8,
        height: 220,
    },
    banner: {
        width: Dimensions.get('window').width + 10,
        marginHorizontal: -10
    },
    categoryGridContainer: {
        marginTop: 24,
    }
});

export default Home;