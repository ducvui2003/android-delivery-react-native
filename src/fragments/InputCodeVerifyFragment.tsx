/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:38 PM - 21/08/2024
 *  User: lam-nguyen
 **/

import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInputChangeEventData, ViewStyle } from "react-native";
import InputIcon from "../components/input/InputIcon";
import textStyle from "../configs/styles/textStyle.config";
import Row from "../components/custom/Row";
import { primary } from "../configs/colors/color-template.config";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

function InputCodeVerifyFragment({
	numberOfInput,
	codeVerify,
	onFocus,
	onBlur,
	sizeInputCode = 75,
	onVerify,
	styleInput,
}: {
	numberOfInput: number;
	codeVerify: string;
	sizeInputCode?: number;
	onFocus?: () => void;
	onBlur?: () => void;
	onVerify?: (status: boolean) => void;
	styleInput?: StyleProp<ViewStyle>;
}) {
	const initialFocusStatus: boolean[] = [];
	const initialListData: string[] = [];
	for (let i = 0; i < numberOfInput; i++) {
		initialFocusStatus.push(false);
		initialListData.push("");
	}
	const [listData, setListData] = useState<string[]>([]);
	const [listFocus, setListFocus] = useState<boolean[]>(initialFocusStatus);
	const [showError, setShowError] = useState<boolean>(false);

	const onChange = (index: number, element: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setShowError(false);
		const text = element.nativeEvent.text;
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
		for (let i = 0; i < listData.length; i++) {
			if (!listData[i]) return;
		}

		console.log(listData);

		const codeInput = listData.join("");
		onVerify?.(codeInput === codeVerify);
		setShowError(codeInput !== codeVerify);
	}, [listData]);

	const renderInputCode = (numberOfInput: number) => {
		const inputCodes = [];
		for (let i = 0; i < numberOfInput; i++) {
			inputCodes.push(
				<InputIcon
					key={i}
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

	return <Row style={styles.inputCodeContainer}>{renderInputCode(numberOfInput)}</Row>;
}

const styles = StyleSheet.create({
	inputCodeContainer: {
		justifyContent: "space-between",
		marginBottom: 51,
	},
	inputCode: {
		height: "100%",
		...textStyle["40_semibold"],
		textAlign: "center",
	},
});

export default InputCodeVerifyFragment;
