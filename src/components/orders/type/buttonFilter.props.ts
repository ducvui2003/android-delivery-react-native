import ButtonReviewProps from "../../review/type/buttonReview.props";

/**
 * Author: Lam Hong Phong
 * Email: 21130473@gmail.com
 * Phone number: +84 376236485
 * Create at:  11/09/2024
 * User: lamhongphong
 **/
type ButtonFilterType = "ALL" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "5" | "4" | "3" | "2" | "1";
type ButtonFilterProps = Omit<ButtonReviewProps, "title"> & {
	title: ButtonFilterType;
};
export default ButtonFilterProps;
export { ButtonFilterType };
