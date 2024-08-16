/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React, {useState} from "react";
import {
    Keyboard,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import countries from "../../../assets/data/dialCodes/countries";
import Selector from "../../components/selector/Selector";
import CountryPhoneNumberType from "../../types/countryPhoneNumber.type";
import textStyle from "../../configs/styles/textStyle.config";
import {neutral, otherMethodSignIn, primary, white} from "../../configs/colors/color-template.config";
import CountryPhoneNumberItem from "../../components/countryPhoneNumber/CountryPhoneNumberItem";
import {Icon} from "@rneui/base";
import {CheckBox, Divider} from "@rneui/themed";
import Row from "../../components/custom/Row";
import Col from "../../components/custom/Col";
import GoogleAuth from "../../components/auth/GoogleAuth";
import FacebookAuth from "../../components/auth/FacebookAuth";

function LoginScreen() {
    const [checked, setChecked] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [isFocusInput, setIsFocusInput] = React.useState(false);
    const theme = useSelector((state: RootState) => state.themeState.theme);
    const [countryPhoneNumber, setCountryPhoneNumber] = React.useState<CountryPhoneNumberType>(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const onFocusInput = () => {
        setIsFocusInput(true);
        setIsShow(false);
    }

    const onBlurInput = () => {
        setIsFocusInput(false);
    }

    const onOtherPress = () => {
        setIsShow(false);
        if (Platform.OS === "web") return;
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={onOtherPress}>
            <SafeAreaView style={[{flex: 1, backgroundColor: theme.background.getColor()}]}>
                <Col style={[styles.container, {paddingHorizontal: 24}]}>
                    <Col>
                        <Text style={[styles.title]}>Login</Text>
                        <Row style={[
                            styles.inputPhoneNumberContainer,
                            {
                                backgroundColor: theme.background_input.getColor(),
                                borderColor: theme.border.getColor(),
                            }
                        ]}>
                            <Selector<CountryPhoneNumberType>
                                data={countries}
                                showBorder={false}
                                width={70}
                                padding={0}
                                useStateShowed={[isShow, setIsShow]}
                                onSelected={(item) => {
                                    setCountryPhoneNumber(item);
                                }}
                                renderItemSelected={(item) => {
                                    return <Text style={[styles.itemSelected]}>{item.flag}</Text>
                                }}
                                renderArrow={() => {
                                    return (
                                        <Icon size={30} color={theme.arrowSelector.getColor()} brand={true}
                                              type={"font-awesome"}
                                              name={"angle-down"}/>
                                    );
                                }}
                                backgroundColorItems={theme.background.getColor()}
                                renderItem={item => <CountryPhoneNumberItem data={item}/>}
                            />
                            <Text
                                style={[styles.textDialCode, {color: theme.dialCode.getColor()}]}>({countryPhoneNumber.dial_code})</Text>
                            <TextInput style={[styles.inputPhoneNumber, {color: theme.text_3.getColor()}]}
                                       placeholderTextColor={theme.placeholder.getColor()}
                                       onBlur={onBlurInput}
                                       onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
                                       onFocus={onFocusInput}
                                       placeholder={"00 000 000"}/>
                        </Row>

                        <Row style={[styles.rememberMeContainer]}>
                            <CheckBox
                                checked={checked}
                                onPress={() => setChecked(!checked)}
                                iconType={"material-community"}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={primary.getColor("500")}
                                uncheckedColor={neutral.getColor("100")}
                                size={24}
                                containerStyle={{backgroundColor: theme.background.getColor(), padding: 5}}
                            />
                            <Text style={[styles.rememberMeText, {color: theme.text_1.getColor()}]}>Remember me</Text>
                        </Row>
                    </Col>
                    <Col style={{zIndex: -1}}>
                        <TouchableOpacity style={[styles.buttonNotActive, phoneNumber ? styles.button : {}]}>
                            <Text style={[styles.textButton]}>Sign In</Text>
                        </TouchableOpacity>

                        <Col style={{display: isFocusInput ? "none" : "flex"}}>
                            <View style={[styles.otherMethodSignInContainer]}>
                                <Divider width={1} color={otherMethodSignIn.getColor()}
                                         style={[styles.dividerStyle]}/>
                                <Text
                                    style={[styles.otherMethodSignIn, {
                                        backgroundColor: theme.background.getColor(),
                                    }]}
                                >Or sign in with</Text>
                            </View>
                            <Row style={[styles.buttonOtherMethodSignIn]}>
                                <GoogleAuth/>
                                <View style={{padding: 8}}/>
                                <FacebookAuth/>
                            </Row>
                            <Row style={[styles.askSignUpContainer]}>
                                <Text style={[styles.askSignUpText, {color: theme.text_1.getColor()}]}>Don’t have an
                                    account?</Text>
                                <TouchableOpacity>
                                    <Text style={[styles.signUpText]}>Sign Up</Text>
                                </TouchableOpacity>
                            </Row>
                        </Col>
                    </Col>
                </Col>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 78,
        justifyContent: "space-between"
    },
    title: {
        ...textStyle["30_bold_5%"],
        color: primary.getColor("500"),
        marginBottom: 32
    },
    itemSelected: {
        fontSize: 28
    },
    inputPhoneNumberContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    sizeArrow: {
        width: 20,
        height: 20,
    },
    textDialCode: {
        ...textStyle["16_regular"],
        marginHorizontal: 10,
    },
    inputPhoneNumber: {
        ...textStyle["16_regular"],
        flex: 1,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 34
    },
    rememberMeText: {
        ...textStyle["16_regular"],
    },
    buttonNotActive: {
        paddingVertical: 16,
        backgroundColor: primary.getColor("100"),
        borderRadius: 999,
        alignItems: "center",
    },
    button: {
        backgroundColor: primary.getColor("500")
    },
    textButton: {
        ...textStyle["18_semibold"],
        color: white.getColor()
    },
    otherMethodSignInContainer: {
        alignItems: "center",
        position: "relative",
        marginVertical: 32
    },
    otherMethodSignIn: {
        ...textStyle["16_regular"],
        width: 120,
        textAlign: "center",
        color: otherMethodSignIn.getColor()
    },
    dividerStyle: {
        position: "absolute",
        top: "50%",
        width: "100%",
    },
    askSignUpContainer: {
        justifyContent: "center",
        marginBottom: 45
    },
    askSignUpText: {
        ...textStyle["16_regular"],
        marginRight: 10,
    },
    signUpText: {
        ...textStyle["16_semibold"],
        color: primary.getColor("500"),
    },
    buttonOtherMethodSignIn: {
        justifyContent: "center",
        marginBottom: 24
    }
})

export default LoginScreen;
