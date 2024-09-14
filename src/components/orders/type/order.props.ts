import {StatusProps} from "./statusLabel.props";

type OrderProps = {
	id: string;
	price: number;
	images: {}[];
	starReview: number;
	status: StatusProps;
	onPress?: () => void;
}

export {OrderProps}