/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../configs/redux/store.config";
import {ThemeType} from "../../../types/theme.type";
import {Header} from "../../../components/header/Header";
import InputSearch from "../../../components/input/InputSearch";
import {neutral} from "../../../configs/colors/color-template.config";
import Col from "../../../components/custom/Col";
import {ButtonFilterType} from "../../../components/orders/type/buttonFilter.props";
import ButtonFilter from "../../../components/orders/ButtonFilter";
import {FlatList} from "react-native-gesture-handler";
import {OrderProps} from "../../../components/orders/type/order.props";
import {statusLabel} from "../../../components/orders/type/statusLabel.props";
import {useState} from "react";
import Order from "../../../components/orders/Order";
import {burger, burrito, sandwich} from "../../../../assets/images/category/category.icon";

const ButtonFilterTypeArray: ButtonFilterType[] = ["All", "Active", "Completed", "Cancelled", "5", "4", "3", "2", "1"];
function OrderScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	const [ButtonFilterType, setButtonFilterType] = React.useState<ButtonFilterType>("All");
	const [selectedId, setSelectedId] = useState<string>();

	const renderItem = ({item}: {item: OrderProps}) => {

		return (
				<Order {...item} />
		);
	};
	return (
		<SafeAreaView style={styles.container}>
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

			<Col style={styles.filter}>
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
			</Col>

			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				extraData={selectedId}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>

	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		inputSearchCustom: {
			color: neutral.getColor("100"),
			backgroundColor: neutral.getColor("50")
		},
		filter: {
			paddingLeft: 25,
			paddingVertical: 10,
		}

	})
const DATA: OrderProps[] = [
	{
		id: "SP1",
		price: 1000,
		images: [
			burger,
			burrito,
			sandwich
		],
		starReview: 5,
		status: {
			title: statusLabel.Active.title,
			color: statusLabel.Active.color
		},
		onPress: () => {}
	},
	{
		id: "SP2",
		price: 2000,
		images: [
			burger,
			burrito,
		],
		starReview: 4,
		status: {
			title: statusLabel.Cancelled.title,
			color: statusLabel.Cancelled.color
		},
		onPress: () => {}
	},
	{
		id: "SP3",
		price: 3000,
		images: [
			burrito,
			sandwich
		],
		starReview: 3,
		status: {
			title: statusLabel.Completed.title,
			color: statusLabel.Completed.color
		},
		onPress: () => {}
	},
	{
		id: "SP4",
		price: 4000,
		images: [
			burger
		],
		starReview: 2,
		status: {
			title: statusLabel.Active.title,
			color: statusLabel.Active.color
		},
		onPress: () => {}
	},
	{
		id: "SP5",
		price: 2000,
		images: [
			burger,
			burrito,
		],
		starReview: 4,
		status: {
			title: statusLabel.Cancelled.title,
			color: statusLabel.Cancelled.color
		},
		onPress: () => {}
	},
	{
		id: "SP6",
		price: 3000,
		images: [
			burrito,
			sandwich
		],
		starReview: 3,
		status: {
			title: statusLabel.Completed.title,
			color: statusLabel.Completed.color
		},
		onPress: () => {}
	},
	{
		id: "SP7",
		price: 4000,
		images: [
			burger
		],
		starReview: 2,
		status: {
			title: statusLabel.Active.title,
			color: statusLabel.Active.color
		},
		onPress: () => {}
	},

]
export default OrderScreen;
