type NotificationProps = {
	name: string;
	content: string;
	variant: Variant;
	time: string;
	isRead: boolean;
	onInfoPress: () => void;
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

export default NotificationProps;

export {Variant};
