const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_BACK_END;
const WHITE_LIST = [
	BASE_URL + "/auth/login",
	BASE_URL + "/auth/register",
	BASE_URL + "/auth/refresh-token",
	BASE_URL + "/health/alive",
];

// Function to check if the endpoint is whitelisted
const isRequestWhitelisted = (path: string) => {
	return WHITE_LIST.some(item => {
		return path.startsWith(item);
	});
};
export { isRequestWhitelisted };
