/**
 * Author: Nguyen Thanh Binh
 * Email: binnguci@gmail.com.vn
 * Phone number: +84 9013 230 70
 * Create at: 12:54 PM - 10/09/2024
 * User: Binnguci
 **/

type Promotion = {
  id: string;
  name: string;
  description?: string;
  duration?: string;
  promotionCode?: string;
  applicableScope?: string;
  discountAmount?: number;
  termsAndConditions?: string;
};

const dataShippingOffer: Promotion[] = [
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
    id: "1",
    name: "20% OFF",
    description: "Get 20% off on all orders above $100",
    duration: "01/05/2024 - 31/05/2024",
    promotionCode: "20OFF",
    applicableScope: "All products",
    discountAmount: 20,
    termsAndConditions: "This promotion is only applicable to orders placed on the website",
  },
];
const dataOrderOffer: Promotion[] = [
  {
    id: "1",
    name: "20% OFF",
  },
  { id: "1", name: "10% OFF" },
];
export { dataShippingOffer, dataOrderOffer };
