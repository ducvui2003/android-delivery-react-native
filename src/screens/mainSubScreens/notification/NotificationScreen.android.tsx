/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:16 PM - 21/08/2024
 *  User: lam-nguyen
 **/
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useCallback } from "react";
import { RouteProp } from "@react-navigation/native";
import { MainScreenStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { Header } from "../../../components/header/Header";
import NumberValue from "../../../configs/value/number.value";
import InputSearch from "../../../components/input/InputSearch";
import textStyle from "../../../configs/styles/textStyle.config";
import NotificationCard from "../../../components/notification/NotificationCard";
import { FlatList } from "react-native-gesture-handler";
import Row from "../../../components/custom/Row";
import Space from "../../../components/custom/Space";
import dataNotification from "../../../../assets/data/notification/notification";
import spacing from "../../../configs/styles/space.config";

type NotificationScreenProps = {
	route: RouteProp<MainScreenStackParamList, "NotificationScreen">;
	navigation: NativeStackNavigationProp<MainScreenStackParamList>;
};

function NotificationScreen({ navigation }: NotificationScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const handleBackPress = useCallback(() => {
		Keyboard.dismiss();
		navigation.pop();
	}, [navigation]);

	console.log(dataNotification.map(item => item.variant));
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background.getColor() }]}>
			<Header
				title="Notifications"
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{ backgroundColor: theme.header.backgroundIconBack.getColor() }}
				onPressBack={handleBackPress}
			/>
			<View style={styles.contentContainer}>
				<InputSearch placeholder="Search" />
				<Text style={styles.textTime}>Today</Text>
				{dataNotification.length && (
					<FlatList
						data={dataNotification}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{paddingBottom: spacing['spaced-7']}}
						renderItem={({ item,  }) => (
							<TouchableOpacity>
								<Row>
									<NotificationCard
										name={item.name}
										content={item.content}
										time={item.time}
										variant={item.variant}
										isRead={item.isRead}
										onInfoPress={() => {}}
									/>
								</Row>
								<Space height={15} />
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

export default NotificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: NumberValue.paddingHorizontalScreen,
		flex: 1,
	},
	textTime: {
		...textStyle["16_regular"],
		marginBottom: 10,
		marginTop: 20,
	},
});
