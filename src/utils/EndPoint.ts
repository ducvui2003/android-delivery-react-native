export enum EndPoint {
	LOGIN = "/auth/login",
	LOGIN_GOOGLE = "/auth/login-google-mobile",
	REGISTER = "/auth/register",
	LOGOUT = "/auth/logout",
	ACCOUNT = "/auth/account",
	ADDRESS = "/profile/address",

	PRODUCT_OPTION = "/product-option",

	ADD_CART = "/cart/add",
	GET_CARTS = "/cart/list",
	DETAIL_CART = "/cart/detail",
	INCREASE_CART = "/cart/increase",
	DECREASE_CART = "/cart/decrease",
	DELETE_CART = "/cart/delete",

	GET_ORDERS = "/order",
	GET_ORDER_DETAIL = "/order/detail",
	CREATE_ORDER = "/order/create",

	UPDATE_PROFILE = "/profile",
}
