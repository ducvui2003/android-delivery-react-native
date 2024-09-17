import ProductType from "../../../src/types/product.type";
import { donut_1, drink, pizza, salad, burger } from "../../images/category/category.icon";

const wishlist: ProductType[] = [
  {
    id: "1",
    image: "product/66d31ce03d76c79dc1ee4847/display.png",
    name: "Coca-Cola",
    rating: 4.5,
    price: 12000,
    discountInfo: {
      discount: 10,
      expired: new Date("2024-09-15"),
    },
    isLiked: true,
  },
  {
    id: "2",
    image: "product/66d31ce03d76c79dc1ee4847/display.png",
    name: "Pepperoni Pizza",
    rating: 4.7,
    price: 150000,
    discountInfo: {
      discount: 20,
      expired: new Date("2024-09-20"),
    },
    isLiked: true,
  },
  {
    id: "3",
    image: "product/66d31ce03d76c79dc1ee4847/display.png",
    name: "Beef Burger",
    rating: 4.8,
    price: 85000,
    isLiked: true,
  },
  {
    id: "4",
    image: "product/66d31ce03d76c79dc1ee4847/display.png",
    name: "Glazed Donut",
    rating: 4.3,
    price: 25000,
    isLiked: true,
  },
  {
    id: "5",
    image: "product/66d31ce03d76c79dc1ee4847/display.png",
    name: "Caesar Salad",
    rating: 4.6,
    price: 65000,
    isLiked: true,
  },
];

export default wishlist;
