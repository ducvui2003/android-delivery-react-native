/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:25 AM - 27/08/2024
 * User: lam-nguyen
 **/
import CategoryType from "../../../src/types/category.type";
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

const data: CategoryType[] = [
  {
    id: "1",
    urlImage: burger,
    name: "Burger",
  },
  {
    id: "2",
    urlImage: taco,
    name: "Taco",
  },
  {
    id: "3",
    urlImage: burrito,
    name: "Burrito",
  },
  {
    id: "4",
    urlImage: drink,
    name: "Drink",
  },
  {
    id: "5",
    urlImage: pizza,
    name: "Pizza",
  },
  {
    id: "6",
    urlImage: donut_1,
    name: "Donut",
  },
  {
    id: "7",
    urlImage: salad,
    name: "Salad",
  },
  {
    id: "8",
    urlImage: noodle_1,
    name: "Noodles",
  },
  {
    id: "9",
    urlImage: sandwich,
    name: "Sandwich",
  },
  {
    id: "10",
    urlImage: pasta,
    name: "Pasta",
  },
  {
    id: "11",
    urlImage: ice_cream,
    name: "Ice Cream",
  },
  {
    id: "12",
    urlImage: rice,
    name: "Rice",
  },
  {
    id: "13",
    urlImage: takoyaki,
    name: "Takoyaki",
  },
  {
    id: "14",
    urlImage: fruit,
    name: "Fruit",
  },
  {
    id: "15",
    urlImage: sausage,
    name: "Sausage",
  },
  {
    id: "16",
    urlImage: goi_cuon,
    name: "Goi Cuon",
  },
  {
    id: "17",
    urlImage: cookie,
    name: "Cookie",
  },
  {
    id: "18",
    urlImage: pudding,
    name: "Pudding",
  },
  {
    id: "19",
    urlImage: banh_mi,
    name: "Banh Mi",
  },
  {
    id: "20",
    urlImage: dumpling,
    name: "Dumpling",
  },
];

export default data;
