import AsyncStorage from "@react-native-async-storage/async-storage";

export enum KEY_ASYNC {
	SET_PIN = "set_pin",
	LAST_TIME_USE = "last_time_use",
	THEME = "theme",
}

export const saveToStorage = async (key: KEY_ASYNC, value: string) => {
	try {
		await AsyncStorage.setItem(key.toString(), value);
	} catch (error) {
		console.error("Error saving data to AsyncStorage", error);
	}
};

export const getFromStorage = async (key: KEY_ASYNC): Promise<string | null> => {
	try {
		return await AsyncStorage.getItem(key.toString());
	} catch (error) {
		console.error("Error fetching data from AsyncStorage", error);
		return null;
	}
};

export const removeFromStorage = async (key: KEY_ASYNC) => {
	try {
		await AsyncStorage.removeItem(key.toString());
	} catch (error) {
		console.error("Error removing data from AsyncStorage", error);
	}
};
