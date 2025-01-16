const ORDER_STATUS_ACTIVE = "ACTIVE";
const ORDER_STATUS_COMPLETED = "COMPLETED";
const ORDER_STATUS_CANCELLED = "CANCELLED";
type StatusOrderType = "ACTIVE" | "COMPLETED" | "CANCELLED";
type OrderType = {
	id: number;
	price: number;
	images: string[];
	starReview: number;
	status: StatusOrderType;
};

export default OrderType;
export { ORDER_STATUS_ACTIVE, ORDER_STATUS_COMPLETED, ORDER_STATUS_CANCELLED, StatusOrderType };
