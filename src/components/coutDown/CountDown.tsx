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
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";

type Props = {
	icon?: React.ReactNode;
	time: number;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	onEnd?: () => void;
};

export function CountDown({ icon, time, style, textStyle, onEnd }: Props) {
	const formatTime = () => {
		const hour = Math.floor(time / 60);
		const minute = time >= 60 ? time % (hour * 60) : time;
		return `${hour < 10 ? "0" + hour : hour} : ${minute < 10 ? "0" + minute : minute}`;
	};

	useEffect(() => {
		if (time === 0) return;

		const start = new Date().getTime();
		const interval = setInterval(() => {
			const now = new Date().getTime();
			onEnd?.();

			if (Math.floor((now - start) / 1000) === time) {
				clearInterval(interval);
				return;
			}
		}, 1000);

		return () => clearInterval(interval);
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
