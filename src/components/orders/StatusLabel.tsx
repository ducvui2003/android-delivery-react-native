import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { StyleSheet, Text, View } from "react-native";
import { ThemeType } from "../../types/theme.type";
import textStyle from "../../configs/styles/textStyle.config";
import { green, neutral, primary } from "../../configs/colors/color-template.config";
import OrderType, {
	ORDER_STATUS_ACTIVE,
	ORDER_STATUS_CANCELLED,
	ORDER_STATUS_COMPLETED,
	StatusOrderType,
} from "../../types/order.type";

function StatusLabel({ status }: Pick<OrderType, "status">) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	return (
		<View style={[styles.container, { borderColor: neutral.getColor("100") }]}>
			<Text style={{ ...textStyle["12_medium"], color: makeColorOrderStatus(status, theme), fontWeight: "bold" }}>
				{status}
			</Text>
		</View>
	);
}

const makeColorOrderStatus = (title: StatusOrderType, theme: ThemeType): string => {
	switch (title) {
		case ORDER_STATUS_ACTIVE:
			return primary.getColor("500");
		case ORDER_STATUS_COMPLETED:
			return green.getColor("500");
		case ORDER_STATUS_CANCELLED:
			return theme.order.orderStatusCancel.getColor();
	}
};

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			borderRadius: 20,
			borderColor: theme.border.getColor(),
			borderWidth: 1,
			paddingVertical: 5,
			paddingHorizontal: 10,
		},
	});

export default StatusLabel;
