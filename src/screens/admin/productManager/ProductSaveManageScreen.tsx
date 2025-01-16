import { ThemeType } from "../../../types/theme.type";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { Header } from "../../../components/header/Header";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { burger } from "../../../../assets/images/category/category.icon";
import { primary, white } from "../../../configs/colors/color-template.config";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import InputIcon from "../../../components/input/InputIcon";
import NumberValue from "../../../configs/value/number.value";
import Selector from "../../../components/selector/Selector";
import data from "../../../../assets/data/category/category";
import CategoryType from "../../../types/category.type";
import Row from "../../../components/custom/Row";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";

type ProductSaveManageScreenProps = {
	route: RouteProp<RootStackParamList, "ProductSaveManageScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};
export default function ProductSaveManageScreen({
	route: {
		params: { id },
	},
	navigation,
}: ProductSaveManageScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	// const [saveProduct, setSaveProduct] = React.useState<ProductDetailType | null>(null);
	const renderCategory = (item: CategoryType, index: number) => {
		return (
			<Row key={item.id + index} style={[styles.itemSelected, styles.itemSelects]}>
				<Image source={burger} style={{ width: 32, height: 32 }} />
				<Text style={styles.textItemSelect}>{item.name}</Text>
			</Row>
		);
	};

	const renderCategorySelected = (item: CategoryType) => {
		return (
			<Row key={item.id} style={[styles.itemSelected]}>
				<Image source={burger} style={{ width: 32, height: 32 }} />
				<Text style={styles.textItemSelect}>{item.name}</Text>
			</Row>
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<Header
				title={"name product"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
					elevation: 5,
				}}
				onPressBack={() => navigation.pop()}
			/>
			<ScrollView style={[styles.layoutScreen]} showsVerticalScrollIndicator={false}>
				<View style={styles.thumbnail}>
					<Image source={burger} style={styles.circularImage} />
					<TouchableOpacity onPress={() => {}} style={styles.buttonEdit}>
						<View>
							<SolarPenBold width={26} height={26} color={white.getColor()} />
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					<InputIcon placeholder={"product name"} height={56} />
				</View>
				<View style={styles.content}>
					<Selector
						data={data}
						renderItem={renderCategory}
						renderItemSelected={renderCategorySelected}
						// backgroundColorSelected={theme.background_input.getColor()}
					/>
				</View>
				<View style={styles.content}>
					<InputIcon placeholder={"quality"} height={56} />
				</View>
				<Row style={[styles.content, { width: "100%", alignItems: "center", justifyContent: "space-between" }]}>
					<InputIcon placeholder={"price"} height={56} width={168} />
					<InputIcon placeholder={"discount"} height={56} width={168} />
				</Row>
				<ButtonHasStatus title={"Add Option"} onPress={() => {}} active={true} styleButton={styles.button} />
			</ScrollView>
		</SafeAreaView>
	);
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
		},
		layoutScreen: {
			// flex: 1,
			paddingHorizontal: NumberValue.paddingHorizontalScreen,
			paddingVertical: 12,
		},
		circularImage: {
			width: 140,
			height: 140,
			borderRadius: 50,
		},
		thumbnail: {
			position: "relative",
			justifyContent: "center",
			alignItems: "center",
			paddingVertical: 12,
			width: "100%",
		},
		buttonEdit: {
			width: 36,
			backgroundColor: primary.getColor("500"),
			height: 36,
			borderRadius: 25,
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: 0,
			right: "30%",
		},
		content: {
			paddingVertical: 12,
		},
		itemSelects: {
			padding: 8,
			backgroundColor: theme.background_input.getColor(),
			borderBottomWidth: 1,
			borderBottomColor: theme.border.getColor(),
			borderStyle: "solid",
		},
		textItemSelect: {
			paddingLeft: 8,
			fontWeight: "bold",
		},
		itemSelected: {
			justifyContent: "flex-start",
			alignItems: "center",
		},
		button: {
			backgroundColor: primary.getColor("500"),
			padding: 12,
			borderRadius: 8,
			// justifyContent: "center",
			// alignItems: "center",
		},
	});
