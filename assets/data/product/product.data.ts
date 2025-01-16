import { ProductManageCardProps } from "../../../src/components/card/product/type/productManageCard.props";

export const productCardPropsList: ProductManageCardProps[] = [
  {
    product: {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      image: "https://example.com/images/headphones.jpg",
      avgRating: 4.5,
      price: 99.99,
      discountInfo: { discount: 10, expired: new Date("2025-02-15") },
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 1"),
  },
  {
    product: {
      id: "2",
      name: "Smartwatch Pro",
      image: "https://example.com/images/smartwatch.jpg",
      avgRating: 4.7,
      price: 199.99,
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 2"),
  },
  {
    product: {
      id: "3",
      name: "Gaming Laptop",
      image: "https://example.com/images/laptop.jpg",
      avgRating: 4.9,
      price: 1299.99,
      discountInfo: { discount: 15, expired: new Date("2025-03-01") },
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 3"),
  },
  {
    product: {
      id: "4",
      name: "Portable Speaker",
      image: "https://example.com/images/speaker.jpg",
      avgRating: 4.3,
      price: 59.99,
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 4"),
  },
  {
    product: {
      id: "5",
      name: "4K Ultra HD TV",
      image: "https://example.com/images/tv.jpg",
      avgRating: 4.8,
      price: 799.99,
      discountInfo: { discount: 20, expired: new Date("2025-04-20") },
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 5"),
  },
  {
    product: {
      id: "6",
      name: "Noise Cancelling Earbuds",
      image: "https://example.com/images/earbuds.jpg",
      avgRating: 4.6,
      price: 149.99,
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 6"),
  },
  {
    product: {
      id: "7",
      name: "Fitness Tracker",
      image: "https://example.com/images/tracker.jpg",
      avgRating: 4.4,
      price: 89.99,
      discountInfo: { discount: 5, expired: new Date("2025-01-31") },
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 7"),
  },
  {
    product: {
      id: "8",
      name: "Smartphone XS",
      image: "https://example.com/images/smartphone.jpg",
      avgRating: 4.5,
      price: 999.99,
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 8"),
  },
  {
    product: {
      id: "9",
      name: "Wireless Charging Pad",
      image: "https://example.com/images/chargingpad.jpg",
      avgRating: 4.2,
      price: 39.99,
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 9"),
  },
  {
    product: {
      id: "10",
      name: "Action Camera",
      image: "https://example.com/images/camera.jpg",
      avgRating: 4.8,
      price: 299.99,
      discountInfo: { discount: 10, expired: new Date("2025-05-10") },
    },
    onEditPress: () => console.log("Edit button pressed for product ID: 10"),
  },
];
