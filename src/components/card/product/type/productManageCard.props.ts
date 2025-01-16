/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:04 pm
 * User: ducvui2003
 **/
import ProductType from "../../../../types/product.type";

export type ProductManageCardProps = {
	product: Omit<ProductType, "favorite">;
	onEditPress?: () => void;
};
