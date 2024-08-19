/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:42 PM - 19/08/2024
 * User: lam-nguyen
 **/
import BottomNavigationItemInputProps from "./bottomNavigationItemInput.type";
import {BottomNavigationItem} from "./bottomNavigationItem.type";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";

type BottomNavigationProps = BottomNavigationItem & {
    items: BottomNavigationItemInputProps[];
    backgroundColor?: string;
    position?: 'relative' | 'static' | undefined;
    top?: DimensionValue | undefined;
    bottom?: DimensionValue | undefined;
    right?: DimensionValue | undefined;
    left?: DimensionValue | undefined;
    zIndex?: number | undefined;
    marginHorizontal?: DimensionValue | undefined;
    initialItem?: number | undefined;
    boxShadow?: {
        shadowColor: ColorValue,
        shadowOffset: {width: number, height: number},
        shadowOpacity: number,
        shadowRadius: number,
        elevation: number,
    },
};

export default BottomNavigationProps
