/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:20 PM - 18/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import GradientView from "../components/gradientView/GradientView";
import { gradient, gradient2, neutral, primary, secondary, white } from "../configs/colors/color-template.config";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SolarUserCircleBold from "../../assets/images/icons/SolarUserCircleBold";
import textStyle from "../configs/styles/textStyle.config";
import Col from "../components/custom/Col";
import Row from "../components/custom/Row";
import spacing from "../configs/styles/space.config";
import SolarStarBold from "../../assets/images/icons/SolarStarBold";
import SolarChatDotsLinear from "../../assets/images/icons/SolarChatDotsLinear";
import SolarPhoneLinear from "../../assets/images/icons/SolarPhoneLinear";
import StepProcess from "../components/process/StepProcess";
import SolarShopBold from "../../assets/images/icons/SolarShopBold";
import SolarBoxBold from "../../assets/images/icons/SolarBoxBold";
import SolarScooterBold from "../../assets/images/icons/SolarScooterBold";
import SolarCheckCircleBold from "../../assets/images/icons/SolarCheckCircleBold";
import GradientBorder from "../components/gradientBorder/GradientBorder";
import GradientText from "../components/gradientText/GradientText";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import DriverInfoType from "../types/driverInfo.type";
import lamnguyen from "../../assets/images/lamnguyen.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";

type OrderTrackingFragmentProps = {
	driver?: (value?: DriverInfoType) => void;
};

type DriverInfoHasRatingType = DriverInfoType & { rating: number };

function OrderTrackingFragment({ driver }: OrderTrackingFragmentProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [currentDriver, setCurrentDriver] = useState<DriverInfoHasRatingType>();
	const [animationTextFindingDriver, setAnimationTextFindingDriver] = useState("Finding Driver ...");

	useEffect(() => {
		const findDriverInterval = runAnimationTextFindingDriver();
		//Call api
		setTimeout(() => {
			setCurrentDriver(dataDemo);
			clearInterval(findDriverInterval);
		}, 10000);
	}, []);

	useEffect(() => {
		driver?.(currentDriver);
	}, [currentDriver]);

	const runAnimationTextFindingDriver = () => {
		return setInterval(() => {
			setAnimationTextFindingDriver(prev => {
				console.log(prev);
				if (prev === "Finding Driver ...") {
					return "Finding Driver ";
				} else {
					return prev + ".";
				}
			});
		}, 500);
	};

	return (
		<Col style={{ justifyContent: "space-between", overflow: "hidden" }} flex={1}>
			<GradientView
				end={{ x: 0, y: 0 }}
				start={{ x: 1, y: 0 }}
				gradientColors={gradient2.getColor()}
				style={[styles.driverContainer]}
			>
				{!currentDriver ? (
					<>
						<View
							style={{
								borderRadius: 9999,
								backgroundColor: white.getColor(),
								width: 40,
								height: 40,
							}}
						>
							<SolarUserCircleBold
								color={neutral.getColor("50")}
								width={50}
								height={50}
								style={{ top: -5, left: -5 }}
							/>
						</View>
						<Text style={[{ color: white.getColor(), ...textStyle["16_semibold"] }]}>
							{animationTextFindingDriver}
						</Text>
					</>
				) : (
					<>
						<Image
							source={currentDriver.image as ImageSourcePropType}
							style={{ width: 50, height: 50, borderRadius: 9999 }}
						/>
						<Col style={{ justifyContent: "space-between" }} flex={1}>
							<Text style={{ ...textStyle["16_semibold"] }}>{currentDriver.name}</Text>
							<Row style={[{ gap: spacing["spaced-4"] }]}>
								<Row style={{ alignItems: "center", gap: spacing["spaced-1"] }} flex={0}>
									<SolarStarBold width={17} height={17} color={secondary.getColor("900")} />
									<Text style={{ ...textStyle["12_regular"], color: secondary.getColor("900") }}>
										{currentDriver.rating}
									</Text>
								</Row>

								<Row style={{ alignItems: "center", gap: spacing["spaced-1"] }} flex={0}>
									<Text style={{ ...textStyle["12_regular"], color: secondary.getColor("900") }}>
										ID
									</Text>
									<Text style={{ ...textStyle["12_regular"], color: secondary.getColor("900") }}>
										{currentDriver.id}
									</Text>
								</Row>
							</Row>
						</Col>
						<Row style={{ gap: spacing["spaced-2"] }} flex={0}>
							<TouchableOpacity style={[styles.buttonActionDriver]}>
								<SolarChatDotsLinear width={30} height={30} />
							</TouchableOpacity>
							<TouchableOpacity style={[styles.buttonActionDriver]}>
								<SolarPhoneLinear width={30} height={30} />
							</TouchableOpacity>
						</Row>
					</>
				)}
			</GradientView>
			<StepProcess
				style={{ marginHorizontal: spacing["spaced-4"] }}
				currentStep={2}
				iconSize={30}
				stylesIcon={{ padding: spacing["spaced-1"] }}
				iconStep={[<SolarShopBold />, <SolarBoxBold />, <SolarScooterBold />, <SolarCheckCircleBold />]}
			/>
			<Row style={[{ justifyContent: "space-between" }]} flex={0}>
				<Text style={{ color: theme.text_1.getColor(), ...textStyle["16_semibold"] }}>
					Estimated Delivery Time
				</Text>
				<Text style={{ color: theme.text_4.getColor(), ...textStyle["16_regular"] }}>10:25</Text>
			</Row>
			<Row style={[{ justifyContent: "space-between" }]} flex={0}>
				<Text style={{ color: theme.text_1.getColor(), ...textStyle["16_semibold"] }}>My Order</Text>
				<TouchableOpacity>
					<GradientBorder gradientColors={gradient.getColor()}>
						<View style={[styles.buttonDetail]}>
							<GradientText
								style={[{ ...textStyle["12_regular"] }]}
								text={"Details"}
								gradientColors={gradient.getColor()}
							/>
						</View>
					</GradientBorder>
				</TouchableOpacity>
			</Row>
			<ButtonHasStatus
				title={"Cancel Order"}
				active={!currentDriver}
				styleText={[{ color: primary.getColor("500") }]}
				styleButton={[styles.buttonCancel]}
				styleButtonNotActive={[{ opacity: 0.3 }]}
			/>
		</Col>
	);
}

const styles = StyleSheet.create({
	buttonCancel: {
		backgroundColor: white.getColor(),
	},
	driverContainer: {
		flexDirection: "row",
		padding: spacing["spaced-2"],
		borderRadius: 999,
		alignItems: "center",
		gap: spacing["spaced-3"],
	},
	avatarDriverContainer: {
		borderRadius: 9999,
		backgroundColor: white.getColor(),
		width: 40,
		height: 40,
	},
	buttonActionDriver: {
		backgroundColor: white.getColor(0.1),
		padding: spacing["spaced-2"],
		borderRadius: 9999,
	},
	buttonDetail: {
		paddingHorizontal: spacing["spaced-2"],
		paddingVertical: spacing["spaced-1"],
	},
});

export default OrderTrackingFragment;

const dataDemo: DriverInfoHasRatingType = {
	image: lamnguyen,
	name: "Nguyen Dinh Lam",
	id: "DW2125",
	rating: 4.9,
};
