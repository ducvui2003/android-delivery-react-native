/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:27 PM - 04/10/2024
 * User: lam-nguyen
 **/

import React from "react";
import Row from "../components/custom/Row";
import Col from "../components/custom/Col";
import spacing from "../configs/styles/space.config";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import GradientView from "../components/gradientView/GradientView";
import { gradient, gradient2, primary, white } from "../configs/colors/color-template.config";
import SolarCameraBold from "../../assets/images/icons/SolarCameraBold";
import textStyle from "../configs/styles/textStyle.config";
import SolarMapPointBold from "../../assets/images/icons/SolarMapPointBold";
import SolarMicrophone2Bold from "../../assets/images/icons/SolarMicrophone2Bold";
import SolarGalleryBold from "../../assets/images/icons/SolarGalleryBold";
import SolarAddLinear from "../../assets/images/icons/SolarAddLinear";
import InputIcon from "../components/input/InputIcon";
import SolarPlain3Bold from "../../assets/images/icons/SolarPlain3Bold";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";

function ChatScreenFragment({
	showMoreOption = false,
	setShowMoreOption,
	onSend,
	onBlur,
	onFocus,
	onTextChange,
}: {
	showMoreOption?: boolean;
	setShowMoreOption?: (value: boolean) => void;
	onSend?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onTextChange?: (text: string) => void;
}) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	return (
		<Row style={[styles.footerContainer]} flex={0}>
			<Col
				style={[
					{
						backgroundColor: theme.basket.backgroundFooter.getColor(),
						display: showMoreOption ? "flex" : "none",
					},
					styles.addFrame,
				]}
			>
				<Row style={[{ gap: spacing["spaced-8"] }]}>
					<TouchableOpacity style={[styles.buttonOptionContainer]}>
						<GradientView gradientColors={gradient2.getColor()} style={[styles.buttonOption]}>
							<SolarCameraBold width={35} height={35} color={white.getColor()} />
						</GradientView>
						<Text style={[{ color: theme.text_3.getColor(), ...textStyle["12_regular"] }]}>Camera</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.buttonOptionContainer]}>
						<GradientView gradientColors={gradient2.getColor()} style={[styles.buttonOption]}>
							<SolarMapPointBold width={35} height={35} color={white.getColor()} />
						</GradientView>
						<Text style={[{ color: theme.text_3.getColor(), ...textStyle["12_regular"] }]}>
							My Location
						</Text>
					</TouchableOpacity>
				</Row>
				<Row style={[{ gap: spacing["spaced-8"] }]}>
					<TouchableOpacity style={[styles.buttonOptionContainer]}>
						<GradientView gradientColors={gradient2.getColor()} style={[styles.buttonOption]}>
							<SolarMicrophone2Bold width={35} height={35} color={white.getColor()} />
						</GradientView>
						<Text style={[{ color: theme.text_3.getColor(), ...textStyle["12_regular"] }]}>Record</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.buttonOptionContainer]}>
						<GradientView gradientColors={gradient2.getColor()} style={[styles.buttonOption]}>
							<SolarGalleryBold width={35} height={35} color={white.getColor()} />
						</GradientView>
						<Text style={[{ color: theme.text_3.getColor(), ...textStyle["12_regular"] }]}>Gallery</Text>
					</TouchableOpacity>
				</Row>
			</Col>
			<TouchableOpacity
				style={[{ padding: spacing["spaced-2"] }]}
				onPress={() => setShowMoreOption?.(!showMoreOption)}
			>
				<SolarAddLinear width={30} height={30} color={primary.getColor("500")} />
			</TouchableOpacity>
			<Row flex={1}>
				<InputIcon
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={e => onTextChange?.(e.nativeEvent.text)}
					styleInput={[styles.input]}
					placeholder={"Type a message ..."}
					multiline={true}
					numberOfLines={2}
				/>
			</Row>
			<TouchableOpacity onPress={onSend}>
				<GradientView gradientColors={gradient.getColor()} style={[styles.buttonSend]}>
					<SolarPlain3Bold width={30} height={30} color={white.getColor()} />
				</GradientView>
			</TouchableOpacity>
		</Row>
	);
}

const styles = StyleSheet.create({
	footerContainer: {
		gap: spacing["spaced-3"],
		paddingHorizontal: spacing["spaced-5"],
		paddingTop: spacing["spaced-4"],
		paddingBottom: spacing["spaced-7"],
		alignItems: "center",
	},
	input: {
		...textStyle["16_regular"],
		paddingHorizontal: spacing["spaced-3"],
		flex: 1,
		height: 45,
	},
	buttonSend: {
		borderRadius: 9999,
		padding: spacing["spaced-2"],
	},
	addFrame: {
		position: "absolute",
		top: "-300%",
		left: "5%",
		borderRadius: spacing["spaced-5"],
		padding: spacing["spaced-5"],
		rowGap: spacing["spaced-5"],
	},
	buttonOptionContainer: {
		alignItems: "center",
		gap: spacing["spaced-2"],
	},
	buttonOption: {
		borderRadius: 9999,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ChatScreenFragment;
