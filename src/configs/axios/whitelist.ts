const WHITE_LIST = [
	"/auth/login",
	"/auth/logout",
	"/auth/register",
	"/auth/refresh-token",
	"/health/alive",
	// "/product/**",
	"/product-option/**",
	"/category/**",
];

const BLACK_LIST = ["/product/favorite/*"];

// Function to check if the endpoint is whitelisted
const isRequestWhitelisted = (path: string) => {
	return WHITE_LIST.some(item => comparePath(item, path)) && !BLACK_LIST.some(item => comparePath(item, path));
};

const comparePath = (source: string, path: string): boolean => {
	if (source.endsWith("**")) return path.startsWith(source.substring(0, source.length - 3));
	if (source.endsWith("*"))
		return (
			path.startsWith(source.substring(0, source.length - 2)) &&
			path.match(/\//g)?.length === source.match(/\//g)?.length
		);
	return path === source;
};
export { isRequestWhitelisted };
