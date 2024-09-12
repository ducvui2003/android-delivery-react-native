/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:12 PM - 21/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect } from "react";
import Row from "../custom/Row";
import SolarClockCircleLinear from "../../../assets/images/icons/SolarClockCircleLinear";
import { StyleSheet, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import CountDownProps from "./type/countDown.props";

export function CountDown({ icon, time, style, textStyle, onEnd }: CountDownProps) {
	const [count, setCount] = React.useState<number>(time);

	const formatTime = () => {
		const hour = Math.floor(count / 60);
		const minute = count >= 60 ? count % (hour * 60) : count;
		return `${hour < 10 ? "0" + hour : hour} : ${minute < 10 ? "0" + minute : minute}`;
	};

	useEffect(() => {
		if (time === 0) return;

		const start = new Date().getTime();
		const interval = setInterval(() => {
			const now = new Date().getTime();
			if (Math.floor((now - start) / 1000) === count) {
				onEnd?.();
				clearInterval(interval);
				return;
			}
			setCount(prevState => prevState - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [count]);

	useEffect(() => {
		setCount(time);
	}, [time]);

	return (
		<Row style={[styles.timeOutContainer, style]}>
			{icon ?? <SolarClockCircleLinear color={"black"} strokeWidth={2} />}
			<Text style={[styles.text, styles.textSimiBold, { color: "black" }, textStyle]}>{formatTime()}</Text>
		</Row>
	);
}

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
		...textStyle["16_regular"],
	},
	textSimiBold: {
		fontWeight: "bold",
	},
	timeOutContainer: {
		justifyContent: "center",
		gap: 16,
		marginVertical: 24,
	},
});
