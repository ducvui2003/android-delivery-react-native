/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:57 PM - 17/08/2024
 * User: lam-nguyen
 **/
import {StyleSheet} from "react-native";
import textStyle from "../../../configs/styles/textStyle.config";

const InputStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    input: {
        ...textStyle["16_regular"],
        flex: 1,
    },
})

export default InputStyles;
