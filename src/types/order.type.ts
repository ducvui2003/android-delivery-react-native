const ORDER_STATUS_ACTIVE = "Active"
const ORDER_STATUS_COMPLETED = "Completed"
const ORDER_STATUS_CANCELLED = "Cancelled"
type OrderType = {
	id: string;
	price: number;
	images: {}[];
	starReview: number;
	status: ORDER_STATUS_ACTIVE | ORDER_STATUS_COMPLETED | ORDER_STATUS_CANCELLED;
}

export default OrderType;
export {ORDER_STATUS_ACTIVE, ORDER_STATUS_COMPLETED, ORDER_STATUS_CANCELLED}