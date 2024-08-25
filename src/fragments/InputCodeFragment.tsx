/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:38 PM - 21/08/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import {
	KeyboardType,
	NativeSyntheticEvent,
	StyleProp,
	StyleSheet,
	Text,
	TextInputChangeEventData,
	ViewStyle,
} from "react-native";
import InputIcon from "../components/input/InputIcon";
import textStyle from "../configs/styles/textStyle.config";
import Row from "../components/custom/Row";
import { primary } from "../configs/colors/color-template.config";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";
import Col from "../components/custom/Col";

type InputCodeFragmentProp = {
	numberOfInput: number;
	codeVerify?: string;
	sizeInputCode?: number;
	onFocus?: () => void;
	onBlur?: () => void;
	onVerify?: (status: boolean) => void;
	styleInput?: StyleProp<ViewStyle>;
	messageError?: string;
	onChangeCode?: (code: string) => void;
	keyboardType?: KeyboardType;
	setError?: boolean;
};

function InputCodeFragment({
	numberOfInput,
	codeVerify,
	onFocus,
	onBlur,
	sizeInputCode = 75,
	onVerify,
	styleInput,
	messageError,
	onChangeCode,
	keyboardType,
	setError,
}: InputCodeFragmentProp) {
	const initialFocusStatus: boolean[] = [];
	const initialListData: string[] = [];
	for (let i = 0; i < numberOfInput; i++) {
		initialFocusStatus.push(false);
		initialListData.push("");
	}
	const [listData, setListData] = useState<string[]>(initialListData);
	const [listFocus, setListFocus] = useState<boolean[]>(initialFocusStatus);
	const [showError, setShowError] = useState<boolean>(false);

	const onChange = (index: number, element: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setShowError(false);
		const text = element.nativeEvent.text;
		if (text.length > 1) return;
		setListData(prevState => {
			const newState = [...prevState];
			newState[index] = text;
			return newState;
		});

		if (!text.length) {
			if (index === 0) return;
			setListFocus(prevState => {
				const newState = [...prevState];
				newState[index - 1] = true;
				return newState;
			});
		}

		if (text.length) {
			if (index === numberOfInput - 1) {
				onBlur?.();
			} else {
				setListFocus(prevState => {
					const newState = [...prevState];
					newState[index + 1] = true;
					return newState;
				});
			}
		}
	};

	useEffect(() => {
		const codeInput = listData.join("").toUpperCase();
		onChangeCode?.(codeInput);

		if (codeInput.length !== numberOfInput || !codeVerify) return;

		onVerify?.(codeInput === codeVerify);
		setShowError(codeInput !== codeVerify);
	}, [listData]);

	useEffect(() => {
		if (setError === undefined) return;

		setShowError(setError);
	}, [setError]);

	const renderInputCode = (numberOfInput: number) => {
		const inputCodes = [];
		for (let i = 0; i < numberOfInput; i++) {
			inputCodes.push(
				<InputIcon
					key={i}
					keyboardType={keyboardType}
					value={listData[i]}
					focus={listFocus[i]}
					width={sizeInputCode}
					height={sizeInputCode}
					borderColor={showError ? (primary.getColor("500") as ColorValue) : undefined}
					borderColorFocus={showError ? (primary.getColor("500") as ColorValue) : undefined}
					styleInput={[styles.inputCode, styleInput]}
					onFocus={() => {
						onFocus?.();
						setListFocus(prevState => {
							const newState = [...prevState];
							newState[i] = true;
							return newState;
						});
					}}
					onBlur={() => {
						setListFocus(prevState => {
							const newState = [...prevState];
							newState[i] = false;
							return newState;
						});
					}}
					onChange={element => {
						onChange(i, element);
					}}
				/>
			);
		}
		return inputCodes;
	};

	return (
		<Col>
			<Row style={styles.inputCodeContainer}>{renderInputCode(numberOfInput)}</Row>
			<Text style={[styles.messageError, { opacity: showError ? 1 : 0 }]}>{"Code Invalid" ?? messageError}</Text>
		</Col>
	);
}

const styles = StyleSheet.create({
	inputCodeContainer: {
		justifyContent: "space-between",
		marginBottom: 30,
	},
	inputCode: {
		height: "100%",
		...textStyle["40_semibold"],
		textAlign: "center",
	},
	messageError: {
		...textStyle["16_regular"],
		color: primary.getColor("500"),
		textAlign: "center",
		marginBottom: 25,
	},
});

export default InputCodeFragment;
