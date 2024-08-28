/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:22 PM - 28/08/2024
 *  User: lam-nguyen
 **/
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import Row from "../../components/custom/Row";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import SolarMinusLinear from "../../../assets/images/icons/SolarMinusLinear";
import SolarAddLinear from "../../../assets/images/icons/SolarAddLinear";
import { ButtonHasStatus } from "../../components/custom/ButtonHasStatus";
import SolarBag5Bold from "../../../assets/images/icons/SolarBag5Bold";
import { neutral, white } from "../../configs/colors/color-template.config";
import textStyle from "../../configs/styles/textStyle.config";

export default function ProductDetailFooter({
	onAmount,
	totalAmount,
}: {
	onAmount?: (amount: number) => void;
	totalAmount: number;
}) {
	const [amount, setAmount] = useState<number>(1);
	const theme = useSelector((state: RootState) => state.themeState.theme);

	useEffect(() => {
		onAmount?.(amount);
	}, [amount]);

	const onPlus = () => {
		if (amount >= totalAmount) return;

		setAmount(amount + 1);
	};
	const onMinus = () => {
		if (amount <= 1) return;

		setAmount(amount - 1);
	};

	return (
		<Row style={[styles.container, { backgroundColor: theme.navigation.getColor() }]}>
			<Row style={{ alignItems: "center" }}>
				<TouchableOpacity onPress={onMinus} style={styles.button}>
					<SolarMinusLinear width={25} height={25} color={theme.text_1.getColor()} />
				</TouchableOpacity>
				<Text style={[styles.text, { color: theme.text_1.getColor() }]}>{amount}</Text>
				<TouchableOpacity onPress={onPlus} style={styles.button}>
					<SolarAddLinear width={25} height={25} color={theme.text_1.getColor()} />
				</TouchableOpacity>
			</Row>

			<ButtonHasStatus
				styleButton={[styles.buttonAdd]}
				icon={<SolarBag5Bold color={white.getColor()} width={24} height={24} style={{ marginRight: 10 }} />}
				title={"Add to Basket"}
				active={true}
			/>
		</Row>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
		paddingVertical: 12,
		justifyContent: "space-between",
		alignItems: "center",
		position: "absolute",
		zIndex: 2,
		bottom: 15,
		borderRadius: 12,
		marginHorizontal: 10,
		elevation: 10,
		shadowColor: "black",
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	text: {
		...textStyle["22_regular"],
		width: 50,
		textAlign: "center",
	},
	textButton: {
		fontSize: 32,
	},
	button: {
		borderRadius: 999,
		padding: 12,
		borderColor: neutral.getColor("50"),
		borderWidth: 1,
		borderStyle: "solid",
	},
	buttonAdd: {
		paddingVertical: 16,
		paddingHorizontal: 22,
		marginBottom: 0,
	},
});
