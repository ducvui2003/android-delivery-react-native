/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:04 PM - 05/09/2024
 *  User: lam-nguyen
 **/
import { StyleSheet, Text } from "react-native";
import * as React from "react";
import { useEffect } from "react";
import Col from "../custom/Col";
import Row from "../custom/Row";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";
import LineRatingProps from "./type/lineRating.props";
import LineRatingItem from "./LineRatingItem";

function LineRating({ data = [] }: LineRatingProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	useEffect(() => {
		if (data.reduce((acc, cur) => acc + cur.percent, 0) !== 100) {
			throw new Error("The sum of percent must be 100");
		}
	}, [data]);

	return (
		<Col flex={0}>
			{data.map((item, index) => (
				<Row key={index} style={[styles.container]} flex={0}>
					<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>{item.title}</Text>
					<LineRatingItem percent={item.percent} />
				</Row>
			))}
		</Col>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: 10,
	},
});

export default LineRating;
