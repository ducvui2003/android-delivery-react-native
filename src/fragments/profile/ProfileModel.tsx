/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:52 PM - 12/11/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import { white } from "../../configs/colors/color-template.config";
import { StyleSheet, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../../components/custom/Row";
import ButtonHasStatus from "../../components/custom/ButtonHasStatus";
import Modal from "../../components/modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import NumberValue from "../../configs/value/number.value";

function ProfileModel({
	onYes,
	showed = false,
	onShowed,
}: {
	onYes: () => void;
	onShowed?: (value: boolean) => void;
	showed?: boolean;
}) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const theme = useSelector((state: RootState) => state.themeState.theme);

	useEffect(() => {
		setShowModal(showed);
	}, [showed]);

	useEffect(() => {
		onShowed?.(showModal);
	}, [showModal]);

	return (
		<Modal
			active={showModal}
			onEndHide={() => {
				setShowModal(false);
			}}
			background={{
				backgroundColor: white.getColor(),
				opacity: 0.2,
			}}
		>
			<Text style={[{ ...textStyle["22_semibold"] }]}>Logout</Text>
			<Text style={[{ ...textStyle["16_semibold"] }]}>Are you sure you want to log out?</Text>

			<Row flex={0} style={[{ justifyContent: "space-between", width: "100%" }]}>
				<ButtonHasStatus
					styleButton={styles.buttonModal}
					styleButtonActive={{
						backgroundColor: white.getColor(),
					}}
					styleText={{
						color: theme.text_1.getColor(),
						...textStyle["18_regular"],
					}}
					title={"Cancel"}
					active={true}
					onPress={() => setShowModal(false)}
				/>
				<ButtonHasStatus styleButton={styles.buttonModal} title={"Yes"} active={true} onPress={onYes} />
			</Row>
		</Modal>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		justifyContent: "center",
	},
	buttonModal: {
		marginBottom: 0,
		width: "47%",
	},
});

export default ProfileModel;
