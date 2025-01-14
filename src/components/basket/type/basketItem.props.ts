/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:10 PM - 06/09/2024
 * User: lam-nguyen
 **/
import OptionAddProps from "./optionAdd.props";

type BasketItemProps = {
	id: number;
	productId: string;
	name: string;
	price: number;
	discount?: number;
	quantity: number;
	image: string;
	options?: OptionAddProps[];
	quantityMax: number;
};

export default BasketItemProps;
