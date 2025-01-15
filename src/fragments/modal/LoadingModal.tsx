/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:26 PM - 10/01/2025
 *  User: lam-nguyen
 **/

import React from "react";
import Modal from "../../components/modal/Modal";
import { Image, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { primary } from "../../configs/colors/color-template.config";
// eslint-disable-next-line import/no-unresolved
import loadingImage from "../../../assets/images/loading.gif";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function LoadingModal() {
	const loading = useSelector((state: RootState) => state.modalState);

	return (
		<Modal
			active={loading.isLoading}
			displayCancelButton={false}
			width={"50%"}
			background={{
				backgroundColor: "rgb(33,42,55)",
				opacity: 0.5,
			}}
			contentStyle={{
				backgroundColor: "rgba(250, 249, 246, 1)",
			}}
		>
			<Text
				style={[
					{
						...textStyle["22_semibold"],
						color: primary.getColor("500"),
						letterSpacing: 1.5,
					},
				]}
			>
				Loading
			</Text>
			<Image
				source={loadingImage}
				style={{
					width: 100,
					height: 100,
				}}
			/>
		</Modal>
	);
}

export default LoadingModal;
