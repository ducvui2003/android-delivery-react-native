/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:22 PM - 28/08/2024
 *  User: lam-nguyen
 **/
import * as React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SolarBag5Bold from "../../../assets/images/icons/SolarBag5Bold";
import ButtonHasStatus from "../../components/custom/ButtonHasStatus";
import Row from "../../components/custom/Row";
import InputNumberButton from "../../components/input/InputNumberButton";
import { white } from "../../configs/colors/color-template.config";
import { RootState } from "../../configs/redux/store.config";

export default function ProductDetailFooter({
	onSubmit,
	totalAmount,
}: {
	onSubmit: (quantity: number) => void;
	totalAmount: number;
}) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [quantity, setQuantity] = React.useState<number>(1);
	return (
		<Row style={[styles.container, { backgroundColor: theme.navigation.getColor() }]}>
			<InputNumberButton max={totalAmount} onMountCurrent={quantity => setQuantity(quantity)} />

			<ButtonHasStatus
				styleButton={[styles.buttonAdd]}
				icon={<SolarBag5Bold color={white.getColor()} width={24} height={24} style={{ marginRight: 10 }} />}
				title={"Add to Basket"}
				active={true}
				onPress={() => onSubmit(quantity)}
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
	buttonAdd: {
		paddingVertical: 16,
		paddingHorizontal: 22,
		marginBottom: 0,
	},
});
