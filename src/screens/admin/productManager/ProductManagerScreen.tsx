import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Header } from "../../../components/header/Header";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Row from "../../../components/custom/Row";
import { burger } from "../../../../assets/images/category/category.icon";
import SolarAddCircleBold from "../../../../assets/images/icons/SolarAddCircleBold";
import GradientIconSvg from "../../../components/grandientIconSvg/GradientIconSvg";
import { primary } from "../../../configs/colors/color-template.config";
import { ThemeType } from "../../../types/theme.type";
import InputSearch from "../../../components/input/InputSearch";
import Col from "../../../components/custom/Col";
import textStyle from "../../../configs/styles/textStyle.config";
import spacing from "../../../configs/styles/space.config";
import { FlatList } from "react-native-gesture-handler";
import ProductManageCard from "../../../components/card/product/ProductManageCard";
import { ProductManageCardProps } from "../../../components/card/product/type/productManageCard.props";
import { productCardPropsList } from "../../../../assets/data/product/product.data";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

// type ProductManagerScreenProps = {
// 	route: RouteProp<RootStackParamList, "ProductManagerScreen">;
// 	navigation: NativeStackNavigationProp<RootStackParamList>;
// };

function ProductManagerScreen() {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ProductManagerScreen">>();
	const renderItem = ({ item }: { item: ProductManageCardProps }) => {
		return (
			<ProductManageCard
				{...item}
				onEditPress={() => {
					// navigation.navigate("OrderDetailScreen", { id: item.product.id});
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header
				title={
					<Row>
						<Image source={burger} style={{ width: 28, height: 28, marginLeft: 12 }} />
						<Text style={styles.title}>Product Manager</Text>
					</Row>
				}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
					elevation: 5,
				}}
				onPressBack={() => navigation.pop()}
				iconRight={
					<GradientIconSvg
						icon={<SolarAddCircleBold />}
						gradientColors={[primary.getColor("500"), primary.getColor("300")]}
					/>
				}
			/>

			<Col style={[{ paddingHorizontal: 25 }]}>
				<InputSearch styleInput={styles.inputSearchCustom} placeholder={"Search"} />
			</Col>

			<FlatList
				style={styles.card}
				data={productCardPropsList}
				renderItem={renderItem}
				keyExtractor={item => item.product.id}
				showsVerticalScrollIndicator={false}
				// contentContainerStyle={}
			/>
		</SafeAreaView>
	);
}
const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
		},
		title: {
			color: theme.text_1.getColor(),
			...textStyle["22_semibold"],
			marginStart: 12,
		},
		inputSearchCustom: {
			color: theme.text_1.getColor(),
			backgroundColor: theme.background_input.getColor(),
		},
		card: {
			margin: 20,
		}
	});

export default ProductManagerScreen;
