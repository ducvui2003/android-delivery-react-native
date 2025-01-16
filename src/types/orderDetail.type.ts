import OrderType from "./order.type";
import ProductDetailType, { OptionType } from "./productDetail.type";
import { MyLocation } from "../../assets/data/location/location";
import PaymentMethodType from "./paymentMethod.type";
import PromotionType from "./promotion.type";

type OrderDetailItemType = Omit<ProductDetailType, "nutritional" | "options"> & {
	options?: OptionType[];
};

type OrderDetailType = Omit<OrderType, "images"> & {
	email: string;
	phone: string;
	fullName: string;
	items: OrderDetailItemType[];
	address: MyLocation;
	paymentMethod: Pick<PaymentMethodType, "type">;
	promotions: Pick<PromotionType, "name">[];
	subTotal: number;
	deliveryFee: number;
	discount: number;
	description?: string;
	reasonForCancellation?: string;
};
export default OrderDetailType;
