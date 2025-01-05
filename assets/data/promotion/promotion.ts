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
    discountPromotionInfo:{
      discount: 0,
      startDate: new Date(),
      expired: new Date(2025, 1, 1)
    },
    promotionCode: "FREESHIP",
    applicableScope: "All products",
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "2",
    name: "20% OFF",
    description: "Get 20% off on all orders above $100",
    discountPromotionInfo:{
      discount: 0.2,
      startDate: new Date(),
      expired: new Date(2025, 1, 1)
    },
    promotionCode: "20OFF",
    applicableScope: "All products",
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "3",
    name: "10% OFF",
    description: "Get 10% off on all orders above $50",
    discountPromotionInfo:{
      discount: 0.1,
      startDate: new Date(),
      expired: new Date(2025, 1, 1)
    },
    promotionCode: "10OFF",
    applicableScope: "All products",
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "4",
    name: "50% OFF",
    description: "Get 50% off on all orders above $200",
    discountPromotionInfo:{
      discount: 0.5,
      startDate: new Date(),
      expired: new Date(2025, 1, 1)
    },
    promotionCode: "50OFF",
    applicableScope: "All products",
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
];
const dataOrderOffer: PromotionType[] = [
  {
    id: "5",
    name: "20% OFF",
    description: "Get 20% off on all orders above $100",
    discountPromotionInfo:{
      discount: 0.2,
      startDate: new Date(),
      expired: new Date(2025, 1, 1)
    },
    promotionCode: "20OFF",
    applicableScope: "All products",
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
  {
    id: "6",
    name: "10% OFF",
    description: "Get 10% off on all orders above $50",
    discountPromotionInfo:{
      discount: 0.1,
      startDate: new Date(),
      expired: new Date(2025, 1, 1)
    },
    promotionCode: "10OFF",
    applicableScope: "All products",
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
];
export { dataShippingOffer, dataOrderOffer };
