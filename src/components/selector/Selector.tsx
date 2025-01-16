/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:21 PM - 15/08/2024
 * User: lam-nguyen
 **/

import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SelectorProps from "./type/selector.type";
import { FlatList } from "react-native-gesture-handler";

function Selector<T>({
	data,
	renderItem,
	renderItemSelected,
	renderArrow,
	onSelected,
	height = 200,
	width,
	padding = 10,
	showBorder = true,
	backgroundColorSelected,
	backgroundColorItems,
	showed = false,
	onShow,
	selectItem,
	selectItemAt,
	selectItemWhere,
}: SelectorProps<T>) {
	const [selectedItem, setSelectedItem] = useState<T>(data[0]);
	const [isShow, setIsShow] = useState<boolean>(showed);
	const arrowAnim = useSharedValue(0);
	const duration = 200;
	const [minWith, setMinWith] = useState<number>(0);
	const flatListRef = useRef<FlatList<T>>(null);

	const animatedArrow = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${arrowAnim.value}deg` }],
		};
	});

	const runAnimatedArrow = (toValue: 180 | 0) => {
		arrowAnim.value = withTiming(toValue, {
			duration,
		});
	};

	useEffect(() => {
		setIsShow(false);
		onSelected?.(selectedItem);
	}, [selectedItem]);

	useEffect(() => {
		data.forEach(item => {
			if (selectItemWhere?.(item)) {
				setSelectedItem(item);
			}
		});
	}, []);

	useEffect(() => {
		runAnimatedArrow(isShow ? 180 : 0);

		onShow?.(isShow);
		if (!isShow) {
			flatListRef.current?.scrollToIndex({
				index: 0,
				animated: false,
			});
		}
	}, [isShow]);

	useEffect(() => {
		setIsShow(showed);
	}, [showed]);

	return (
		<View
			style={[
				{
					width: width ?? "100%",
					minWidth: minWith,
				},
			]}
		>
			<TouchableOpacity
				style={[
					styles.selectedContainer,
					{ padding: padding, borderColor: backgroundColorSelected },
					showBorder && styles.borderSelectedContainer,
				]}
				onPress={() => {
					setIsShow(!isShow);
				}}
			>
				{renderItemSelected(selectedItem)}
				<Animated.View style={[animatedArrow]}>
					{renderArrow ? (
						renderArrow()
					) : (
						<Image source={require("./icon/arrow.png")} style={[styles.sizeArrow]} />
					)}
				</Animated.View>
			</TouchableOpacity>
			<FlatList<T>
				ref={flatListRef}
				nestedScrollEnabled={true}
				style={[
					styles.itemsContainer,
					{
						width: width ?? "100%",
						height: isShow ? height : 0,
						backgroundColor: backgroundColorItems,
					},
				]}
				initialNumToRender={20}
				onEndReachedThreshold={0.5}
				data={data}
				keyExtractor={(item, index) => `${index}-${height}`}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								setSelectedItem(item);
								setIsShow(false);
							}}
							onLayout={({ nativeEvent }) => {
								setMinWith(nativeEvent.layout.width);
							}}
						>
							{renderItem(item, index)}
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	sizeArrow: {
		width: 20,
		height: 20,
	},
	selectedContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	borderSelectedContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "black",
	},
	itemsContainer: {
		position: "absolute",
		marginTop: 10,
		top: "100%",
		zIndex: 99999,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},
});

export default Selector;
