/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:58 PM - 07/08/2024
 * User: lam-nguyen
 **/
import {NavigatorScreenParams} from "@react-navigation/native";
import {LoginScreenStackParamList} from "../stack.type";

export type MainScreenStackParamList = {
    LoginScreen: NavigatorScreenParams<LoginScreenStackParamList>;
    TestThemeScreen: undefined;
};
