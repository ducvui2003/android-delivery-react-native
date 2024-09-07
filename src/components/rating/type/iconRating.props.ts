/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:51 AM - 06/09/2024
 * User: lam-nguyen
 **/
import IconRatingItemProps from "./iconRatingItem.props";

type IconRatingProps = Omit<IconRatingItemProps, "percent"> & {
	total: number;
	rating: number;
	gap?: number;
};

export default IconRatingProps;
