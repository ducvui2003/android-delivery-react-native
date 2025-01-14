type Cart = {
	id: number;
	productId: string;
	name: string;
	quantity: number;
	quantityValid: number;
	thumbnail: string;
	price: number;
	options?: CartOption[];
	discount: number;
};
type CartOption = {
	id: number;
	name: string;
	price: number;
};

export type CartAdded = {
	productId: string;
	quantity: number;
	optionIds: string[];
};
export { Cart, CartOption };
