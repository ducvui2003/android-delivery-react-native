/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:38 PM - 06/08/2024
 * User: lam-nguyen
 **/

import React, {ReactNode, useState} from "react";
import {
    Keyboard,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import {gradient, neutral, otherMethodSignIn, primary, white} from "../../configs/colors/color-template.config";
import {CheckBox, Divider} from "@rneui/themed";
import Row from "../../components/custom/Row";
import Col from "../../components/custom/Col";
import GoogleAuth from "../../components/auth/GoogleAuth";
import FacebookAuth from "../../components/auth/FacebookAuth";
import SolarLetterBold from "../../../assets/images/icons/SolarLetterBold";
import InputIcon from "../../components/input/InputIcon";
import SolarUserBold from "../../../assets/images/icons/SolarUserBold";
import Space from "../../components/custom/Space";
import {FlatList} from "react-native-gesture-handler";
import {Controller, useForm} from "react-hook-form";
import InputPhoneNumber from "../../components/input/InputPhoneNumber";
import GradientText from "../../components/custom/GradientText";

type RegisterForm = {
    phoneNumber: string,
    email: string,
    fullName: string
}

function SignUpScreen() {
    const theme = useSelector((state: RootState) => state.themeState.theme);
    const [isShow, setIsShow] = useState(false);
    const [isFocusInput, setIsFocusInput] = useState(false);
    const sizeIcon = 25;
    const {
        control,
        handleSubmit,
        formState: {isValid}
    } = useForm<RegisterForm>({mode: "all"})

    const onSubmit = (data: RegisterForm) => {
        console.log(data);
        if (!isValid) return;
    };

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

    const button: Record<"true" | "false", ReactNode> = {
        "true": <TouchableOpacity style={[styles.buttonNotActive, styles.button]} onPress={handleSubmit(onSubmit)}>
            <Text style={[styles.textButton]}>Register</Text>
        </TouchableOpacity>,
        "false": <View style={[styles.buttonNotActive]}>
            <Text style={[styles.textButton]}>Register</Text>
        </View>
    }

    return (
        <TouchableWithoutFeedback onPress={onOtherPress}>
            <SafeAreaView style={[{flex: 1, backgroundColor: theme.background.getColor()}]}>
                <FlatList
                    contentContainerStyle={[styles.container, {paddingHorizontal: 24}]}
                    data={[1]}
                    renderItem={() => {
                        return (
                            <Col>
                                <GradientText style={{marginBottom: 32}} textStyle={[styles.title]}
                                              text={"Registration"} gradientColors={gradient.getColor()}/>
                                <Controller
                                    control={control}
                                    name={"phoneNumber"}
                                    rules={{
                                        required: "Phone number is required",
                                    }}
                                    render={({
                                                 field: {onChange, value},
                                                 fieldState: {error},
                                             }) => {
                                        return (
                                            <Col>
                                                <InputPhoneNumber
                                                    useStateShowed={[isShow, setIsShow]}
                                                    placeholder={"00 000 000"}
                                                    value={value}
                                                    onBlur={onBlurInput}
                                                    onFocus={onFocusInput}
                                                    onChange={(element) => {
                                                        onChange(element.nativeEvent.text);
                                                    }}
                                                />
                                                {error && <Text style={{color: "red"}}>{error.message}</Text>}
                                            </Col>
                                        )
                                    }}
                                />
                                <Space height={24}/>
                                <Controller
                                    control={control}
                                    name={"email"}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "invalid email"
                                        },
                                    }}
                                    render={({field: {onChange, value}, fieldState: {error}}) => {
                                        return (
                                            <Col>
                                                <InputIcon
                                                    icon={<SolarLetterBold
                                                        width={sizeIcon}
                                                        height={sizeIcon}
                                                        style={{marginRight: 12}}
                                                        color={neutral.getColor("100")}/>}
                                                    placeholder={"Email"}
                                                    value={value}
                                                    onBlur={onBlurInput}
                                                    onFocus={onFocusInput}
                                                    onChange={(element) => {
                                                        onChange(element.nativeEvent.text);
                                                    }}
                                                />
                                                {error && <Text style={{color: "red"}}>{error.message}</Text>}
                                            </Col>
                                        );
                                    }}
                                />
                                <Space height={24}/>
                                <Controller
                                    control={control}
                                    name={"fullName"}
                                    rules={{
                                        required: "Full name is required",
                                    }}
                                    render={({field: {onChange, value}, fieldState: {error}}) => {
                                        return (
                                            <Col>
                                                <InputIcon
                                                    icon={<SolarUserBold
                                                        width={sizeIcon}
                                                        height={sizeIcon}
                                                        style={{marginRight: 12}}
                                                        color={neutral.getColor("100")}/>}
                                                    placeholder={"Full Name"}
                                                    value={value}
                                                    onBlur={onBlurInput}
                                                    onFocus={onFocusInput}
                                                    onChange={(element) => {
                                                        onChange(element.nativeEvent.text)
                                                    }}
                                                />
                                                {error && <Text style={{color: "red"}}>{error.message}</Text>}
                                            </Col>
                                        );
                                    }}/>
                                <Row style={[styles.rememberMeContainer]}>
                                    <CheckBox
                                        checked={false}
                                        iconType={"material-community"}
                                        checkedIcon={"checkbox-marked"}
                                        uncheckedIcon={"checkbox-blank-outline"}
                                        checkedColor={primary.getColor("500")}
                                        uncheckedColor={neutral.getColor("100")}
                                        size={24}
                                        containerStyle={{backgroundColor: theme.background.getColor(), padding: 5}}
                                    />
                                    <Text style={[styles.rememberMeText, {color: theme.text_1.getColor()}]}>
                                        Remember me
                                    </Text>
                                </Row>
                            </Col>
                        );
                    }}
                    ListFooterComponent={() => {
                        return (<Col style={{zIndex: -1}}>
                            {button[isValid.toString() as "true" | "false"]}
                            <Col style={{display: isFocusInput ? "none" : "flex"}}>
                                <View style={[styles.otherMethodSignInContainer]}>
                                    <Divider width={1}
                                             color={otherMethodSignIn.getColor()}
                                             style={[styles.dividerStyle]}/>
                                    <Text
                                        style={[
                                            styles.otherMethodSignIn,
                                            {
                                                backgroundColor: theme.background.getColor(),
                                            }
                                        ]}
                                    >Or sign up with</Text>
                                </View>
                                <Row style={[styles.buttonOtherMethodSignIn]}>
                                    <GoogleAuth/>
                                    <View style={{padding: 8}}/>
                                    <FacebookAuth/>
                                </Row>
                                <Row style={[styles.askSignUpContainer]}>
                                    <Text style={[styles.askSignUpText, {color: theme.text_1.getColor()}]}>
                                        Do have an account?
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.signUpText]}>Sign In</Text>
                                    </TouchableOpacity>
                                </Row>
                            </Col>
                        </Col>);
                    }}
                />
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
        textAlign: "center"
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

export default SignUpScreen;
