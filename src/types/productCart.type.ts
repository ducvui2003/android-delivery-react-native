import ProductDetailType from "./productDetail.type";

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:38 PM - 28/08/2024
 * User: lam-nguyen
 **/

type ProductCartType = Pick<ProductDetailType, "id" | "name" | "price" | "discount" | "quantity">;

export default ProductCartType;
