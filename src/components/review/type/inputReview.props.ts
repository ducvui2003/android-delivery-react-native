/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:49 AM - 08/09/2024
 * User: lam-nguyen
 **/

type InputReviewProps = {
	onTextChange?: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onPressCamera?: () => void;
	onPressGallery?: () => void;
	background?: string;
};

export default InputReviewProps;
