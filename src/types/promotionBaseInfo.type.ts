import PromotionType from "./promotion.type";

type PromotionOfferType = "SHIPPING" | "ORDER";
type PromotionBaseInfoType = Pick<PromotionType, "id" | "name"> & {
	userId: number[];
	type : PromotionOfferType;
}

export default PromotionBaseInfoType;
export { PromotionOfferType };