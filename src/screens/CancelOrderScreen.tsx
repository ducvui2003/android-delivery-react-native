/**
 * Author: Lam Hong Phong
 * Email: giotrang1401@gmail.com
 * Phone number: +84 376236485
 * Create at: 10:25 - 22/09/2024
 *  User: lamhongphong
 */
import {Header} from "../components/header/Header";
import {useSelector} from "react-redux";
import {RootState} from "../configs/redux/store.config";
import {ThemeType} from "../types/theme.type";
import {ScrollView, StyleSheet, TextInput, View} from "react-native";
import {OptionItem} from "../components/optionItem/OptionItem";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import numberValue from "../configs/value/number.value";
import {neutral} from "../configs/colors/color-template.config";
import Row from "../components/custom/Row";

type CancelOrderFragmentProps = {};
const reasons = ["Change of mind", "Found better price elsewhere", "Delivery delay", "Incorrect item selected", "Duplicate order", "Unable to fulfill order", "Other reasons"];

function CancelOrderScreen({}: {}) {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	return (
		<View style={styles.container}>
			<Header title={"Cancel Order"} colorTitle={theme.text_1.getColor()}
					colorIconBack={theme.text_1.getColor()}
					styleIconBack={{
						backgroundColor: theme.header.backgroundIconBack.getColor(),
						elevation: 5
					}}/>
			<ScrollView style={{flex: 1}}>
				{reasons.map((reason, index) =>
					<Row style={styles.reason}>
						<OptionItem key={index} selected={false} onPress={() => {}} name={reason} icon={"circle"}/>
					</Row>

				)}
				<TextInput placeholder={"Other reason..."} textAlignVertical={"top"} multiline
						   style={{padding: 16, borderRadius: 10, height: 90, backgroundColor: theme.background_input.getColor(), marginBottom: 10}}/>
			</ScrollView>

			<ButtonHasStatus title={"Submit"}/>
		</View>
	)
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
			justifyContent: "space-between",
			paddingHorizontal: numberValue.paddingHorizontalScreen
		},
		reason: {
			marginBottom: 12,
			paddingHorizontal: 12,
			backgroundColor: theme.background.getColor(),
			borderWidth: 1,
			borderColor: neutral.getColor("50"),
			borderRadius: 10,
			height: 56,
		}
	})

export default CancelOrderScreen;