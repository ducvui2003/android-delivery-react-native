/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:48 PM - 10/01/2025
 * User: lam-nguyen
 **/
import { ReactNode } from "react";
import { DimensionValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type ModelType = {
	active?: boolean;
	title: string | ReactNode;
	body: string | ReactNode;
	onConfirm?: () => boolean;
	onCancel?: () => boolean;
	titleConfirm?: string;
	titleCancel?: string;
	showConfirmButton?: boolean;
	showCancelButton?: boolean;
	width?: DimensionValue;
	durationAnimation?: number;
	background?: {
		backgroundColor?: string;
		opacity?: number;
	};
	displayCancelButton?: boolean;
	onEndHide?: () => boolean;
};

export default ModelType;
