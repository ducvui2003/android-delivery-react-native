/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:50 PM - 18/08/2024
 *  User: lam-nguyen
 **/

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:19 AM - 18/08/2024
 * User: lam-nguyen
 **/


import React from 'react';
import {Platform} from 'react-native';
import GradientProps from "./type/gradient.type";

let LinearGradient: React.ComponentType<GradientProps>;
if (Platform.OS === "android" || Platform.OS === "ios")
    LinearGradient = require('./GradientText.android').default;
else if (Platform.OS === "web")
    LinearGradient = require('./GradientText.web').default;

function GradientText(props: GradientProps) {
    return (
        <LinearGradient {...props}/>
    );
};

export default GradientText;
