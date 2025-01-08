import axiosInstance from "../configs/axios/axios.config";
import store from "../configs/redux/store.config";
import { setLoading } from "../hooks/redux/modal.slice";

export const isServerAlive = (): Promise<boolean> => {
	store.dispatch(setLoading(true));
	return axiosInstance
		.head("/health/alive", {
			timeout: 5000,
		})
		.then(() => {
			store.dispatch(setLoading(false));
			return true;
		})
		.catch(() => {
			store.dispatch(setLoading(false));
			return false;
		});
};
