/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:07 PM - 13/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import CardVisaType from "../../types/cardVisa.type";
import InputIcon from "../../components/input/InputIcon";
import Col from "../../components/custom/Col";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import spacing from "../../configs/styles/space.config";
import textStyle from "../../configs/styles/textStyle.config";
import Row from "../../components/custom/Row";
import SolarCalendar from "../../../assets/images/icons/SolarCalendar";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { NativeCardVisaView } from "../../components/payment/NativeCardVisaView";

type AddPaymentMethodProps = {
	focus?: (values: boolean) => void;
	onDataChange?: (values: CardVisaType) => void;
	onDoneInput?: (values?: CardVisaType) => void;
	clearData?: boolean;
};

function AddPaymentMethodFragment({ focus, onDataChange, onDoneInput, clearData = false }: AddPaymentMethodProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [cardNumber, setCardNumber] = useState("");
	const [name, setName] = useState("");
	const [expired, setExpired] = useState("");
	const [cvv, setCvv] = useState("");
	const [focusCardNumber, setFocusCardNumber] = useState(false);
	const [focusName, setFocusName] = useState(false);
	const [focusExpired, setFocusExpired] = useState(false);
	const [focusCVV, setFocusCVV] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	useEffect(() => {
		const data: CardVisaType = {
			cardNumber,
			name,
			expired,
			cvv,
		};

		onDataChange?.(data);
		if (cardNumber.length === 16 && name && expired.length === 5 && cvv.length === 3) onDoneInput?.(data);
		else onDoneInput?.();
	}, [cardNumber, name, expired, cvv]);

	useEffect(() => {
		focus?.(focusCardNumber || focusName || focusExpired || focusCVV);
	}, [focusCardNumber, focusName, focusExpired, focusCVV]);

	useEffect(() => {
		if (clearData) {
			setCardNumber("");
			setName("");
			setExpired("");
			setCvv("");
		}
	}, [clearData]);

	const formatExpired = (date: Date) => {
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${month < 10 ? "0" + month : month}/${year.toString().substring(2)}`;
	};

	return (
		<Col>
			<NativeCardVisaView
				cardNumber={cardNumber}
				name={name}
				expired={expired}
				cvv={cvv}
				focusCardNumber={focusCardNumber}
				focusName={focusName}
				focusExpired={focusExpired}
				focusCVV={focusCVV}
			/>

			<Col style={[styles.inputContainer]}>
				<Col style={[styles.groupInputContainer]}>
					<Text style={[styles.label, { color: theme.text_4.getColor() }]}>Card Number</Text>
					<InputIcon
						placeholder={"**** **** **** ****"}
						value={cardNumber}
						keyboardType={"numeric"}
						onFocus={() => setFocusCardNumber(true)}
						onBlur={() => setFocusCardNumber(false)}
						onChange={event => {
							const text = event.nativeEvent.text;
							if (
								(text.length > cardNumber.length &&
									text.length <= 16 &&
									text.substring(text.length - 1).match("\\d")) ||
								text.length < cardNumber.length
							)
								setCardNumber(text);
						}}
					/>
				</Col>
				<Col style={[styles.groupInputContainer]}>
					<Text style={[styles.label, { color: theme.text_4.getColor() }]}>Cardholder Name</Text>
					<InputIcon
						placeholder={"Enter Cardholder Name"}
						value={name}
						onFocus={() => setFocusName(true)}
						onBlur={() => setFocusName(false)}
						onChange={event => {
							const text = event.nativeEvent.text;
							setName(text);
						}}
					/>
				</Col>
				<Row style={[{ gap: spacing["spaced-2"] }]}>
					<Col style={[styles.groupInputContainer]} flex={2}>
						<Text style={[styles.label, { color: theme.text_4.getColor() }]}>Expiry Date / Valid Thru</Text>
						<InputIcon
							placeholder={"--/--"}
							iconRight={<SolarCalendar color={theme.text_1.getColor()} />}
							onPressIconRight={() => setShowDatePicker(true)}
							value={expired}
							keyboardType={"numeric"}
							onFocus={() => setFocusExpired(true)}
							onBlur={() => setFocusExpired(false)}
							onChange={event => {
								const text = event.nativeEvent.text;
								if (text.length > expired.length && text.length <= 5)
									setExpired(text + (text.length === 2 ? "/" : ""));
								if (text.length < expired.length)
									setExpired(text.length === 2 ? text.substring(0, 1) : text);
							}}
						/>
					</Col>
					<Col style={[styles.groupInputContainer]} flex={1}>
						<Text style={[styles.label, { color: theme.text_4.getColor() }]}>CVV / CVC</Text>
						<InputIcon
							placeholder={"Enter CVV"}
							value={cvv}
							keyboardType={"numeric"}
							onFocus={() => setFocusCVV(true)}
							onBlur={() => setFocusCVV(false)}
							onChange={event => {
								const text = event.nativeEvent.text;
								if (
									(text.length > cvv.length &&
										text.length <= 3 &&
										text.substring(text.length - 1).match("\\d")) ||
									text.length < cvv.length
								)
									setCvv(text);
							}}
						/>
					</Col>
				</Row>
			</Col>
			{showDatePicker && (
				<RNDateTimePicker
					value={new Date()}
					onChange={datePicker => {
						setShowDatePicker(false);
						if (datePicker.type === "set")
							setExpired(formatExpired(new Date(datePicker.nativeEvent.timestamp)));
						if (datePicker.type === "dismissed") setExpired("");
					}}
					timeZoneOffsetInMinutes={60}
				/>
			)}
		</Col>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		gap: spacing["spaced-3"],
		marginTop: spacing["spaced-5"],
	},
	groupInputContainer: {
		gap: spacing["spaced-2"],
	},
	label: {
		...textStyle["16_regular"],
	},
});

export default AddPaymentMethodFragment;
