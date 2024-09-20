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
import Order from "../../../components/orders/Order";
import {burger, burrito, sandwich} from "../../../../assets/images/category/category.icon";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../navigations/stack.type";
import {ORDER_STATUS_ACTIVE, ORDER_STATUS_CANCELLED, ORDER_STATUS_COMPLETED} from "../../../types/order.type";
import {DATA} from "../../../../assets/data/order/order";


const ButtonFilterTypeArray: ButtonFilterType[] = ["All", "Active", "Completed", "Cancelled", "5", "4", "3", "2", "1"];

function OrderScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme)
	const styles = makeStyled(theme)
	const [ButtonFilterType, setButtonFilterType] = React.useState<ButtonFilterType>("All");
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "MainScreen">>();


	const renderItem = ({item}: { item: OrderProps }) => {
		return (
				<Order
					{...item}
					onPress={() => {
						navigation.navigate("OrderDetailScreen", {id: item.id});
					}}
				/>

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
						contentContainerStyle={[{gap: 10}]}
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
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>

	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor()
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

export default OrderScreen;
