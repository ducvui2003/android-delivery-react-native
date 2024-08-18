/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:42 AM - 16/08/2024
 * User: lam-nguyen
 **/
import React from "react";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";

type SelectorProps<T> = {
    data: T[];
    renderItem: (item: T, index: number) => React.JSX.Element;
    renderItemSelected: (item: T) => React.JSX.Element;
    renderArrow?: () => React.JSX.Element;
    onSelected?: (item: T) => void;
    showBorder?: boolean;
    height?: DimensionValue;
    width?: DimensionValue;
    padding?: number;
    backgroundColorSelected?: ColorValue;
    backgroundColorItems?: ColorValue;
    useStateShowed?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default SelectorProps;
