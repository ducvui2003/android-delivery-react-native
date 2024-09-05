/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:18 PM - 17/08/2024
 *  User: lam-nguyen
 **/

import React from "react";
import { View } from "react-native";
import SpaceProps from "./type/space.props";

function Space({ width, height }: SpaceProps) {
	return <View style={{ height: height, width: width }} />;
}

export default Space;
