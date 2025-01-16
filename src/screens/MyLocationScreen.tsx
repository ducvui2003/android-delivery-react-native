/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:13 AM - 26/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Col from "../components/custom/Col";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../configs/redux/store.config";
import { InfoLocation } from "../components/location/InfoLocation";
import Row from "../components/custom/Row";
import SolarAddLinear from "../../assets/images/icons/SolarAddLinear";
import textStyle from "../configs/styles/textStyle.config";
import ButtonHasStatus from "../components/custom/ButtonHasStatus";
import { FlatList } from "react-native-gesture-handler";
import Space from "../components/custom/Space";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import NumberValue from "../configs/value/number.value";
import { thunkGetAllAddress } from "../hooks/redux/address.slice";
import { updateDefaultAddress } from "../services/address.service";

type MyLocationScreenProps = {
	route: RouteProp<RootStackParamList, "MyLocationScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function MyLocationScreen({ navigation }: MyLocationScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const address = useSelector((state: RootState) => state.addressState.address);
	const user = useSelector((state: RootState) => state.authState.user);
	const [indexChecked, setIndexChecked] = React.useState<number>(0);
	const [myLocation, setMyLocation] = React.useState<number>(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(thunkGetAllAddress());
	}, [dispatch]);

	useEffect(() => {
		address.forEach((item, index) => {
			if (item.id === user?.address.id) {
				setIndexChecked(index);
				setMyLocation(index);
			}
		});
	}, []);

	return (
		<SafeAreaView style={[{ flex: 1, backgroundColor: theme.background.getColor() }]}>
			<Header
				title={"My Locations"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
				}}
				onPressBack={() => navigation.pop()}
			/>
			<Col style={styles.container} flex={1}>
				<FlatList
					style={styles.flatList}
					data={address}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					renderItem={({ item: { name, address }, index }) => {
						return (
							<Col key={index}>
								<InfoLocation
									name={name}
									checked={indexChecked === index}
									onCheck={() => setIndexChecked(index)}
									address={address}
								/>
								<Space height={15} />
							</Col>
						);
					}}
					ListFooterComponent={() => {
						return (
							<TouchableOpacity onPress={() => navigation.navigate("AddNewLocationScreen")}>
								<Row
									style={[
										{
											backgroundColor: theme.my_location.background_button_add.getColor(),
										},
										styles.buttonAdd,
									]}
								>
									<SolarAddLinear
										width={25}
										height={25}
										color={theme.my_location.color_button_add.getColor()}
									/>
									<Text
										style={[
											{
												...textStyle["18_semibold"],
												color: theme.my_location.color_button_add.getColor(),
											},
										]}
									>
										Add New Location
									</Text>
								</Row>
							</TouchableOpacity>
						);
					}}
				/>
				<ButtonHasStatus
					active={indexChecked !== myLocation}
					title={"Apply"}
					onPress={() => {
						updateDefaultAddress(address[indexChecked].id).then(() => navigation.replace("BasketScreen"));
					}}
					styleButton={styles.buttonApply}
				/>
			</Col>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
	},
	buttonAdd: {
		padding: 17,
		gap: 10,
		alignItems: "center",
		borderRadius: 15,
	},
	flatList: {
		width: "100%",
		padding: 0,
		margin: 0,
	},
	buttonApply: {
		marginVertical: 40,
		width: "100%",
	},
});
