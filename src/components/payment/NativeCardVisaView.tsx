import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions, findNodeHandle, requireNativeComponent, UIManager } from "react-native";
import CardVisaType from "../../types/cardVisa.type";

const CardVisaViewManager = requireNativeComponent<{ style: { width: number; height: number } }>("CardVisaViewManager");

type NativeCardVisaViewProps = CardVisaType & {
	focusCardNumber: boolean;
	focusName: boolean;
	focusExpired: boolean;
	focusCVV: boolean;
};

type CommandsSendData = "sendCardNumber" | "sendName" | "sendExpired" | "sendCVV";
type CommandsSendFocus = "sendFocusCardNumber" | "sendFocusName" | "sendFocusExpired" | "sendFocusCVV";

const mapCommandSendData: Record<CommandsSendData, string> = {
	sendCardNumber: "2",
	sendName: "4",
	sendExpired: "6",
	sendCVV: "8",
};

const mapCommandSendFocus: Record<CommandsSendFocus, string> = {
	sendFocusCardNumber: "3",
	sendFocusName: "5",
	sendFocusExpired: "7",
	sendFocusCVV: "9",
};

export const NativeCardVisaView = ({
	focusCardNumber,
	focusCVV,
	focusName,
	focusExpired,
	cardNumber,
	expired,
	name,
	cvv,
}: NativeCardVisaViewProps) => {
	const ref = useRef(null);

	useEffect(() => {
		createFragment();
	}, []);

	useEffect(() => {
		sendData("sendCardNumber", cardNumber);
	}, [cardNumber]);

	useEffect(() => {
		sendFocus("sendFocusCardNumber", focusCardNumber);
	}, [focusCardNumber]);

	useEffect(() => {
		sendData("sendName", name);
	}, [name]);

	useEffect(() => {
		sendFocus("sendFocusName", focusName);
	}, [focusName]);

	useEffect(() => {
		sendData("sendExpired", expired);
	}, [expired]);

	useEffect(() => {
		sendFocus("sendFocusExpired", focusExpired);
	}, [focusExpired]);

	useEffect(() => {
		sendData("sendCVV", cvv);
	}, [cvv]);

	useEffect(() => {
		sendFocus("sendFocusCVV", focusCVV);
	}, [focusCVV]);

	const createFragment = useCallback(() => {
		const viewId = findNodeHandle(ref.current);
		UIManager.dispatchViewManagerCommand(viewId, "1", [viewId]);
	}, []);

	const sendData = useCallback((command: CommandsSendData, data: string) => {
		const viewId = findNodeHandle(ref.current);
		UIManager.dispatchViewManagerCommand(viewId, mapCommandSendData[command], [data]);
	}, []);

	const sendFocus = useCallback((command: CommandsSendFocus, focus: boolean) => {
		const viewId = findNodeHandle(ref.current);
		UIManager.dispatchViewManagerCommand(viewId, mapCommandSendFocus[command], [focus]);
	}, []);

	return (
		<CardVisaViewManager
			style={{
				height: 240,
				width: Dimensions.get("window").width - 48,
			}}
			ref={ref}
		/>
	);
};
