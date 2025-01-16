import { ThemeType } from "../../../types/theme.type";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../configs/redux/store.config";
import { Header } from "../../../components/header/Header";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/stack.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { burger } from "../../../../assets/images/category/category.icon";
import { primary, white } from "../../../configs/colors/color-template.config";
import SolarPenBold from "../../../../assets/images/icons/SolarPenBold";
import InputIcon from "../../../components/input/InputIcon";
import NumberValue from "../../../configs/value/number.value";
import Selector from "../../../components/selector/Selector";
import CategoryType from "../../../types/category.type";
import Row from "../../../components/custom/Row";
import ButtonHasStatus from "../../../components/custom/ButtonHasStatus";
import { ImagePickerAsset } from "expo-image-picker";
import ImagePicker from "../../../utils/imagePicker";
import { loadCategories } from "../../../hooks/redux/category.slice";
import { Divider } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import CreateProductRequest from "../../../types/request/createProduct.request";
import { createProduct, updateProduct } from "../../../services/product.service";
import textStyle from "../../../configs/styles/textStyle.config";
import { FlatList } from "react-native-gesture-handler";
import ProductDetailType, { GroupOptionType, OptionType } from "../../../types/productDetail.type";
import ProductOptionService from "../../../services/productOption.service";
import SolarCheckBold from "../../../../assets/images/icons/SolarCancelBold";
import axiosInstance, { ApiResponse } from "../../../configs/axios/axios.config";

