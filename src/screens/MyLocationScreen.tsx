/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:13 AM - 26/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Col from "../components/custom/Col";
import { Header } from "../components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { InfoLocation } from "../components/location/InfoLocation";
import Row from "../components/custom/Row";
import SolarAddLinear from "../../assets/images/icons/SolarAddLinear";
import textStyle from "../configs/styles/textStyle.config";
import { ButtonHasStatus } from "../components/custom/ButtonHasStatus";
import { FlatList } from "react-native-gesture-handler";
import Space from "../components/custom/Space";
import { RootStackParamList } from "../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type Props = {
	route: RouteProp<RootStackParamList, "MyLocationScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function MyLocationScreen({ navigation }: Props) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [indexChecked, setIndexChecked] = React.useState<number>(0);
	const myLocation = 0;

	return (
		<SafeAreaView style={[{ flex: 1, backgroundColor: theme.background.getColor() }]}>
			<Header
				title={"My Locations"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				style={[styles.header]}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
					borderColor: theme.border.getColor(),
				}}
			/>
			<Col style={styles.container}>
				<FlatList
					style={styles.flatList}
					data={listDataDemo}
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
							<TouchableOpacity onPress={() => navigation.replace("AddNewLocationScreen")}>
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
					onPress={() => {}}
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
		paddingHorizontal: 25,
	},
	header: {
		marginTop: 55,
		marginBottom: 16,
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

const listDataDemo = [
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
	{
		name: "Home",
		address: "221B Baker Street, London, United Kingdom",
	},
];
