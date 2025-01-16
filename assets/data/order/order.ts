import { OrderProps } from "../../../src/components/orders/type/order.props";
import { banh_mi, burger, burrito, donut_1, lemonade, pasta, sandwich } from "../../images/category/category.icon";
import { ORDER_STATUS_ACTIVE, ORDER_STATUS_CANCELLED, ORDER_STATUS_COMPLETED } from "../../../src/types/order.type";
import OrderDetailType from "../../../src/types/orderDetail.type";

const DATA: OrderProps[] = [
    {
        id: "SP1",
        price: 1000,
        images: [burger, burrito, sandwich],
        starReview: 5,
        status: ORDER_STATUS_COMPLETED,
        onPress: () => {},
    },
    {
        id: "SP2",
        price: 2000,
        images: [burger, burrito],
        starReview: 4,
        status: ORDER_STATUS_CANCELLED,
        onPress: () => {},
    },
    {
        id: "SP3",
        price: 3000,
        images: [burrito, sandwich],
        starReview: 3,
        status: ORDER_STATUS_ACTIVE,
        onPress: () => {},
    },
    {
        id: "SP4",
        price: 4000,
        images: [burger],
        starReview: 2,
        status: ORDER_STATUS_CANCELLED,
        onPress: () => {},
    },
    {
        id: "SP5",
        price: 2000,
        images: [burger, burrito],
        starReview: 4,
        status: "Cancelled",
        onPress: () => {},
    },
    {
        id: "SP6",
        price: 3000,
        images: [burrito, sandwich],
        starReview: 3,
        status: "Completed",
        onPress: () => {},
    },
    {
        id: "SP7",
        price: 4000,
        images: [burger],
        starReview: 2,
        status: "Active",
        onPress: () => {},
    },
];
// Khởi tạo dữ liệu cho các phần tử
const orders: OrderDetailType[] = [
    {
        id: "SP1",
        price: 1000,
        starReview: 5,
        status: ORDER_STATUS_COMPLETED,
        items: [
            {
                id: "prod1",
                image: burrito,
                name: "Apple",
                rating: 5,
                price: 60000,
                discountInfo: {
                    discount: 0.5,
                    expired: new Date("2027-12-31"),
                },
                description: "Fresh red apples",
                options: [
                    { id: "opt1", name: "No Sugar", price: 0.3 },
                    {
                        id: "grp1",
                        name: "Chan Chau",
                        options: [
                            { id: "opt2", name: "den", price: 0.5 },
                            { id: "opt3", name: "trang", price: 0.3 },
                        ],
                    },
                ],
            },
            {
                id: "prod12",
                image: banh_mi,
                name: "Banh mi",
                rating: 4,
                price: 50000,
                discountInfo: {
                    discount: 0.5,
                    expired: new Date("2027-12-31"),
                },
                description: "",
            },
        ],
        address: {
            name: "Home",
            address: "123 Main St",
        },
        paymentMethod: { type: "Credit Card" },
        promotions: [{ name: "PROMO10" }, { name: "PREE" }],
        subTotal: 4.5,
        deliveryFee: 2.0,
        discount: 0.5,
        description: "",
    },
    {
        id: "SP2",
        price: 2000,
        starReview: 4,
        status: ORDER_STATUS_CANCELLED,
        items: [
            {
                id: "prod2",
                image: burger,
                name: "Banana",
                rating: 4,
                discountInfo: {
                    discount: 0.5,
                    expired: new Date("2027-12-31"),
                },
                price: 0.75,
                description: "Fresh yellow bananas",
                options: [{ id: "opt4", name: "Organic", price: 1 }],
            },
            {
                id: "prod22",
                image: donut_1,
                name: "Banana",
                rating: 4,
                discountInfo: {
                    discount: 0.5,
                    expired: new Date("2027-12-31"),
                },
                price: 0.75,
                description: "Fresh yellow bananas",
                options: [{ id: "opt4", name: "Organic", price: 1 }],
            },
        ],
        address: {
            name: "Home",
            address: "123 Main St",
        },
        paymentMethod: { type: "Credit Card" },
        promotions: [{ name: "PROMO10" }, { name: "PREE DELIVERY" }],
        subTotal: 5.5,
        deliveryFee: 1.5,
        discount: 1.0,
        reasonForCancellation: "This is a very good product",
    },
    {
        id: "SP3",
        price: 3000,
        starReview: 3,
        status: ORDER_STATUS_ACTIVE,
        items: [
            {
                id: "prod3",
                name: "Orange Juice",
                image: lemonade,
                rating: 0,
                price: 3.0,
                description: "Freshly squeezed orange juice",
            },
            {
                id: "prod31",
                image: pasta,
                rating: 0,
                name: "Orange Juice",
                price: 3.0,
                description: "Freshly squeezed orange juice",
            },
        ],
        address: {
            name: "Home",
            address: "123 Main St",
        },
        paymentMethod: { type: "Credit Card" },
        promotions: [{ name: "PROMO10" }, { name: "PREE DELIVERY" }],
        subTotal: 6.0,
        deliveryFee: 1.0,
        discount: 0.5,
        description: "This is a very good product",
    },
];
export { DATA, orders };