type ProductSaveManageScreenProps = {
	route: RouteProp<RootStackParamList, "ModifyProductManageScreen">;
	navigation: NativeStackNavigationProp<RootStackParamList>;
};
export default function ModifyProductManageScreen({
	route: {
		params: { id },
	},
	navigation,
}: ProductSaveManageScreenProps) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [asset, setAsset] = useState<ImagePickerAsset | undefined>();
	const categories: CategoryType[] = useSelector((state: RootState) => state.categoryState.categories);
	const [options, setOptions] = useState<(OptionType | GroupOptionType)[]>([]);
	const dispatch = useAppDispatch();
	const [showOption, setShowOption] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		formState: { isValid },
		setValue,
		getValues,
		trigger,
	} = useForm<CreateProductRequest>({ mode: "all" });

	useEffect(() => {
		dispatch(loadCategories());
		ProductOptionService.loadAllProductOption().then(data => {
			setOptions(data);
		});
	}, [dispatch]);

	useEffect(() => {
		if (!id) return;
		axiosInstance.get<ApiResponse<ProductDetailType>>(`/product/${id}`).then(res => {
			const data = res.data.data;
			setValue("name", data.name);
			setValue("quantity", data.quantity);
			setValue("price", data.price);
			setValue("description", data.description);
			setValue("category", data.category.id);
			setValue("image", data.image);

			trigger("name").then();
			trigger("quantity").then();
			trigger("description").then();
			trigger("category").then();
			trigger("image").then();
		});
	}, []);

	const renderCategory = (item: CategoryType, index: number) => {
		return (
			<Row key={item.id + index} style={[styles.itemSelected, styles.itemSelects]}>
				<Image source={{ uri: item.urlImage }} style={{ width: 32, height: 32 }} />
				<Text style={styles.textItemSelect}>{item.name}</Text>
			</Row>
		);
	};

	const renderCategorySelected = (item: CategoryType) => {
		return (
			<Row key={item.id} style={[styles.itemSelected]}>
				<Image source={{ uri: item.urlImage }} style={{ width: 32, height: 32 }} />
				<Text style={styles.textItemSelect}>{item.name}</Text>
			</Row>
		);
	};

	const submitCreateProduct = (data: CreateProductRequest) => {
		if (!isValid) return;
		if (!id && asset) {
			createProduct(data, asset)
				.then(_ => {
					navigation.replace("ProductManagerScreen");
				})
				.catch(() => {});
			return;
		}

		if (id) {
			const dataUpdate = data as CreateProductRequest & { id: string };
			dataUpdate.id = id;
			updateProduct(dataUpdate, asset)
				.then(_ => {
					navigation.replace("ProductManagerScreen");
				})
				.catch(_ => {});
		}
		return;
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header
				title={id ? "Update product" : "Create product"}
				colorTitle={theme.text_1.getColor()}
				colorIconBack={theme.text_1.getColor()}
				styleIconBack={{
					backgroundColor: theme.header.backgroundIconBack.getColor(),
					elevation: 5,
				}}
				onPressBack={() => navigation.pop()}
			/>

			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={[1]}
				style={[styles.layoutScreen]}
				renderItem={() => {
					return (
						<>
							<TouchableOpacity
								onPress={() => {
									ImagePicker.pickImage().then(asset => {
										setAsset(asset);
									});
								}}
							>
								<View style={styles.thumbnail}>
									<Image
										source={
											asset || getValues("image")
												? { uri: asset?.uri ?? getValues("image") }
												: burger
										}
										style={styles.circularImage}
									/>
									<TouchableOpacity
										onPress={() => {
											ImagePicker.pickImage().then(asset => {
												setAsset(asset);
											});
										}}
										style={styles.buttonEdit}
									>
										<SolarPenBold width={26} height={26} color={white.getColor()} />
									</TouchableOpacity>
								</View>
							</TouchableOpacity>
							<Controller
								control={control}
								name={"name"}
								rules={{
									required: "Name is required",
								}}
								render={({ field: { onChange, value }, fieldState: { error } }) => {
									return (
										<View style={styles.content}>
											<InputIcon
												placeholder={"Product name"}
												onChange={element => {
													onChange(element.nativeEvent.text);
												}}
												value={value}
											/>
											{error && (
												<Text style={{ color: primary.getColor("500") }}>{error.message}</Text>
											)}
										</View>
									);
								}}
							/>

							<View style={styles.content}>
								{categories.length ? (
									<Selector
										data={categories}
										renderItem={renderCategory}
										renderItemSelected={renderCategorySelected}
										onSelected={item => {
											setValue("category", item.id);
										}}
										selectItemWhere={item => item.id === getValues("category")}
									/>
								) : (
									<></>
								)}
							</View>

							<Controller
								control={control}
								name={"quantity"}
								rules={{
									required: "Quantity is required",
									min: {
										value: 0,
										message: "Quantity must higher than 0",
									},
								}}
								render={({ field: { onChange, value }, fieldState: { error } }) => {
									return (
										<View style={styles.content}>
											<InputIcon
												placeholder={"Quality"}
												keyboardType={"decimal-pad"}
												onChange={element => {
													onChange(element.nativeEvent.text);
												}}
												value={value?.toString()}
											/>
											{error && (
												<Text style={{ color: primary.getColor("500") }}>{error.message}</Text>
											)}
										</View>
									);
								}}
							/>

							<Controller
								control={control}
								name={"price"}
								rules={{
									required: "Price is required",
									min: {
										value: 0,
										message: "Price must higher than 0",
									},
								}}
								render={({ field: { onChange, value }, fieldState: { error } }) => {
									return (
										<View style={styles.content}>
											<InputIcon
												placeholder={"Price"}
												keyboardType={"decimal-pad"}
												onChange={element => {
													onChange(element.nativeEvent.text);
												}}
												value={value?.toString()}
											/>
											{error && (
												<Text style={{ color: primary.getColor("500") }}>{error.message}</Text>
											)}
										</View>
									);
								}}
							/>

							<Controller
								control={control}
								name={"description"}
								rules={{
									required: "Description is required",
								}}
								render={({ field: { onChange, value }, fieldState: { error } }) => {
									return (
										<View style={styles.content}>
											<InputIcon
												placeholder={"Description"}
												multiline={true}
												onChange={element => {
													onChange(element.nativeEvent.text);
												}}
												value={value}
											/>
											{error && (
												<Text style={{ color: primary.getColor("500") }}>{error.message}</Text>
											)}
										</View>
									);
								}}
							/>

							<Divider
								color={theme.text_1.getColor()}
								width={2}
								subHeaderStyle={[
									{
										color: theme.text_1.getColor(),
										textAlign: "center",
										...textStyle["22_semibold"],
										marginBottom: 10,
									},
								]}
								subHeader={"Product option"}
							/>

							<View style={styles.content}>
								{options.length && showOption ? (
									<Row style={{ justifyContent: "space-between" }}>
										<Selector
											width={"85%"}
											data={options.filter(
												value => !(getValues("options") ?? []).includes(value.id)
											)}
											renderItem={(item, index) => {
												return (
													<Text
														key={`option-${index}`}
														style={[styles.textItemSelect, styles.itemSelects]}
													>
														{item.name}
													</Text>
												);
											}}
											renderItemSelected={item => {
												return <Text style={[styles.textItemSelect]}>{item.name}</Text>;
											}}
											onSelected={item => {
												setValue("options", [...(getValues("options") ?? []), item.id]);
											}}
											backgroundColorItems={theme.background.getColor()}
										/>
										<TouchableOpacity
											style={{ width: 40, height: 40 }}
											onPress={() => {
												// setValue("options", (getValues("options") ?? []).filter());
												setShowOption(false);
											}}
										>
											<SolarCheckBold width={40} height={40} color={"red"} />
										</TouchableOpacity>
									</Row>
								) : (
									<></>
								)}
							</View>

							<ButtonHasStatus title={"Add Option"} onPress={() => setShowOption(true)} active={true} />
							<ButtonHasStatus
								title={"Save"}
								onPress={handleSubmit(submitCreateProduct)}
								active={isValid && (!!asset || !!getValues("image"))}
							/>
						</>
					);
				}}
			/>

			<ScrollView style={[styles.layoutScreen]} showsVerticalScrollIndicator={false}></ScrollView>
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
			width: 150,
			height: 150,
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
	});
