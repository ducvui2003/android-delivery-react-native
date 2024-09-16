import OrderType from "./order.type";
import ProductDetailType from "./productDetail.type";

type OrderDetailType = Omit<OrderType, "images"> & {
	products: Omit<ProductDetailType[], "nutritional">;
	address: string;
	paymentMethod: string;
	promotions: string[];
	subTotal: number;
	deliveryFee: number;
	discount: number;
	total: number;
}
export default OrderDetailType;