type NotificationProps = {
	name: string;
	content: string;
	typeNotification: string;
	time: string;
	isRead: boolean;
	onInfoPress: () => void;
};

export default NotificationProps;
