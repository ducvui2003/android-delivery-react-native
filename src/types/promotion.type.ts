/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 3:04 PM - 12/09/2024
 * User: Binnguci
 **/

type PromotionType = {
	id: string;
	name: string;
	description?: string;
	duration?: string;
	promotionCode?: string;
	applicableScope?: string;
	discountAmount?: number;
	termsAndConditions?: string;
}
export default PromotionType;