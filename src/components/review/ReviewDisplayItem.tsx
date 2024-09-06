/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:54 AM - 06/09/2024
 *  User: lam-nguyen
 **/

import * as React from "react";
import ReviewDisplayItemProps from "./type/reviewDisplayItem.props";
import { Image, StyleSheet, Text, View } from "react-native";
import Col from "../custom/Col";
import Row from "../custom/Row";
import SolarUserCircleBold from "../../../assets/images/icons/SolarUserCircleBold";
import IconRating from "../rating/IconRating";
import { neutral, secondary } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import textStyle from "../../configs/styles/textStyle.config";

function ReviewDisplayItem({ image, name, date, rating, comment }: ReviewDisplayItemProps) {
	const theme = useSelector((root: RootState) => root.themeState.theme);

	return (
		<Col style={{ gap: 10 }}>
			<Row>
				<Row style={{ gap: 5 }}>
					<View style={{ width: 50, height: 50, overflow: "hidden", borderRadius: 9999 }}>
						{image ? (
							<Image
								source={{
									uri: image,
								}}
								style={{ width: "100%", height: "100%" }}
							/>
						) : (
							<SolarUserCircleBold width={50} height={50} />
						)}
					</View>
					<Col style={[{ justifyContent: "space-around" }]}>
						<Text style={[{ ...textStyle["16_semibold"], color: theme.text_1.getColor() }]}>{name}</Text>
						<Text style={[{ ...textStyle["16_semibold"], color: neutral.getColor("200") }]}>{date}</Text>
					</Col>
				</Row>
				<View style={[{ width: 80 }]}>
					<IconRating
						rating={rating}
						total={5}
						iconSize={15}
						colorSelected={secondary.getColor("500")}
						colorUnselected={theme.review.colorRatingUnSelected.getColor()}
					/>
				</View>
			</Row>
			<Text style={[{ ...textStyle["16_regular"], color: theme.text_1.getColor(), lineHeight: 22 }]}>
				{comment}
			</Text>
		</Col>
	);
}

const styles = StyleSheet.create({});

export default ReviewDisplayItem;
