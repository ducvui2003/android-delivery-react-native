/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:32 PM - 04/10/2024
 * User: lam-nguyen
 **/

type MessageContentProps = {
	role: "SENDER" | "RECEIVER";
	time: string;
	contents: string[] | string;
	images?: string[] | string;
};

export default MessageContentProps;
