import {StatusProps} from "./type/statusLabel.props";
import {useSelector} from "react-redux";
import {RootState} from "../../configs/redux/store.config";
import {StyleSheet, Text, View} from "react-native";
import {ThemeType} from "../../types/theme.type";
import textStyle from "../../configs/styles/textStyle.config";

function StatusLabel({title, color}: StatusProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	return (
		<View style={styles.container}>
			<Text style={{...textStyle["12_medium"], color: color, fontWeight: "bold"}}>{title}</Text>
		</View>
	);

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