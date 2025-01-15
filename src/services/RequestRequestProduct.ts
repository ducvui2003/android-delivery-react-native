/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:57 PM - 15/01/2025
 * User: lam-nguyen
 **/
import ProductDetailType from "../types/productDetail.type";

type RequestRequestProduct = Pick<ProductDetailType, "name" | "price" | "quantity" | "description"> & {
	category: string;
	nutritional: {
		name: string;
		value: number;
		unit: "g" | "ml" | "piece";
	}[];
	options?: string[];
	discountInfo?: {
		discount: number;
		expired: Date;
	};
	image?: string;
} & Partial<"">;

export default RequestRequestProduct;
