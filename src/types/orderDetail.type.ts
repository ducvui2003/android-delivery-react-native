import OrderType from "./order.type";
import ProductDetailType from "./productDetail.type";

type OrderDetailType = Omit<OrderType, "images"> & {
	products: Omit<ProductDetailType, "nutritional" | "quantity">[];
	address: string;
	paymentMethod: string;
	promotions: string[];
	subTotal: number;
	deliveryFee: number;
	discount: number;
}
export default OrderDetailType;