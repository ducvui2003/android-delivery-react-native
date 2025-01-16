/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:06 pm
 * User: ducvui2003
 **/
import CategoryType from "./category.type";

type ProductType = {
	id: string;
	name: string;
	image: string;
	avgRating: number;
	price: number;
	discountInfo?: DiscountInfo;
	favorite?: boolean;
	category: CategoryType
};

type DiscountInfo = {
	discount: number;
	expired: Date;
};

export default ProductType;
export type { DiscountInfo };
