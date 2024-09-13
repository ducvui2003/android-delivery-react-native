/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:40 PM - 13/09/2024
 * User: lam-nguyen
 **/

import React, { useCallback, useEffect } from "react";
import GradientView from "../gradientView/GradientView";
import Row from "../custom/Row";
import { gradient, white } from "../../configs/colors/color-template.config";
import CardVisaProps from "./type/cardVisa.Props";
import LogosVisa from "../../../assets/images/icons/LogosVisa";
import CardNumber from "./CardNumber";
import Col from "../custom/Col";
import { StyleSheet, Text } from "react-native";
import spacing from "../../configs/styles/space.config";
import BorderConfig from "../../configs/styles/border.config";
import textStyle from "../../configs/styles/textStyle.config";
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

function CardVisa({ cardNumber, name, expired, focusCardNumber, focusName, focusExpired }: CardVisaProps) {
	const opacityAnim = useSharedValue(0);

	const animatedOpacity = useAnimatedStyle(() => ({
		opacity: opacityAnim.value / 100,
	}));

	useEffect(() => {
		if (!focusName && !focusExpired && !focusName) cancelAnimation(opacityAnim);
		else runAnimationOpacity();
	}, [focusName, focusExpired, focusName]);

	const runAnimationOpacity = useCallback(() => {
		opacityAnim.value = 1;
		opacityAnim.value = withRepeat(
			withSequence(withTiming(100, { duration: 400 }), withTiming(0, { duration: 400 })),
			-1
		);
	}, []);

	return (
		<GradientView gradientColors={gradient.getColor()} style={[styles.container]}>
			<Row style={[styles.logoContainer]}>
				<LogosVisa width={50} height={50} color={white.getColor()} />
			</Row>
			<CardNumber cardNumber={cardNumber} focus={focusCardNumber} />
			<Row style={[styles.dateAndCVVContainer]}>
				<Col style={{ gap: spacing["spaced-1"] }}>
					<Text style={{ ...textStyle["12_regular"], color: white.getColor() }}>Cardholder Name</Text>
					{focusName ? (
						<Row>
							<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>{name}</Text>
							<Animated.Text
								style={[{ ...textStyle["16_semibold"], color: white.getColor() }, animatedOpacity]}
							>
								_
							</Animated.Text>
						</Row>
					) : (
						<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>{name || "_"}</Text>
					)}
				</Col>
				<Col style={{ gap: spacing["spaced-1"], alignItems: "flex-end" }}>
					<Text style={{ ...textStyle["12_regular"], color: white.getColor() }}>Expiry Date</Text>
					{focusExpired && expired.length < 5 ? (
						<Row>
							<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>{expired}</Text>
							<Animated.Text
								style={[{ ...textStyle["16_semibold"], color: white.getColor() }, animatedOpacity]}
							>
								_
							</Animated.Text>
							<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>
								{"--/--".substring(expired.length + 1)}
							</Text>
						</Row>
					) : (
						<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>
							{expired + "--/--".substring(expired.length)}
						</Text>
					)}
				</Col>
			</Row>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		padding: spacing["spaced-5"],
		borderRadius: BorderConfig.radius["rounded-2"],
	},
	logoContainer: {
		justifyContent: "flex-end",
		marginBottom: spacing["spaced-4"],
	},
	dateAndCVVContainer: {
		justifyContent: "space-between",
		marginTop: spacing["spaced-5"],
	},
});

export default CardVisa;
