import axiosInstance from "../configs/axios/axios.config";

export const isServerAlive = (): Promise<boolean> => {
	return axiosInstance
		.head("/health/alive")
		.then(() => {
			return true;
		})
		.catch(error => {
			console.log(error);
			return false;
		});
};
