import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";
import Col from "../../../components/custom/Col";
import Row from "../../../components/custom/Row";
import PopUp from "../../../components/popUp/PopUp";
import Selector from "../../../components/selector/Selector";
import { RootState } from "../../../configs/redux/store.config";
import textStyle from "../../../configs/styles/textStyle.config";
import {
	ORDER_STATUS_ACTIVE,
	ORDER_STATUS_CANCELLED,
	ORDER_STATUS_COMPLETED,
	StatusOrderType,
} from "../../../types/order.type";
import { ThemeType } from "../../../types/theme.type";

// Định nghĩa danh sách trạng thái đơn hàng
const orderStatusList: OrderStatusItem[] = [
	{ name: "ACTIVE", value: ORDER_STATUS_ACTIVE },
	{ name: "COMPLETED", value: ORDER_STATUS_COMPLETED },
	{ name: "CANCELLED", value: ORDER_STATUS_CANCELLED },
];

type OrderStatusItem = {
	name: string;
	value: StatusOrderType;
};

function OrderPopUp({
	onSave,
	showed = false,
	onShowed,
}: {
	onSave: (data: StatusOrderType) => void;
	onShowed?: (value: boolean) => void;
	showed?: boolean;
}) {
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [selectedItem, setSelectedItem] = useState<OrderStatusItem>({
		name: "ACTIVE",
		value: ORDER_STATUS_ACTIVE,
	});

	useEffect(() => {
		setShowPopUp(showed);
	}, [showed]);

	useEffect(() => {
		onShowed?.(showPopUp);
	}, [showPopUp]);

	const renderStatusSelected = (item: OrderStatusItem) => (
		<Row key={item.value}>
			<Text>{item.name}</Text>
		</Row>
	);

	const renderItem = (item: OrderStatusItem, index: number) => (
		<Row key={`${item.value}-${index}`} style={[styles.itemSelected, styles.itemSelects]}>
			<Text>{item.name}</Text>
		</Row>
	);

	const styles = makeStyled(theme);

	const onSubmit = (status: StatusOrderType) => {
		onSave(status);
		setShowPopUp(false);
	};

	return (
		<PopUp
			height={0.6}
			onEndHide={() => setShowPopUp(false)}
			body={
				<Col style={[{ justifyContent: "center" }]}>
					<Text
						style={[
							{
								...textStyle["18_semibold"],
								color: theme.text_1.getColor(),
								textAlign: "center",
								paddingVertical: 15,
							},
						]}
					>
						Cập nhật trạng thái đơn hàng
					</Text>
					<Col style={styles.content}>
						<Text style={[textStyle["16_regular"], { color: theme.text_1.getColor() }]}>
							Chọn trạng thái đơn hàng
						</Text>
						<Selector<OrderStatusItem>
							data={orderStatusList}
							renderItem={renderItem} // Truyền renderItem cho từng mục
							renderItemSelected={renderStatusSelected} // Truyền renderStatusSelected cho mục đã chọn
							onSelected={item => {
								setSelectedItem(item);
							}} // Cập nhật mục đã chọn
						/>
					</Col>
					<Row flex={0} style={[{ justifyContent: "space-between", width: "100%", marginTop: 30 }]}>
						<ButtonHasStatus
							styleButton={styles.buttonModal}
							styleButtonActive={{
								backgroundColor: theme.add_new_location.background.getColor(),
							}}
							styleText={{
								color: theme.text_1.getColor(),
								...textStyle["18_regular"],
							}}
							title={"Cancel"}
							active={true}
							onPress={() => setShowPopUp(false)}
						/>
						<ButtonHasStatus
							styleButton={styles.buttonModal}
							title={"Save"}
							active={true}
							onPress={() => {
								onSubmit(selectedItem.value);
							}}
						/>
					</Row>
				</Col>
			}
			showed={showPopUp}
		/>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		content: {
			justifyContent: "center",
		},
		textItemSelect: {
			paddingLeft: 8,
			fontWeight: "bold",
		},
		itemSelected: {
			justifyContent: "flex-start",
			alignItems: "center",
		},
		itemSelects: {
			padding: 8,
			backgroundColor: theme.background_input.getColor(),
			borderBottomWidth: 1,
			borderBottomColor: theme.border.getColor(),
			borderStyle: "solid",
		},
		buttonModal: {
			marginBottom: 0,
			width: "47%",
		},
	});

export default OrderPopUp;
