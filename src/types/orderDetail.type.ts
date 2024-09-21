import OrderType from "./order.type";
import ProductDetailType from "./productDetail.type";
import {MyLocation} from "../../assets/data/location/location";
import PaymentMethodType from "./paymentMethod.type";
import PromotionType from "./promotion.type";

type OrderDetailType = Omit<OrderType, "images"> & {
	products: Omit<ProductDetailType, "nutritional" | "quantity">[];
	address: MyLocation;
	paymentMethod: Pick<PaymentMethodType, "type">;
	promotions: Pick<PromotionType, "name">[];
	subTotal: number;
	deliveryFee: number;
	discount: number;
	description: string;
}
export default OrderDetailType;