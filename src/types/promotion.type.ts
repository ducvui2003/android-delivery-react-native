/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 3:04 PM - 12/09/2024
 * User: Binnguci
 **/
type DiscountPromotionInfoType = {
	discount: number,
	startDate: Date,
	expired: Date,
}

type PromotionType = {
	id: string;
	name: string;
	description?: string;
	discountPromotionInfo: DiscountPromotionInfoType,
	promotionCode?: string;
	applicableScope?: string;
	termsAndConditions?: string;
}
export default PromotionType;