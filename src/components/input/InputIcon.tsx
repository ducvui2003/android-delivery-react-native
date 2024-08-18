/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:55 PM - 17/08/2024
 * User: lam-nguyen
 **/

import React from 'react';
import Row from "../custom/Row";
import {TextInput} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import InputIconProps from "./type/InpuIcontProps";
import InputStyles from "./style/input.styles";

function InputIcon
({
     onChange,
     onFocus,
     onBlur,
     placeholder,
     value,
     keyboardType,
     icon,
     side = "left"
 }: InputIconProps) {
    const theme = useSelector((state: RootState) => state.themeState.theme);

    return (
        <Row style={[
            InputStyles.container,
            {
                backgroundColor: theme.background_input.getColor(),
                borderColor: theme.border.getColor(),
            }
        ]}>
            {side === "left" && icon}
            <TextInput style={[InputStyles.input, {color: theme.text_3.getColor()}]}
                       placeholderTextColor={theme.placeholder.getColor()}
                       onBlur={onBlur}
                       keyboardType={keyboardType}
                       onChange={onChange}
                       onFocus={onFocus}
                       value={value}
                       placeholder={placeholder}/>
            {side === "right" && icon}
        </Row>
    );
}


export default InputIcon;
