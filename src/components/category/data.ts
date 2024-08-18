/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 9:44am
 * User: ducvui2003
 **/
import banner_1 from "../../../assets/images/banner/banner_1.png";
import banner_2 from "../../../assets/images/banner/banner_2.png";
import banner_3 from "../../../assets/images/banner/banner_3.png";
import bugger from "../../../assets/images/category/cheese_burger.png";
import { Category } from "../../types/category.type";

export const banners: string[] = [banner_1, banner_2, banner_3];
export const categories: Category[] = [
	{
		id: 1,
		name: "Bugger",
		image: bugger,
	},
];
