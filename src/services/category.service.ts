/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:21 AM - 18/11/2024
 * User: lam-nguyen
 **/
import CategoryType from "../types/category.type";
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";

export const getCategories = async (): Promise<CategoryType[]> => {
	return axiosInstance.get<ApiResponse<CategoryType[]>>("/category").then(value => {
		return value.data.data;
	});
};

export const getHomeCategories = (data: CategoryType[]): CategoryType[] => {
	if (data.length > 12) {
		let temp = Object.assign<CategoryType[], CategoryType[]>([], data).slice(0, 11);
		temp.push({
			id: "",
			name: "More",
			urlImage: undefined,
		});
		return temp;
	} else return data;
};
