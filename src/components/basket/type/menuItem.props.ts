/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:16 PM - 06/09/2024
 * User: lam-nguyen
 **/
import React, { ReactNode } from "react";

type MenuItemProps = {
	icon: React.JSX.Element;
	title: string | ReactNode;
	footer?: ReactNode;
	onPress?: () => void;
	childRightTitle?: ReactNode;
};

export default MenuItemProps;
