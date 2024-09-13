/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../configs/redux/store.config";
import {ThemeType} from "../../../types/theme.type";
import {Header} from "../../../components/header/Header";
import InputSearch from "../../../components/input/InputSearch";
import {neutral} from "../../../configs/colors/color-template.config";
import Col from "../../../components/custom/Col";
import {ReviewType} from "../../../components/review/type/buttonReview.props";
import {ButtonFilterType} from "../../../components/orders/type/buttonFilter.props";
import ButtonReview from "../../../components/review/ButtonReview";
import ButtonFilter from "../../../components/orders/ButtonFilter";

const ButtonFilterTypeArray: ButtonFilterType[] = ["All", "Active", "Completed", "Cancelled", "5", "4", "3", "2", "1"];
function OrderScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	const [ButtonFilterType, setButtonFilterType] = React.useState<ButtonFilterType>("All");
	return (
		<SafeAreaView>
			<Header
				title={"Orders"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}/>
			<Col style={[{paddingHorizontal: 25}]}>
				<InputSearch
					styleInput={styles.inputSearchCustom}
					placeholder={"Search"}/>
			</Col>

			<SafeAreaView>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={[{ gap: 10 }]}
				>
					{ButtonFilterTypeArray.map((value, index) => (
						<ButtonFilter
							key={index}
							title={value}
							isSelected={ButtonFilterType === value}
							hiddenIconRight={Number.isNaN(Number.parseInt(value))}
							onPress={() => {
								setButtonFilterType(value);
							}}
						/>
					))}

				</ScrollView>
			</SafeAreaView>

		</SafeAreaView>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 40,
			backgroundColor: theme.background.getColor()
		},
		inputSearchCustom: {
			color: neutral.getColor("100"),
			backgroundColor: neutral.getColor("50")
		}

	})

export default OrderScreen;
