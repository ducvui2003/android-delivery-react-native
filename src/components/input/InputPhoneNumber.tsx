/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:50 PM - 17/08/2024
 * User: lam-nguyen
 **/

import React, {useEffect, useState} from 'react';
import Selector from "../selector/Selector";
import CountryPhoneNumberType from "../../types/countryPhoneNumber.type";
import countries from "../../../assets/data/dialCodes/countries";
import {StyleSheet, Text} from "react-native";
import {Icon} from "@rneui/base";
import CountryPhoneNumberItem from "../countryPhoneNumber/CountryPhoneNumberItem";
import Row from "../custom/Row";
import {RootState} from "../../configs/redux/store.config";
import {useSelector} from "react-redux";
import textStyle from "../../configs/styles/textStyle.config";
import InputPhoneNumberProps from "./type/InputPhoneNumberProps";
import InputIcon from "./InputIcon";
import {PhoneNumberUtil} from "google-libphonenumber";

function InputPhoneNumber
({
     placeholder,
     value,
     onBlur,
     onFocus,
     onChange,
     useStateShowed = useState(false),
     onCountryPhoneNumberTypeSelected,
     onValidation,
     borderColor
 }: InputPhoneNumberProps) {
    const theme = useSelector((state: RootState) => state.themeState.theme);
    const [isShow, setIsShow] = useStateShowed;
    const [countryPhoneNumber, setCountryPhoneNumber] = useState<CountryPhoneNumberType>(countries[0]);
    const phoneUtil = PhoneNumberUtil.getInstance();
    const [phoneNumberFormat, setPhoneNumberFormat] = useState<string>("");

    useEffect(() => {
        onCountryPhoneNumberTypeSelected && onCountryPhoneNumberTypeSelected(countryPhoneNumber);
        validationPhoneNumber(phoneNumberFormat);
    }, [countryPhoneNumber])

    const validationPhoneNumber = (phoneNumber: string) => {
        if (!onValidation) return;

        if (phoneNumber.length <= 9 || phoneNumber.length >= 15) {
            onValidation(false);
        } else {
            onValidation(phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber, countryPhoneNumber.code)));
        }
    }

    return (
        <InputIcon
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            borderColor={borderColor}
            onChange={e => {
                setPhoneNumberFormat(e.nativeEvent.text)
                onChange && onChange(e);
                validationPhoneNumber(e.nativeEvent.text);
            }}
            keyboardType={"phone-pad"}
            side={"left"}
            icon={
                <Row style={[styles.container]}>
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
                </Row>
            }/>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    itemSelected: {
        fontSize: 28
    },
    textDialCode: {
        ...textStyle["16_regular"],
        marginHorizontal: 10,
    },
})

export default InputPhoneNumber;
