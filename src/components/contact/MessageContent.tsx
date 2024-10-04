/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:33 PM - 04/10/2024
 *  User: lam-nguyen
 **/
import Row from "../custom/Row";
import Col from "../custom/Col";
import { Image, StyleSheet, Text } from "react-native";
import spacing from "../../configs/styles/space.config";
import SolarCheckReadLinear from "../../../assets/images/icons/SolarCheckReadOutline";
import { neutral, primary, white } from "../../configs/colors/color-template.config";
import React from "react";
import textStyle from "../../configs/styles/textStyle.config";
import MessageContentProps from "./type/messageContent.props";

export default function MessageContent({ role, time, contents, images }: MessageContentProps) {
	const listContents = Array.isArray(contents) ? contents : [contents];
	const listImages = Array.isArray(images) ? images : images ? [images] : [];

	return (
		<Row style={{ justifyContent: role === "SENDER" ? "flex-end" : "flex-start" }} flex={0}>
			<Col
				style={[
					styles.messageContainer,
					role === "SENDER" ? styles.messageContainerSender : styles.messageContainerReceive,
				]}
			>
				<Col>
					{listContents.map((content, index) => (
						<Text
							key={`content_${index}`}
							style={[styles.text, role === "SENDER" ? styles.textSender : styles.textReceive]}
						>
							{content}
						</Text>
					))}
				</Col>
				<Row style={[{ gap: spacing["spaced-2"], flexWrap: "wrap" }]}>
					{listImages.map((image, index) => (
						<Image
							key={`image_${index}`}
							src={image}
							style={[{ width: 80, height: 80, borderRadius: spacing["spaced-3"] }]}
						/>
					))}
				</Row>
				<Row style={[{ gap: spacing["spaced-2"] }]}>
					<Text style={[styles.time, role === "SENDER" ? styles.timeSender : styles.timeReceive]}>
						{time}
					</Text>
					{role === "SENDER" && (
						<SolarCheckReadLinear width={15} height={15} color={neutral.getColor("50")} />
					)}
				</Row>
			</Col>
		</Row>
	);
}

const styles = StyleSheet.create({
	messageContainer: {
		borderRadius: spacing["spaced-5"],
		gap: spacing["spaced-2"],
		padding: spacing["spaced-3"],
		maxWidth: "82%",
	},
	messageContainerSender: {
		borderBottomRightRadius: 0,
		backgroundColor: primary.getColor("500"),
		alignItems: "flex-end",
	},
	messageContainerReceive: {
		borderBottomLeftRadius: 0,
		backgroundColor: white.getColor(),
	},
	text: { ...textStyle["16_regular"] },
	time: { ...textStyle["12_regular"] },
	textSender: {
		color: white.getColor(),
	},
	timeSender: {
		color: neutral.getColor("50"),
	},
	textReceive: {
		color: neutral.getColor("900"),
	},
	timeReceive: {
		color: neutral.getColor("100"),
	},
});
