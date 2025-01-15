/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:11 PM - 15/01/2025
 *  User: lam-nguyen
 **/

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import ImagePicker from "../utils/imagePicker";
import { ImagePickerAsset } from "expo-image-picker";
import { createProduct } from "../services/product.service";
import RequestRequestProduct from "../services/RequestRequestProduct";

function AddImageScreen() {
	const [asset, setAsset] = useState<ImagePickerAsset | undefined>();

	return (
		<SafeAreaView style={{ gap: 20 }}>
			<TouchableOpacity
				onPress={() => {
					ImagePicker.pickImage().then(asset => {
						setAsset(asset);
					});
				}}
			>
				<Text style={{ backgroundColor: "red", width: "auto", padding: 10 }}>Chọn ảnh</Text>
			</TouchableOpacity>

			{asset && (
				<TouchableOpacity
					onPress={() => {
						createProduct(data, asset)
							.then(result => {
								console.log(result);
							})
							.catch(e => {
								console.log(e);
							});
					}}
				>
					<Text style={{ backgroundColor: "blue", width: "auto", padding: 20 }}>Tải ảnh lên</Text>
				</TouchableOpacity>
			)}
		</SafeAreaView>
	);
}

const data = {
	name: "San pham test moi nhat 2025",
	price: 30000000,
	quantity: 100,
	description:
		"A delicious chicken burger served on a toasted bun with fresh lettuce, tomato slices, and mayonnaise. Juicy grilled chicken patty seasoned to perfection for a mouthwatering taste experience.",
	category: "673a98f3f3a3ff5f3257f49f",
	options: ["66d31af443a67fd67b714c90", "66d31b0a43a67fd67b714c93"],
	nutritional: [
		{
			name: "Calories",
			value: 420,
			unit: "g",
		},
		{
			name: "Protein",
			value: 27,
			unit: "g",
		},
		{
			name: "Carbs",
			value: 30,
			unit: "g",
		},
		{
			name: "Fat",
			value: 18,
			unit: "g",
		},
	],
	discountInfo: {
		discount: 60,
		expired: new Date(Date.parse("2024-08-31")),
	},
} as RequestRequestProduct;

export default AddImageScreen;
