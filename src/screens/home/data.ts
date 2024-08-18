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
import taco from "../../../assets/images/category/taco.png";
import burrito from "../../../assets/images/category/burrito.png";
import drink from "../../../assets/images/category/drink.png";
import pizza from "../../../assets/images/category/pizza.png";
import donut from "../../../assets/images/category/donut_2.png";
import salad from "../../../assets/images/category/salad.png";
import noodles from "../../../assets/images/category/noodle_2.png";
import sandwich from "../../../assets/images/category/sandwich.png";
import pasta from "../../../assets/images/category/pasta.png";
import iceCream from "../../../assets/images/category/ice_cream.png";
import more from "../../../assets/images/category/more.png";
import { Category } from "../../types/category.type";
import { Product } from "../../types/product.type";

export const banners: string[] = [banner_1, banner_2, banner_3];
export const categories: Category[] = [
	{
		id: 1,
		name: "Bugger",
		image: bugger,
	},
	{
		id: 2,
		name: "Taco",
		image: taco,
	},
	{
		id: 3,
		name: "Burrito",
		image: burrito,
	},
	{
		id: 4,
		name: "Drink",
		image: drink,
	},
	{
		id: 5,
		name: "Pizza",
		image: pizza,
	},
	{
		id: 6,
		name: "Donut",
		image: donut,
	},
	{
		id: 7,
		name: "Salad",
		image: salad,
	},
	{
		id: 8,
		name: "Noddles",
		image: noodles,
	},
	{
		id: 9,
		name: "Sandwich",
		image: sandwich,
	},
	{
		id: 10,
		name: "Pasta",
		image: pasta,
	},
	{
		id: 11,
		name: "Ice Cream",
		image: iceCream,
	},
	{
		id: 1,
		name: "More",
		image: more,
	},
];

export const products: Product[] = [
	{
		id: "1",
		name: "Hambugger",
		image: {},
		basePrice: 100,
		rating: 5,
	},
	{
		id: "1",
		name: "Hambugger",
		image: {},
		basePrice: 100,
		rating: 5,
	},
];
