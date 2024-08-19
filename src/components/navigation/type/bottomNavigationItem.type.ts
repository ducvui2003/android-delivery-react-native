/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:49 PM - 19/08/2024
 * User: lam-nguyen
 **/
import React from "react";
import BottomNavigationItemInputProps from "./bottomNavigationItemInput.type";

type BottomNavigationItemProps = BottomNavigationItemInputProps & BottomNavigationItem & {
    index: number;
    state?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    onActive: (index: number) => void;
}

export type BottomNavigationItem = {
    backgroundIcon: string | string[];
    backgroundIconActive: string | string[];
    colorTitle: string | string[];
    sizeIcon?: number;
    fontSize?: number;
    transformTop?: number;
    durationAnimation?: number;
}

export default BottomNavigationItemProps;
