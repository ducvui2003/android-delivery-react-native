const WHITE_LIST = ["/auth/login", "/auth/register", "/auth/refresh-token", "/health/alive", "/product/**"];

// Function to check if the endpoint is whitelisted
const isRequestWhitelisted = (path: string) => {
	return WHITE_LIST.some(item => {
		if (item.endsWith("**")) return path.startsWith(item.substring(0, item.length - 3));
		return path === item;
	});
};
export { isRequestWhitelisted };
