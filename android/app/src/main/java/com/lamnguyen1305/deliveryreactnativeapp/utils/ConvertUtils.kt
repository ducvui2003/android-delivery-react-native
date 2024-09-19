/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:18 PM - 15/09/2024
 *  User: lam-nguyen
 **/

package com.lamnguyen1305.deliveryreactnativeapp.utils

import android.content.res.Resources

fun Int.toDp(): Int {
    return (this * Resources.getSystem().displayMetrics.density).toInt()
}

fun Int.toPx(): Int {
    return (this / Resources.getSystem().displayMetrics.density).toInt()
}
