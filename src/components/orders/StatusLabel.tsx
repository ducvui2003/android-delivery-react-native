import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {StyleSheet, Text, View} from "react-native";
import {ThemeType} from "../../types/theme.type";
import textStyle from "../../configs/styles/textStyle.config";
import {green, neutral, primary, secondary} from "../../configs/colors/color-template.config";
import OrderType, {ORDER_STATUS_ACTIVE, ORDER_STATUS_CANCELLED, ORDER_STATUS_COMPLETED} from "../../types/order.type";

function StatusLabel({status}: Pick<OrderType, "status">) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	return (
		<View style={styles.container}>
			<Text style={{...textStyle["12_medium"], color: makeColorOrderStatus(status), fontWeight: "bold"}}>{status}</Text>
		</View>
	);

}

const makeColorOrderStatus = (title: Pick<OrderType, "status">): string => {
	switch (title) {
		case ORDER_STATUS_ACTIVE: return primary.getColor("500");
		case ORDER_STATUS_COMPLETED: return green.getColor("500");
		case ORDER_STATUS_CANCELLED: return neutral.getColor("500");
	}
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background_1.getColor(),
			borderRadius: 12,
			borderColor: theme.border.getColor(),
			borderWidth: 1,
			padding: 5,
		}
	})

export default StatusLabel;