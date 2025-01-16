/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:25 PM - 16/01/2025
 * User: lam-nguyen
 **/
import axiosInstance, { ApiResponse } from "../configs/axios/axios.config";
import { EndPoint } from "../utils/EndPoint";
import { GroupOptionType, OptionType } from "../types/productDetail.type";

const loadAllProductOption = () => {
	return axiosInstance.get<ApiResponse<(OptionType | GroupOptionType)[]>>(EndPoint.PRODUCT_OPTION).then(data => {
		return data.data.data;
	});
};

export default { loadAllProductOption };
