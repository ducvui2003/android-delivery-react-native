import ProductDetailType from "../../../types/productDetail.type";
import OrderType from "../../../types/order.type";

type ProductOrderCardProps = Omit<ProductDetailType, "isLiked" | "nutritional" | "id" | "quantity" | "image"> & Pick<OrderType, "status"> & {
	reorderOnPress?: () => void;
	cameraOnPress?: () => void;
	insertPictureOnPress?: () => void;
	image: {};

}

export default ProductOrderCardProps;