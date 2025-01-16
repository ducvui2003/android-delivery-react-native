import ProductDetailType from "../../../types/productDetail.type";
import OrderType from "../../../types/order.type";

type ProductOrderCardProps = Omit<ProductDetailType, "favorite" | "nutritional" | "id" | "quantity" | "image"> &
	Pick<OrderType, "status"> & {
		reorderOnPress?: () => void;
		cameraOnPress?: () => void;
		insertPictureOnPress?: () => void;
		image: string;
	};

export default ProductOrderCardProps;
