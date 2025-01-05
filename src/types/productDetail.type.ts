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
	nutritional?: NutritionalType[];
	options?: (OptionType | GroupOptionType)[];
	rating: RatingType;
};

export type RatingType = {
	productId: string;
	totalReview: number;
	averageRating: number;
	ratingDistribution: Map<string, number>;
};

export type OptionType = {
	id: string;
	name: string;
	price: number;
};

export type GroupOptionType = {
	id: string;
	name: string;
	options: OptionType[];
};

export type NutritionalType = {
	name: string;
	value: string | number;
};

export default ProductDetailType;
