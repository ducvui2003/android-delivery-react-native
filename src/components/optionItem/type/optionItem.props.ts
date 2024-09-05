/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:46 PM - 28/08/2024
 * User: lam-nguyen
 **/
import { ReactNode } from "react";

type OptionItemProps = {
	name: String;
	price?: String;
	beforeText?: ReactNode;
	selected: boolean;
	onPress: () => void;
	icon: "square" | "circle";
	color?: string;
};

export default OptionItemProps;
