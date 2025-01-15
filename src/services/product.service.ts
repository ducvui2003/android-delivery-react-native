/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:21 AM - 18/11/2024
 * User: lam-nguyen
 **/

import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import ProductType from "../types/product.type";
import ApiPagingType from "../types/apiPaging.type";
import SearchProductType from "../types/searchProduct.type";
import ProductDetailType from "../types/productDetail.type";
import { ImagePickerAsset } from "expo-image-picker";
import { firebaseStorage } from "../configs/firebase/firebase.config";
import uuid from "react-native-uuid";
import RequestRequestProduct from "./RequestRequestProduct";
import store from "../configs/redux/store.config";
import { setLoading } from "../hooks/redux/modal.slice";

export const getProductByCategoryId = async (id: String): Promise<ApiPagingType<ProductType>> => {
	return axiosInstance.get<ApiResponse<ApiPagingType<ProductType>>>(`/product/category/${id}`).then(value => {
		return value.data.data;
	});
};

export const searchProduct = async (data: SearchProductType): Promise<ApiPagingType<ProductType>> => {
	return axiosInstance
		.get<ApiResponse<ApiPagingType<ProductType>>, any, SearchProductType>(`/product/search`, {
			params: {
				name: data.name,
				category: data.category,
				isBestSeller: data.isBestSeller,
				isNew: data.isNew,
				page: data.page,
			},
		})
		.then(value => {
			return value.data.data;
		});
};

export const getProducts = async (): Promise<ApiPagingType<ProductType>> => {
	try {
		const response = await axiosInstance.get<ApiResponse<ApiPagingType<ProductType>>>("/product");
		return response.data.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const createProduct = async (
	product: RequestRequestProduct,
	asset: ImagePickerAsset
): Promise<ProductDetailType> => {
	const image = `product/${uuid.v4()}.png`;
	store.dispatch(setLoading(true));
	return firebaseStorage
		.ref(image)
		.putFile(asset.uri)
		.then(async result => {
			if (result.state !== "success") return;
			product.image = image;
			const response = await axiosInstance.post<ApiResponse<ProductDetailType>>("/product", product);
			return response.data.data;
		})
		.catch(e => {
			store.dispatch(setLoading(false));
			throw e;
		});
};

export const likeProduct = async (id: string): Promise<ApiResponse<void>> => {
	const response = await axiosInstance.post<ApiResponse<void>>(`/product/favorite/${id}`);
	return response.data;
};

export const unlikeProduct = async (id: string): Promise<ApiResponse<void>> => {
	const response = await axiosInstance.delete<ApiResponse<void>>(`/product/favorite/${id}`);
	return response.data;
};
