const ORDER_STATUS_ACTIVE = "Active"
const ORDER_STATUS_COMPLETED = "Completed"
const ORDER_STATUS_CANCELLED = "Cancelled"
type StatusOrderType = "Active" | "Completed" | "Cancelled"
type OrderType = {
	id: number;
	price: number;
	images: {}[];
	starReview: number;
	status: StatusOrderType;
}

export default OrderType;
export {ORDER_STATUS_ACTIVE, ORDER_STATUS_COMPLETED, ORDER_STATUS_CANCELLED, StatusOrderType}