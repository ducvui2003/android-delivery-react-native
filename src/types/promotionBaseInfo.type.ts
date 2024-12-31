import PromotionType from "./promotion.type";
type PromotionBaseInfoType = Pick<PromotionType, "id" | "name" | "type">
export default PromotionBaseInfoType;