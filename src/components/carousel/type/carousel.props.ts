/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:03 AM - 15/08/2024
 * User: lam-nguyen
 **/
import React from "react";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";
import PagerView from "react-native-pager-view";

type CarouselProps<T> = {
	data: T[];
	viewPagerRef?: (pagerView: PagerView) => void;
	onCurrentPage: (currentPage: number) => void;
	renderItem: (item: T, index: number) => React.JSX.Element;
	initialPage?: number;
	showDot?: boolean;
	sizeDot?: number;
	sizeDotActive?: number;
	colorDot?: ColorValue | undefined;
	colorDotActive?: ColorValue | undefined;
	positionListDot?: Position;
	marginListDot?: number;
};

type Position = {
	position: "left" | "center" | "right";
	side: "top" | "bottom";
};

export default CarouselProps;
