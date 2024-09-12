/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:49 PM - 19/08/2024
 * User: lam-nguyen
 **/
import { ReactNode } from "react";

type BottomNavigationItemInputProps = {
	icon: ReactNode;
	iconActive: ReactNode;
	title: string;
	onPress?: () => void;
	onDisabled?: (index: number) => void;
};

export default BottomNavigationItemInputProps;
