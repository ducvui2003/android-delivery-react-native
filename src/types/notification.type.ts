/*
loại thông báo có thể là:
Discount, Order Received, Order On Way, Order Confirmed, Order Successful,
Cancelled, Account Success, Credit Connect
// Cần tối ưu
*/
type NotificationType = {
	id: string;
	name: string;
	variant: Variant;
	content: string;
	time: string;
	isRead: boolean;
};
type Variant =
	"Discount"
	| "Order Received"
	| "Order On Way"
	| "Order Confirmed"
	| "Order Successful"
	| "Cancelled"
	| "Account Success"
	| "Credit Connect";
export default NotificationType;