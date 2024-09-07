/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:35 AM - 06/09/2024
 * User: lam-nguyen
 **/

type ReviewType = "All" | "Positive" | "Negative" | "5" | "4" | "3" | "2" | "1";

type ButtonReviewProps = {
	title: ReviewType;
	isSelected: boolean;
	hiddenIconRight?: boolean;
	hiddenIconLeft?: boolean;
	onPress?: () => void;
};

export default ButtonReviewProps;
export { ReviewType };
