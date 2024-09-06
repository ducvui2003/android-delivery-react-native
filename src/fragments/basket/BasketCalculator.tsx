/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:41 PM - 06/09/2024
 *  User: lam-nguyen
 **/

import React from "react";
import Row from "../../components/custom/Row";
import { Text } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { formatCurrency } from "../../utils/formator";
import { Divider } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import Col from "../../components/custom/Col";

export type BasketCalculatorProps = {
	subTotal: number;
	deliveryFee: number;
	discount: number;
};

function BasketCalculator({ subTotal, deliveryFee, discount }: BasketCalculatorProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	return (
		<Col style={{ gap: 10 }}>
			<Row style={{ justifyContent: "space-between" }}>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>Tổng thu</Text>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>
					{formatCurrency(subTotal)}
				</Text>
			</Row>
			<Row style={{ justifyContent: "space-between" }}>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>Phí vận chuyển</Text>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>
					{" "}
					{formatCurrency(deliveryFee)}
				</Text>
			</Row>
			<Row style={{ justifyContent: "space-between" }}>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>Giảm giá</Text>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>
					{formatCurrency(discount)}
				</Text>
			</Row>
			<Row style={{ alignItems: "center", height: 10 }}>
				<Divider
					style={{
						width: "100%",
						borderRadius: 999,
					}}
					width={1}
					color={theme.text_1.getColor()}
				/>
			</Row>
			<Row style={{ justifyContent: "space-between" }}>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>Tổng</Text>
				<Text style={[{ color: theme.text_1.getColor(), ...textStyle["16_regular"] }]}>
					{formatCurrency(subTotal - discount + deliveryFee > 0 ? subTotal - discount + deliveryFee : 0)}
				</Text>
			</Row>
		</Col>
	);
}

export default BasketCalculator;
