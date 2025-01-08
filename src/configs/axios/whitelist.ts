const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_BACK_END;
const WHITE_LIST = [
	 "/auth/login",
	 "/auth/register",
	 "/auth/refresh-token",
	 "/health/alive",
];

// Function to check if the endpoint is whitelisted
const isRequestWhitelisted = (path: string) => {
	return WHITE_LIST.some(item => {
		return path.startsWith(item);
	});
};
export { isRequestWhitelisted };
