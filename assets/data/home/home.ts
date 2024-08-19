/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 9:44am
 * User: ducvui2003
 **/
import banner_1 from "../../images/banner/banner_1.png";
import banner_2 from "../../images/banner/banner_2.png";
import banner_3 from "../../images/banner/banner_3.png";
import bugger from "../../images/category/cheese_burger.png";
import taco from "../../images/category/taco.png";
import burrito from "../../images/category/burrito.png";
import drink from "../../images/category/drink.png";
import pizza from "../../images/category/pizza.png";
import donut from "../../images/category/donut_2.png";
import salad from "../../images/category/salad.png";
import noodles from "../../images/category/noodle_2.png";
import sandwich from "../../images/category/sandwich.png";
import pasta from "../../images/category/pasta.png";
import iceCream from "../../images/category/ice_cream.png";
import more from "../../images/category/more.png";
import { Category } from "../../../src/types/category.type";
import { Product } from "../../../src/types/product.type";

export const banners: object[] = [banner_1, banner_2, banner_3];
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
    image:
      "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    basePrice: 100,
    rating: 5,
    isLiked: true,
  },
  {
    id: "1",
    name: "Hambugger",
    image:
      "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    basePrice: 100,
    salePrice: 90,
    rating: 5,
  },
  {
    id: "1",
    name: "Hambugger",
    image:
      "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    basePrice: 100,
    salePrice: 90,
    rating: 5,
  },
  {
    id: "1",
    name: "Hambugger",
    image:
      "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    basePrice: 100,
    salePrice: 90,
    rating: 5,
  },
  {
    id: "1",
    name: "Hambugger",
    image:
      "https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    basePrice: 100,
    salePrice: 90,
    rating: 5,
  },
];
