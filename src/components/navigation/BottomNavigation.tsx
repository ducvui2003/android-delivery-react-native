/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:45 PM - 18/08/2024
 *  User: lam-nguyen
 **/

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Row from "../custom/Row";
import BottomNavigationItem from "./BottomNavigationItem";
import BottomNavigationProps from "./type/bottomNavigation.props";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

type NavigationContextProp = {
	setMenu: (index: number) => void;
};

export const BottomNavigationContext = createContext<NavigationContextProp | null>(null);

function BottomNavigation({
	items = [],
	backgroundColor = "#fff",
	backgroundIcon,
	backgroundIconActive,
	colorTitle,
	fontSize = 15,
	sizeIcon = 60,
	transformTop,
	position,
	top,
	bottom,
	right,
	left,
	zIndex,
	marginHorizontal,
	initialItem = 0,
	boxShadow,
	children,
}: BottomNavigationProps) {
	const styles = createStyles(sizeIcon + 20, backgroundColor);
	const [listStatusItems, setListStatusItems] = useState<boolean[]>(
		items.map((_, index, __) => initialItem === index)
	);

	const setMenu = useCallback(
		(indexMenu: number) => {
			if (indexMenu < 0 || indexMenu >= listStatusItems.length) throw new Error("Menu not exit");
			setListStatusItems(listStatusItems.map((_, i) => i === indexMenu));
		},
		[listStatusItems]
	);

	const renderItems = useCallback(() => {
		return items.map((item, index) => {
			return (
				<BottomNavigationItem
					key={index}
					index={index}
					status={listStatusItems[index]}
					icon={item.icon}
					title={item.title}
					iconActive={item.iconActive}
					onPress={item.onPress}
					backgroundIcon={backgroundIcon}
					backgroundIconActive={backgroundIconActive}
					colorTitle={colorTitle}
					sizeIcon={sizeIcon}
					fontSize={fontSize}
					transformTop={transformTop}
					onActive={setMenu}
				/>
			);
		});
	}, [
		backgroundIcon,
		backgroundIconActive,
		colorTitle,
		fontSize,
		items,
		listStatusItems,
		setMenu,
		sizeIcon,
		transformTop,
	]);

	return (
		<BottomNavigationContext.Provider value={{ setMenu }}>
			{children}
			<View
				style={[styles.container, boxShadow, { position, top, right, left, bottom, zIndex, marginHorizontal }]}
			>
				<Row style={[styles.iconContainer]}>{renderItems()}</Row>
			</View>
		</BottomNavigationContext.Provider>
	);
}

const createStyles = (height: number, backgroundColor: ColorValue) =>
	StyleSheet.create({
		container: {
			backgroundColor: backgroundColor,
			justifyContent: "center",
			borderRadius: (18.75 * height) / 100,
			height: height,
			shadowOffset: {
				width: 0,
				height: -5,
			},
			zIndex: 2,
		},
		iconContainer: {
			justifyContent: "space-around",
			alignItems: "center",
		},
	});

export default BottomNavigation;
