/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:05 AM - 15/08/2024
 * User: lam-nguyen
 **/
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";

type DotType<T> = {
    data: T[],
    dotSizes: number[],
    dotStatuses: boolean[],
    colorDot?: ColorValue | undefined,
    colorDotActive?: ColorValue | undefined,
    sizeDotDefault?: number
}

export default DotType;
