import { getFromStorage, KEY_ASYNC, saveToStorage } from "./asyncStore.service";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THRESHOLD_DAYS = parseInt(process.env.EXPO_PUBLIC_THRESHOLD_DAYS || "7");

const isShowIntroduce = async (): Promise<boolean> => {
	const lastTimeUse: Date | null = await getLatestVisit();
	const currentTime: Date = new Date();
	if (lastTimeUse === null) {
		await setLatestVisit(currentTime);
		return true;
	}

	const diffTime: number = currentTime.getTime() - lastTimeUse.getTime();
	const thresholdTime: number = THRESHOLD_DAYS * ONE_DAY_IN_MS;

	if (diffTime > thresholdTime) {
		await setLatestVisit(currentTime);
		return true;
	}
	return false;
};

const setLatestVisit = async (currentTime: Date): Promise<void> => {
	await saveToStorage(KEY_ASYNC.LAST_TIME_USE, currentTime.toISOString());
};

const getLatestVisit = async (): Promise<Date | null> => {
	const valueCurrentDate: string | null = await getFromStorage(KEY_ASYNC.LAST_TIME_USE);
	if (valueCurrentDate === null) {
		return null;
	}
	return new Date(valueCurrentDate);
};

export { isShowIntroduce };
