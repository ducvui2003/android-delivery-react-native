/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:25 AM - 27/08/2024
 * User: lam-nguyen
 **/
import { Category } from "../../../src/types/category.type";
import {
  banh_mi,
  burger,
  burrito,
  cookie,
  donut_1,
  drink,
  dumpling,
  fruit,
  goi_cuon,
  ice_cream,
  noodle_1,
  pasta,
  pizza,
  pudding,
  rice,
  salad,
  sandwich,
  sausage,
  taco,
  takoyaki,
} from "../../images/category/category.icon";

const data: Category[] = [
  {
    id: 1,
    image: burger,
    name: "Burger",
  },
  {
    id: 2,
    image: taco,
    name: "Taco",
  },
  {
    id: 3,
    image: burrito,
    name: "Burrito",
  },
  {
    id: 4,
    image: drink,
    name: "Drink",
  },
  {
    id: 5,
    image: pizza,
    name: "Pizza",
  },
  {
    id: 6,
    image: donut_1,
    name: "Donut",
  },
  {
    id: 7,
    image: salad,
    name: "Salad",
  },
  {
    id: 8,
    image: noodle_1,
    name: "Noodles",
  },
  {
    id: 9,
    image: sandwich,
    name: "Sandwich",
  },
  {
    id: 10,
    image: pasta,
    name: "Pasta",
  },
  {
    id: 11,
    image: ice_cream,
    name: "Ice Cream",
  },
  {
    id: 12,
    image: rice,
    name: "Rice",
  },
  {
    id: 13,
    image: takoyaki,
    name: "Takoyaki",
  },
  {
    id: 14,
    image: fruit,
    name: "Fruit",
  },
  {
    id: 15,
    image: sausage,
    name: "Sausage",
  },
  {
    id: 16,
    image: goi_cuon,
    name: "Goi Cuon",
  },
  {
    id: 17,
    image: cookie,
    name: "Cookie",
  },
  {
    id: 18,
    image: pudding,
    name: "Pudding",
  },
  {
    id: 19,
    image: banh_mi,
    name: "Banh Mi",
  },
  {
    id: 20,
    image: dumpling,
    name: "Dumpling",
  },
];

export default data;
