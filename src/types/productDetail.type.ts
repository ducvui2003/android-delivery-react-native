/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:37 PM - 28/08/2024
 * User: lam-nguyen
 **/
import ProductType from "./product.type";

type ProductDetailType = ProductType & {
	quantity: number;
	description: string;
	nutritional_information?: NutritionalType[];
	additional_option?: (OptionType | GroupOptionType)[];
};

export type OptionType = {
	_id: string;
	name: string;
	price: number;
};

export type GroupOptionType = {
	_id: string;
	name: string;
	options: OptionType[];
};

export type NutritionalType = {
	name: string;
	value: string | number;
};

export default ProductDetailType;
