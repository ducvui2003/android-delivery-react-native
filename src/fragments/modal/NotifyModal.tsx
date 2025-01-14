/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:29 PM - 10/01/2025
 *  User: lam-nguyen
 **/

import React, { isValidElement } from "react";
import { white } from "../../configs/colors/color-template.config";
import { StyleSheet, Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../../components/custom/Row";
import ButtonHasStatus from "../../components/custom/ButtonHasStatus";
import Modal from "../../components/modal/Modal";
import { RootState, useAppDispatch } from "../../configs/redux/store.config";
import { useSelector } from "react-redux";
import NumberValue from "../../configs/value/number.value";
import { hiddenModalNotify } from "../../hooks/redux/modal.slice";

function NotifyModal() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const model = useSelector((state: RootState) => state.modalState.notify);
	const dispatch = useAppDispatch();

	return (
		<Modal
			active={model.active ?? false}
			onEndHide={() => {
				dispatch(hiddenModalNotify());
				model.onEndHide?.();
			}}
			background={
				model.background ?? {
					backgroundColor: white.getColor(),
					opacity: 0.2,
				}
			}
			{...model}
		>
			{isValidElement(model.title) ? (
				model.title
			) : (
				<Text style={[{ ...textStyle["22_semibold"] }]}>{model.title}</Text>
			)}
			{isValidElement(model.body) ? (
				model.body
			) : (
				<Text style={[{ ...textStyle["16_semibold"] }]}>{model.body}</Text>
			)}

			<Row
				flex={0}
				style={[
					{
						justifyContent:
							model.showCancelButton && model.showConfirmButton ? "space-between" : "flex-end",
						width: "100%",
					},
				]}
			>
				{model.showCancelButton && (
					<ButtonHasStatus
						styleButton={styles.buttonModal}
						styleButtonActive={{
							backgroundColor: white.getColor(),
						}}
						styleText={{
							color: theme.text_1.getColor(),
							...textStyle["18_regular"],
						}}
						title={model.titleCancel ?? "Cancel"}
						active={true}
						onPress={() => {
							if (model.onCancel) {
								const close = model.onCancel();
								if (close) dispatch(hiddenModalNotify());
							} else {
								dispatch(hiddenModalNotify());
							}
						}}
					/>
				)}
				{model.showConfirmButton && (
					<ButtonHasStatus
						styleButton={styles.buttonModal}
						title={model.titleConfirm ?? "Yes"}
						active={true}
						onPress={() => {
							if (!model.onConfirm) {
								dispatch(hiddenModalNotify());
								return;
							}

							if (model.onConfirm()) dispatch(hiddenModalNotify());
						}}
					/>
				)}
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

export default NotifyModal;
