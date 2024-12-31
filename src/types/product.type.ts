/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:06 pm
 * User: ducvui2003
 **/

type ProductType = {
	id: string;
	image: string;
	name: string;
	avgRating: number;
	price: number;
	discountInfo?: DiscountInfo;
	isLiked?: boolean;
};

type DiscountInfo = {
	discount: number;
	expired: Date;
};

export default ProductType;
export type { DiscountInfo };
