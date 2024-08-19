/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 19/08/2024 - 16:03
 * User: ducvui2003
 **/

import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { ThemeType } from "../../types/theme.type";
import Row from "../../components/custom/Row";
import Col from "../../components/custom/Col";
import { StyleSheet, Text, View } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { neutral, primary } from "../../configs/colors/color-template.config";
import SolarBagOutline from "../../../assets/images/icons/SolarBagOutline";
import SolarArrowAlt from "../../../assets/images/icons/SolarArrowAlt";

function HomeHeaderFragment() {
	const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);

	return (
		<Row style={{ justifyContent: "space-between", alignItems: "center" }}>
			<Col>
				<Text
					style={{
						...textStyle["16_regular"],
						color: theme.home.heading.getColor(),
					}}
				>
					Deliver to
				</Text>
				<Row style={{ marginTop: 11, alignItems: "center", gap: 13 }}>
					<Text
						style={{
							...textStyle["18_semibold"],
							color: neutral.getColor("200"),
						}}
					>
						Select Your Location
					</Text>
					<SolarArrowAlt
						width={20}
						height={16}
						color={primary.getColor("500")}
						style={{ transform: [{ rotate: "180deg" }] }}
					/>
				</Row>
			</Col>
			<View style={styles.shopIconContainer}>
				<SolarBagOutline width={32} height={32} color={theme.home.cart.icon.getColor()} />
			</View>
		</Row>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		shopIconContainer: {
			alignItems: "center",
			justifyContent: "center",
			padding: 8,
			width: 50,
			height: 50,
			borderRadius: 25,
			backgroundColor: theme.home.cart.background.getColor(),
			elevation: 4,
		},
	});

export default HomeHeaderFragment;
