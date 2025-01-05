const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_BACK_END;
const WHITE_LIST = [
	BASE_URL + "/auth/login",
	BASE_URL + "/auth/register",
	BASE_URL + "/auth/refresh-token",
	BASE_URL + "/health/**",
];

const convertToRegex = (path: string): RegExp => {
	const regexString = path.replace("/**", ".*").replace("*", ".*");

	return new RegExp(`^${regexString}$`);
};

// Function to check if the endpoint is whitelisted
const isRequestWhitelisted = (endpoint: string): boolean => {
	return WHITE_LIST.some(whitelistedEndpoint => {
		const regex = convertToRegex(whitelistedEndpoint);
		return regex.test(endpoint);
	});
};

export { isRequestWhitelisted };
