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
import { gradient, gradientBorder, neutral, white } from "../../configs/colors/color-template.config";
import CardVisaProps from "./type/cardVisa.Props";
import LogosVisa from "../../../assets/images/icons/LogosVisa";
import CardNumber from "./CardNumber";
import Col from "../custom/Col";
import { StyleSheet, Text, View } from "react-native";
import spacing from "../../configs/styles/space.config";
import BorderConfig from "../../configs/styles/border.config";
import textStyle from "../../configs/styles/textStyle.config";
import Animated, {
	cancelAnimation,
	runOnJS,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import Cell from "./Cell";

function CardVisa({
	cardNumber,
	name,
	expired,
	cvv,
	focusCardNumber,
	focusName,
	focusExpired,
	focusCvv = false,
}: CardVisaProps) {
	const opacityAnim = useSharedValue(0);
	const rotateAmin = useSharedValue(0);
	const [zIndex, setZIndex] = React.useState(2);

	const animatedOpacity = useAnimatedStyle(() => ({
		opacity: opacityAnim.value / 100,
	}));

	const useAnimatedRotate = (value: number) =>
		useAnimatedStyle(() => ({
			transform: [{ rotateY: `${rotateAmin.value + value}deg` }],
		}));

	useEffect(() => {
		if (!focusName && !focusExpired && !focusName) cancelAnimation(opacityAnim);
		else runAnimationOpacity();
	}, [focusName, focusExpired, focusName]);

	useEffect(() => {
		runAnimationRotate(focusCvv);
	}, [focusCvv]);

	const runAnimationOpacity = useCallback(() => {
		opacityAnim.value = 1;
		opacityAnim.value = withRepeat(
			withSequence(withTiming(100, { duration: 400 }), withTiming(0, { duration: 400 })),
			-1
		);
	}, []);

	const runAnimationRotate = useCallback((value: boolean) => {
		cancelAnimation(opacityAnim);
		rotateAmin.value = withTiming(value ? 180 : 0, { duration: 1000 });
	}, []);

	const onMiddleAnimation = (value: boolean) => {
		setZIndex(value ? -2 : 2);
	};

	useAnimatedReaction(
		() => rotateAmin.value,
		currentValue => {
			runOnJS(onMiddleAnimation)(currentValue >= 90);
		}
	);

	return (
		<View style={[{ position: "relative" }]}>
			<Animated.View style={[useAnimatedRotate(0), { zIndex }]}>
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
										style={[
											{ ...textStyle["16_semibold"], color: white.getColor() },
											animatedOpacity,
										]}
									>
										_
									</Animated.Text>
								</Row>
							) : (
								<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>
									{name || "_"}
								</Text>
							)}
						</Col>
						<Col style={{ gap: spacing["spaced-1"], alignItems: "flex-end" }}>
							<Text style={{ ...textStyle["12_regular"], color: white.getColor() }}>Expiry Date</Text>
							{focusExpired && expired.length < 5 ? (
								<Row>
									<Text style={{ ...textStyle["16_semibold"], color: white.getColor() }}>
										{expired}
									</Text>
									<Animated.Text
										style={[
											{ ...textStyle["16_semibold"], color: white.getColor() },
											animatedOpacity,
										]}
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
			</Animated.View>
			<Animated.View
				style={[
					{
						position: "absolute",
						zIndex: -zIndex,
						width: "100%",
						height: "100%",
					},
					useAnimatedRotate(180),
				]}
			>
				<GradientView gradientColors={gradient.getColor()} style={[styles.containerAfter]}>
					<Row
						style={[
							styles.logoContainer,
							{ paddingTop: spacing["spaced-3"], paddingRight: spacing["spaced-5"] },
						]}
						flex={0}
					>
						<LogosVisa width={50} height={50} color={white.getColor()} />
					</Row>
					<GradientView
						gradientColors={gradientBorder.getColor()}
						style={{
							paddingVertical: spacing["spaced-2"],
							flexDirection: "row",
							justifyContent: "flex-end",
							alignItems: "center",
							paddingHorizontal: spacing["spaced-4"],
						}}
					>
						{Array.from({ length: 3 }, (_, index) => (
							<Cell
								key={`cvv_${index}`}
								value={
									Number.isNaN(Number.parseInt(cvv.charAt(index)))
										? -1
										: Number.parseInt(cvv.charAt(index))
								}
								color={neutral.getColor("900")}
								focus={focusCvv && index === cvv.length}
							/>
						))}
					</GradientView>
				</GradientView>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		padding: spacing["spaced-5"],
		borderRadius: BorderConfig.radius["rounded-2"],
	},
	containerAfter: {
		flexDirection: "column",
		borderRadius: BorderConfig.radius["rounded-2"],
		width: "100%",
		height: "100%",
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
