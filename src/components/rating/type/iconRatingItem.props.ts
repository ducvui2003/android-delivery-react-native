/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:42 AM - 06/09/2024
 * User: lam-nguyen
 **/
import * as React from "react";

type IconRatingItemProps = {
	icon?: React.JSX.Element;
	iconSize?: number;
	colorSelected?: string;
	colorUnselected?: string;
	percent: number;
	onSelect?: (index: number) => void;
	index: number;
};

export default IconRatingItemProps;
