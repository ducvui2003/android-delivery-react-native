import OrderType from "../../../types/order.type";

type OrderProps = OrderType & {
	onPress?: () => void;
}

export {OrderProps}