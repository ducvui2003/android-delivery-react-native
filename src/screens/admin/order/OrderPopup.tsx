import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import PopUp from "../../../components/popUp/PopUp";
import Col from "../../../components/custom/Col";
import Selector from "../../../components/selector/Selector";
import Row from "../../../components/custom/Row";
import {
	ORDER_STATUS_ACTIVE,
	ORDER_STATUS_CANCELLED,
	ORDER_STATUS_COMPLETED,
	StatusOrderType,
} from "../../../types/order.type";
import { RootState } from "../../../configs/redux/store.config";
import textStyle from "../../../configs/styles/textStyle.config";
import NumberValue from "../../../configs/value/number.value";
import { ThemeType } from "../../../types/theme.type";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";

// Định nghĩa danh sách trạng thái đơn hàng
const orderStatusList = [
	{ name: "Active", value: ORDER_STATUS_ACTIVE },
	{ name: "Completed", value: ORDER_STATUS_COMPLETED },
	{ name: "Cancelled", value: ORDER_STATUS_CANCELLED },
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
		<TouchableOpacity key={`${item.value}-${index}`} style={[styles.itemSelected, styles.itemSelects]} onPress={() => setSelectedItem(item)}>
			<Row>
				<Text>{item.name}</Text>
			</Row>
		</TouchableOpacity>
	);

	const styles = makeStyled(theme);

	// Cập nhật khi chọn trạng thái đơn hàng
	const { control, handleSubmit } = useForm<{ status: StatusOrderType }>({
		mode: "all",
		defaultValues: { status: ORDER_STATUS_ACTIVE },
	});

	const [selectedItem, setSelectedItem] = useState<OrderStatusItem | null>(null);


	const onSubmit = (data: { status: StatusOrderType }) => {
		onSave(data.status);
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
						<Selector
							data={orderStatusList}
							renderItem={renderItem} // Truyền renderItem cho từng mục
							renderItemSelected={renderStatusSelected} // Truyền renderStatusSelected cho mục đã chọn
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
							onPress={handleSubmit(onSubmit)}
						/>
					</Row>
				</Col>
			}
			showed={showPopUp}
		/>
	);
}

const makeStyled = (theme: ThemeType) =>  StyleSheet.create({
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
