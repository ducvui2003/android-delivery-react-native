/*
loại thông báo có thể là:
Discount, Order Received, Order On Way, Order Confirmed, Order Successful,
Cancelled, Account Success, Credit Connect
// Cần tối ưu
*/
type NotificationType = {
	id: string;
	name: string;
	typeNotification: string;
	content: string;
	time: string;
	isRead: boolean;
};
export default NotificationType;