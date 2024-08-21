/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:37 PM - 14/08/2024
 *  User: lam-nguyen
 **/
import React, { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, View } from "react-native";
import ListDot from "./ListDot";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import CarouselProps from "./type/carousel.type";
import PagerView from "react-native-pager-view";
import Col from "../custom/Col";
import Space from "../custom/Space";

function Carousel<T>({
	data,
	viewPagerRef = useRef<PagerView>(),
	onCurrentPage,
	renderItem,
	initialPage = 0,
	showDot = true,
	colorDot,
	colorDotActive,
	sizeDot,
	sizeDotActive,
	positionListDot = {
		position: "center",
		side: "bottom",
	},
	marginListDot = 0,
}: CarouselProps<T>) {
	const sizeDotDefault = sizeDot ?? 10;
	const sizeDotActiveDefault = sizeDotActive ?? 30;
	const [listStatus, setListStatus] = useState<boolean[]>(data.map(() => false));
	const [listDotSizes, setListDotSizes] = useState<number[]>(data.map(() => sizeDotDefault));

	const renderViewPagerItem = () => {
		return data.map((item, index) => {
			return renderItem(item, index);
		});
	};

	useEffect(() => {
		setListStatus(listStatus.map((_, index, __) => initialPage === index));
		setListDotSizes(
			listDotSizes.map((_, index, __) => (initialPage === index ? sizeDotActiveDefault : sizeDotDefault))
		);
	}, []);

	const onPageScroll = (event: NativeSyntheticEvent<Readonly<{ position: Double; offset: Double }>>) => {
		const { offset, position } = event.nativeEvent;
		onCurrentPage(position); //for set scroll page
		if (position === data.length - 1) return;
		const positionNext = position + 1;

		setListDotSizes(
			listDotSizes.map((_, index, __) => {
				if (index === position) return sizeDotDefault + (sizeDotActiveDefault - sizeDotDefault) * (1 - offset);
				if (index === positionNext) return sizeDotDefault + (sizeDotActiveDefault - sizeDotDefault) * offset;
				return sizeDotDefault;
			})
		);

		setListStatus(
			listStatus.map((_, index, __) => {
				if (index === position) return !(offset > 0.5);
				if (index === positionNext) return offset > 0.5;
				return false;
			})
		);
	};

	return (
		<View style={style.container}>
			{showDot && positionListDot?.side === "top" && (
				<Col>
					<ListDot<T>
						data={data}
						dotSizes={listDotSizes}
						dotStatuses={listStatus}
						colorDot={colorDot}
						colorDotActive={colorDotActive}
						sizeDotDefault={sizeDotDefault}
						position={positionListDot?.position}
					/>
					<Space height={marginListDot} />
				</Col>
			)}
			<PagerView
				style={[style.container]}
				ref={viewPager => {
					if (!viewPager) return;
					viewPagerRef.current = viewPager;
				}}
				initialPage={initialPage}
				onPageScroll={onPageScroll}
			>
				{renderViewPagerItem()}
			</PagerView>
			{showDot && positionListDot?.side === "bottom" && (
				<Col>
					<Space height={marginListDot} />
					<ListDot<T>
						data={data}
						dotSizes={listDotSizes}
						dotStatuses={listStatus}
						colorDot={colorDot}
						colorDotActive={colorDotActive}
						sizeDotDefault={sizeDotDefault}
						position={positionListDot?.position}
					/>
				</Col>
			)}
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Carousel;
