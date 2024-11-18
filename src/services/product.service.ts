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

export const getProductByCategoryId = async (id: String): Promise<ApiPagingType<ProductType>> => {
	return axiosInstance.get<ApiResponse<ApiPagingType<ProductType>>>(`/product/category/${id}`).then(value => {
		return value.data.data;
	});
};

export const searchProduct = async (
	data: SearchProductType
): Promise<ApiPagingType<ProductType>> => {
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
