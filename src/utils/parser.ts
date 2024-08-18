/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 3:07 pm
 * User: ducvui2003
 **/

import {PixelRatio} from "react-native";

/**
 * Converts a pixel value (px) to density-independent pixels (dp)
 * @param {number} px - The pixel value to convert.
 * @returns {number} - The converted dp value.
 */
function pxToDp(px: number): number {
    return PixelRatio.getPixelSizeForLayoutSize(px);
}

export {pxToDp};