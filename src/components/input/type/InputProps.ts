/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:58 PM - 17/08/2024
 *  User: lam-nguyen
 **/
import {KeyboardTypeOptions, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {UseFormReturn} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";

type InputProps = {
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    value?: string;
    onChange?: ((element: NativeSyntheticEvent<TextInputChangeEventData>) => void) | undefined;
    onBlur?: () => void;
    onFocus?: () => void;
    borderColor?: ColorValue
}

export default InputProps;
