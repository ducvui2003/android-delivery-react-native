/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:42 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import * as React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import BottomNavigation from "../components/navigation/BottomNavigation";
import SolarHomeSmileLinear from "../../assets/images/icons/SolarHomeSmileLinear";
import {gradient, neutral, white} from "../configs/colors/color-template.config";
import SolarHomeSmileBold from "../../assets/images/icons/SolarHomeSmileBold";
import SolarClipboardListBold from "../../assets/images/icons/SolarClipboardListBold";
import SolarHeartLinear from "../../assets/images/icons/SolarHeartLinear";
import SolarHeartBold from "../../assets/images/icons/SolarHeartBold";
import SolarUserCircleLinear from "../../assets/images/icons/SolarUserCircleLinear";
import SolarUserCircleBold from "../../assets/images/icons/SolarUserCircleBold";
import SolarBellLinear from "../../assets/images/icons/SolarBellLinear";
import SolarBellBold from "../../assets/images/icons/SolarBellBold";
import SolarClipboardListLinear from "../../assets/images/icons/SolarClipboardListLinear";

const windowHeight = Dimensions. get('window').height

function ButtonNavigationScreen() {
    return (
        <View style={styles.container}>
            <BottomNavigation
                initialItem={0}
                position={"static"}
                bottom={-windowHeight + 90}
                sizeIcon={50}
                marginHorizontal={10}
                backgroundColor={white.getColor()}
                backgroundIcon={white.getColor()}
                backgroundIconActive={gradient.getColor()}
                colorTitle={gradient.getColor()}
                boxShadow={{
                    shadowColor: "#0D0A2C",
                    shadowOffset: {width: -50, height: 5},
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 10,
                }}
                items={[
                    {
                        icon: <SolarHomeSmileLinear color={neutral.getColor("100")} height={30} width={30}/>,
                        iconActive: <SolarHomeSmileBold color={white.getColor()} height={30} width={30}/>,
                        title: "Home",
                        onPress: () => {
                            console.log("Home")
                        }
                    },
                    {
                        icon: <SolarClipboardListLinear color={neutral.getColor("100")} height={30} width={30}/>,
                        iconActive: <SolarClipboardListBold color={white.getColor()} height={30} width={30}/>,
                        title: "Orders",
                        onPress: () => {
                            console.log("Orders")
                        }
                    },
                    {
                        icon: <SolarHeartLinear color={neutral.getColor("100")} height={30} width={30}/>,
                        iconActive: <SolarHeartBold color={white.getColor()} height={30} width={30}/>,
                        title: "Liked",
                        onPress: () => {
                            console.log("Liked")
                        }
                    },
                    {
                        icon: <SolarBellLinear color={neutral.getColor("100")} height={30} width={30}/>,
                        iconActive: <SolarBellBold color={white.getColor()} height={30} width={30}/>,
                        title: "Notification",
                        onPress: () => {
                            console.log("Notification")
                        }
                    },
                    {
                        icon: <SolarUserCircleLinear color={neutral.getColor("100")} height={30} width={30}/>,
                        iconActive: <SolarUserCircleBold color={white.getColor()} height={30} width={30}/>,
                        title: "Profile",
                        onPress: () => {
                            console.log("Profile")
                        }
                    }
                ]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});


export default ButtonNavigationScreen;
