/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:20 AM - 26/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { Image, View } from "react-native";
import pin from "../../../assets/images/icons/Pin.png";
import SolarUserCircleBold from "../../../assets/images/icons/SolarUserCircleBold";
import { secondary } from "../../configs/colors/color-template.config";
import PickerProps from "./type/picker.props";

export function Picker({ size = 60, icon, sizeIcon = size - 10, top = 2, left = 5 }: PickerProps) {
	return (
		<View style={{ position: "relative", width: size, height: size + 3 }}>
			<Image source={pin} style={{ height: size, width: size }} />
			<View
				style={{
					borderRadius: 999,
					width: sizeIcon,
					height: sizeIcon,
					position: "absolute",
					top: top,
					left: left,
				}}
			>
				{icon || <SolarUserCircleBold width={"100%"} height={"100%"} color={secondary.getColor("500")} />}
			</View>
		</View>
	);
}
