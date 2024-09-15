import NotificationProps from "./type/notifications.props";
import { StyleSheet, Text, View } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import Col from "../custom/Col";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import Row from "../custom/Row";
import SolarTicketSaleBold from "../../../assets/images/icons/SolarTicketSaleBold";
import { MdiTickCircle } from "../../../assets/images/icons/MdiTickCircle";
import { SolarScooterBold } from "../../../assets/images/icons/SolarScooterBold";
import { SolarShopBold } from "../../../assets/images/icons/SolarShopBold";
import SolarBag5Bold from "../../../assets/images/icons/SolarBag5Bold";
import { MdiUserCircle } from "../../../assets/images/icons/MdiUserCircle";
import { SolarCloseCircleBold } from "../../../assets/images/icons/SolarCloseCircleBold";
import { SolarCardBold } from "../../../assets/images/icons/SolarCardBold";
import MdiDot from "../../../assets/images/icons/MdiDot";

const COLORS = {
	success: "#E7F9F5",
	discount: "#FFF9E6",
	cancelled: "#FFEFED",
	default: "#FFFFFF",
	iconDefault: "#13C296",
	discountIcon: "#FFC700",
	cancelledIcon: "#FF6347",
};

const renderIcon = (typeNotification: string) => {
	switch (typeNotification) {
		case "Discount":
			return <SolarTicketSaleBold color={COLORS.discountIcon} />;
		case "Order Received":
			return <MdiTickCircle color={COLORS.iconDefault} />;
		case "Order On Way":
			return <SolarScooterBold color={COLORS.iconDefault} />;
		case "Order Confirmed":
			return <SolarShopBold color={COLORS.iconDefault} />;
		case "Order Successful":
			return <SolarBag5Bold color={COLORS.iconDefault} />;
		case "Account Success":
			return <MdiUserCircle color={COLORS.iconDefault} />;
		case "Cancelled":
			return <SolarCloseCircleBold color={COLORS.cancelledIcon} />;
		case "Credit Connect":
			return <SolarCardBold color={COLORS.iconDefault} />;
		default:
			return null;
	}
};

const getBackgroundColor = (typeNotification: string) => {
	if (typeNotification.startsWith("Order")) return COLORS.success;
	switch (typeNotification) {
		case "Discount":
			return COLORS.discount;
		case "Account Success":
			return COLORS.success;
		case "Cancelled":
			return COLORS.cancelled;
		case "Credit Connect":
			return COLORS.success;
		default:
			return COLORS.default;
	}
};

function NotificationCard({ name, content, time, typeNotification, isRead, onInfoPress }: NotificationProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<Row>
			<Col style={styles.container}>
				<View style={styles.wrapper}>
					<Row style={styles.row}>
						<View style={[styles.iconContainer, { backgroundColor: getBackgroundColor(typeNotification) }]}>
							{renderIcon(typeNotification)}
						</View>
						<Col>
							<Text style={[styles.nameText, { color: theme.text_1.getColor() }]}>{name}</Text>
							<Text style={[styles.contentText, { color: theme.text_1.getColor() }]}>{content}</Text>
						</Col>
					</Row>
					{!isRead && (
						<View style={styles.dotContainer}>
							<MdiDot/>
						</View>
					)}
				</View>
				<Row style={styles.timeContainer}>
					<Text>{time}</Text>
				</Row>
			</Col>
		</Row>
	);
}

export default NotificationCard;
const styles = StyleSheet.create({
	container: {
		gap: 5,
		width: "100%",
	},
	wrapper: {
		position: "relative",
	},
	row: {
		alignItems: "center",
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	nameText: {
		...textStyle["16_semibold"],
	},
	contentText: {
		...textStyle["12_regular"],
	},
	timeContainer: {
		justifyContent: "flex-end",
		width: "100%",
	},
	dotContainer: {
		position: "absolute",
		top: -17,
		right: -27,
	},
});