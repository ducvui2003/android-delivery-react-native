/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:04 pm
 * User: ducvui2003
 **/
import { Product } from "../../../../types/product.type";

export type ProductHomeCardType = {
	product: Product;
	onPress?: () => void;
	onPressHeart?: () => void;
};
