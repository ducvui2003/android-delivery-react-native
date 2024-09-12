/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 7:35 pm
 * User: ducvui2003
 **/
import React from "react";

export type GridProps<T> = {
	row?: number;
	col: number;
	data: T[];
	renderItem: (item: T, index: number) => React.JSX.Element;
	gapRow: number;
	gapCol?: number;
};
