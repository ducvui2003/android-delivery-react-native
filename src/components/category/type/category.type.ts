/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 11:58am
 * User: ducvui2003
 **/
import { Category } from "../../../types/category.type";

export type CategoryType = {
	item: Category;
	onPress?: () => void;
};
