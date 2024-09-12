/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 12:54 PM - 10/09/2024
 * User: Binnguci
 **/
import PromotionType from "../../../src/types/promotion.type";

const dataShippingOffer: PromotionType[] = [
  {
    id: "1",
    name: "FREE SHIPPING",
    description: "Enjoy free shipping on all orders throughout this month",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "FREESHIP",
    applicableScope: "All products",
    discountAmount: 0,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "2",
    name: "20% OFF",
    description: "Get 20% off on all orders above $100",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "20OFF",
    applicableScope: "All products",
    discountAmount: 20,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "3",
    name: "10% OFF",
    description: "Get 10% off on all orders above $50",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "10OFF",
    applicableScope: "All products",
    discountAmount: 10,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "4",
    name: "50% OFF",
    description: "Get 50% off on all orders above $200",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "50OFF",
    applicableScope: "All products",
    discountAmount: 50,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
];
const dataOrderOffer: PromotionType[] = [
  {
    id: "5",
    name: "20% OFF",
    description: "Get 20% off on all orders above $100",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "20OFF",
    applicableScope: "All products",
    discountAmount: 20,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "6",
    name: "10% OFF",
    description: "Get 10% off on all orders above $50",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "10OFF",
    applicableScope: "All products",
    discountAmount: 10,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
];
export { dataShippingOffer, dataOrderOffer };
